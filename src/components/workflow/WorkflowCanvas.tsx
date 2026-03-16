import { createSignal, onMount, onCleanup, Show, For, createEffect, createMemo } from 'solid-js';
import { WorkflowNodeComponent, NODE_WIDTH, NODE_HEIGHT } from './WorkflowNode';
import { ConnectionRenderer, getOutputPosition, getInputPosition } from './ConnectionRenderer';
import { WorkflowStore } from '~/lib/workflow/store';
import { getNodeTypeDefinition } from '~/lib/workflow/types';

interface WorkflowCanvasProps {
  store: WorkflowStore;
  onAddNodeAtPosition: (type: string, position: { x: number; y: number }) => void;
  onOpenNodePalette: () => void;
}

const GRID_SIZE = 20;

export function WorkflowCanvas(props: WorkflowCanvasProps) {
  const { workflow, canvas, setCanvas, updateNodePosition, selectNode, selectNodes, clearSelection, 
          startConnecting, updateConnectingPosition, endConnecting, addConnection, 
          setZoom, setOffset, resetView, fitToScreen } = props.store;

  let containerRef: HTMLDivElement | undefined;
  let [containerRect, setContainerRect] = createSignal<DOMRect | null>(null);
  
  let dragState = {
    isDragging: false,
    isPanning: false,
    dragNodeId: null as string | null,
    startPos: { x: 0, y: 0 },
    startOffset: { x: 0, y: 0 },
    startNodePos: { x: 0, y: 0 },
    hasMoved: false,
    selectionBox: null as { startX: number; startY: number; currentX: number; currentY: number } | null,
  };

  const updateRect = () => {
    if (containerRef) {
      setContainerRect(containerRef.getBoundingClientRect());
    }
  };

  onMount(() => {
    updateRect();
    window.addEventListener('resize', updateRect);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (canvas.readOnly) return;
      
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (canvas.selectedNodeIds.size > 0) {
          props.store.deleteNodes(Array.from(canvas.selectedNodeIds));
        }
      }
      
      if (e.key === 'Escape') {
        clearSelection();
        endConnecting();
      }
      
      if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
        e.preventDefault();
        props.store.selectAll();
      }
      
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          props.store.redo();
        } else {
          props.store.undo();
        }
      }
      
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        props.store.redo();
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        const selectedId = Array.from(canvas.selectedNodeIds)[0];
        if (selectedId) {
          props.store.duplicateNode(selectedId);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    onCleanup(() => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('keydown', handleKeyDown);
    });
  });

  const screenToCanvas = (screenX: number, screenY: number) => {
    const rect = containerRect();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: (screenX - rect.left - canvas.offset.x) / canvas.zoom,
      y: (screenY - rect.top - canvas.offset.y) / canvas.zoom,
    };
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest('.workflow-node')) return;
    if ((e.target as HTMLElement).closest('.port')) return;

    const rect = containerRect();
    if (!rect) return;

    if (e.button === 1 || (e.button === 0 && (e.altKey || e.shiftKey))) {
      dragState.isPanning = true;
      dragState.startPos = { x: e.clientX, y: e.clientY };
      dragState.startOffset = { ...canvas.offset };
      return;
    }

    clearSelection();
    endConnecting();

    const canvasPos = screenToCanvas(e.clientX, e.clientY);
    dragState.selectionBox = {
      startX: canvasPos.x,
      startY: canvasPos.y,
      currentX: canvasPos.x,
      currentY: canvasPos.y,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (canvas.isConnecting) {
      updateConnectingPosition({ x: e.clientX, y: e.clientY });
    }

    if (dragState.isPanning) {
      const dx = e.clientX - dragState.startPos.x;
      const dy = e.clientY - dragState.startPos.y;
      setOffset({
        x: dragState.startOffset.x + dx,
        y: dragState.startOffset.y + dy,
      });
      return;
    }

    if (dragState.dragNodeId) {
      const dx = (e.clientX - dragState.startPos.x) / canvas.zoom;
      const dy = (e.clientY - dragState.startPos.y) / canvas.zoom;
      
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        dragState.hasMoved = true;
      }

      const newX = dragState.startNodePos.x + dx;
      const newY = dragState.startNodePos.y + dy;
      
      updateNodePosition(dragState.dragNodeId, {
        x: Math.round(newX / GRID_SIZE) * GRID_SIZE,
        y: Math.round(newY / GRID_SIZE) * GRID_SIZE,
      });
      return;
    }

    if (dragState.selectionBox) {
      const canvasPos = screenToCanvas(e.clientX, e.clientY);
      dragState.selectionBox.currentX = canvasPos.x;
      dragState.selectionBox.currentY = canvasPos.y;
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (dragState.isPanning) {
      dragState.isPanning = false;
      return;
    }

    if (dragState.dragNodeId) {
      if (dragState.hasMoved) {
        props.store.saveHistory();
      }
      dragState.dragNodeId = null;
      dragState.hasMoved = false;
      return;
    }

    if (dragState.selectionBox) {
      const box = dragState.selectionBox;
      const minX = Math.min(box.startX, box.currentX);
      const maxX = Math.max(box.startX, box.currentX);
      const minY = Math.min(box.startY, box.currentY);
      const maxY = Math.max(box.startY, box.currentY);

      const selectedIds = workflow.nodes
        .filter(n => 
          n.position.x < maxX &&
          n.position.x + NODE_WIDTH > minX &&
          n.position.y < maxY &&
          n.position.y + NODE_HEIGHT > minY
        )
        .map(n => n.id);

      if (selectedIds.length > 0) {
        selectNodes(selectedIds);
      }

      dragState.selectionBox = null;
    }
  };

  const handleWheel = (e: WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = -e.deltaY * 0.001;
      const newZoom = Math.max(0.1, Math.min(3, canvas.zoom + delta));
      
      const rect = containerRect();
      if (rect) {
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const newOffsetX = mouseX - (mouseX - canvas.offset.x) * (newZoom / canvas.zoom);
        const newOffsetY = mouseY - (mouseY - canvas.offset.y) * (newZoom / canvas.zoom);
        
        setZoom(newZoom);
        setOffset({ x: newOffsetX, y: newOffsetY });
      }
    } else {
      setOffset({
        x: canvas.offset.x - e.deltaX,
        y: canvas.offset.y - e.deltaY,
      });
    }
  };

  const handleNodeSelect = (nodeId: string, e: MouseEvent, additive: boolean) => {
    selectNode(nodeId, additive);
  };

  const handleNodeDragStart = (nodeId: string, e: MouseEvent) => {
    if (canvas.readOnly) return;
    
    dragState.dragNodeId = nodeId;
    dragState.startPos = { x: e.clientX, y: e.clientY };
    dragState.hasMoved = false;
    
    const node = workflow.nodes.find(n => n.id === nodeId);
    if (node) {
      dragState.startNodePos = { ...node.position };
    }
  };

  const handleOutputMouseDown = (nodeId: string, outputIndex: number, e: MouseEvent) => {
    if (canvas.readOnly) return;
    e.stopPropagation();
    startConnecting(nodeId, outputIndex);
    updateConnectingPosition({ x: e.clientX, y: e.clientY });
  };

  const handleInputMouseUp = (targetNodeId: string, targetInputIndex: number, e: MouseEvent) => {
    e.stopPropagation();
    
    if (canvas.connectingFrom && canvas.connectingFrom.nodeId !== targetNodeId) {
      const result = addConnection(
        canvas.connectingFrom.nodeId,
        canvas.connectingFrom.outputIndex,
        targetNodeId,
        targetInputIndex
      );
      
      if (!result.success) {
        console.warn('Failed to create connection:', result.error);
      }
    }
    
    endConnecting();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const nodeType = e.dataTransfer?.getData('nodeType');
    if (nodeType) {
      const pos = screenToCanvas(e.clientX, e.clientY);
      props.onAddNodeAtPosition(nodeType, {
        x: Math.round((pos.x - NODE_WIDTH / 2) / GRID_SIZE) * GRID_SIZE,
        y: Math.round((pos.y - NODE_HEIGHT / 2) / GRID_SIZE) * GRID_SIZE,
      });
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const selectionBoxRect = createMemo(() => {
    if (!dragState.selectionBox) return null;
    const box = dragState.selectionBox;
    return {
      x: Math.min(box.startX, box.currentX),
      y: Math.min(box.startY, box.currentY),
      width: Math.abs(box.currentX - box.startX),
      height: Math.abs(box.currentY - box.startY),
    };
  });

  return (
    <div
      ref={containerRef}
      class="flex-1 overflow-hidden relative bg-[#0a0d14]"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ cursor: canvas.isConnecting ? 'crosshair' : 'default' }}
    >
      <div
        class="absolute inset-0 transition-none will-change-transform"
        style={{
          transform: `translate(${canvas.offset.x}px, ${canvas.offset.y}px) scale(${canvas.zoom})`,
          'transform-origin': '0 0',
        }}
      >
        <div
          class="absolute pointer-events-none opacity-[0.03]"
          style={{
            width: '20000px',
            height: '20000px',
            left: '-10000px',
            top: '-10000px',
            'background-image': `radial-gradient(circle, white 1px, transparent 1px)`,
            'background-size': `${GRID_SIZE}px ${GRID_SIZE}px`,
          }}
        />

        <ConnectionRenderer
          connections={workflow.connections}
          nodes={workflow.nodes}
          selectedConnectionIds={canvas.selectedConnectionIds}
          connectingFrom={canvas.connectingFrom}
          connectingTo={canvas.connectingTo}
          zoom={canvas.zoom}
          offset={canvas.offset}
          canvasRect={containerRect()}
          onSelect={(id, additive) => {
            if (!additive) clearSelection();
            setCanvas('selectedConnectionIds', new Set([id]));
          }}
        />

        <For each={workflow.nodes}>
          {(node) => (
            <WorkflowNodeComponent
              node={node}
              isSelected={canvas.selectedNodeIds.has(node.id)}
              isReadOnly={canvas.readOnly}
              onSelect={(e, additive) => handleNodeSelect(node.id, e, additive)}
              onDragStart={(e) => handleNodeDragStart(node.id, e)}
              onOutputMouseDown={(idx, e) => handleOutputMouseDown(node.id, idx, e)}
              onInputMouseUp={(idx, e) => handleInputMouseUp(node.id, idx, e)}
              onDuplicate={() => props.store.duplicateNode(node.id)}
              onDelete={() => props.store.deleteNode(node.id)}
              onDisable={() => props.store.updateNode(node.id, { disabled: !node.disabled })}
            />
          )}
        </For>

        <Show when={selectionBoxRect()}>
          {(rect) => (
            <div
              class="absolute border-2 border-orange-400/50 bg-orange-400/10 pointer-events-none"
              style={{
                left: `${rect().x}px`,
                top: `${rect().y}px`,
                width: `${rect().width}px`,
                height: `${rect().height}px`,
              }}
            />
          )}
        </Show>
      </div>

      <div class="absolute left-4 bottom-4 flex items-center gap-3 z-40">
        <button
          onClick={props.onOpenNodePalette}
          class="w-14 h-14 rounded-2xl bg-orange-500 hover:bg-orange-400 text-white flex items-center justify-center shadow-xl shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all"
          title="Add Node"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>

        <div class="flex items-center bg-slate-800/90 backdrop-blur border border-slate-700/50 rounded-xl p-1 gap-1">
          <button
            onClick={() => setZoom(z => Math.min(z + 0.1, 3))}
            class="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>
          <button
            onClick={() => setZoom(z => Math.max(z - 0.1, 0.1))}
            class="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>
          <button
            onClick={resetView}
            class="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors"
            title="Reset View"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
          <button
            onClick={() => {
              const rect = containerRect();
              if (rect) fitToScreen(rect.width, rect.height);
            }}
            class="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors"
            title="Fit to Screen"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
          </button>
        </div>
      </div>

      <Show when={workflow.nodes.length === 0}>
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div class="text-center">
            <div class="w-20 h-20 rounded-2xl bg-slate-800/50 flex items-center justify-center mx-auto mb-4">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-slate-600">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </div>
            <p class="text-slate-500 text-sm mb-1">No nodes in workflow</p>
            <p class="text-slate-600 text-xs">Click the + button to add your first node</p>
          </div>
        </div>
      </Show>
    </div>
  );
}
