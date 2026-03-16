import { For, Show, createMemo } from 'solid-js';
import { Connection, WorkflowNode, getNodeTypeDefinition } from '~/lib/workflow/types';
import { NODE_WIDTH, NODE_HEIGHT } from './WorkflowNode';

interface ConnectionRendererProps {
  connections: Connection[];
  nodes: WorkflowNode[];
  selectedConnectionIds: Set<string>;
  connectingFrom: { nodeId: string; outputIndex: number } | null;
  connectingTo: { x: number; y: number } | null;
  zoom: number;
  offset: { x: number; y: number };
  canvasRect: DOMRect | null;
  onSelect: (connectionId: string, additive: boolean) => void;
}

function getOutputPosition(node: WorkflowNode, outputIndex: number, outputCount: number): { x: number; y: number } {
  const baseY = node.position.y + NODE_HEIGHT / 2;
  const offsetY = (outputIndex - (outputCount - 1) / 2) * 20;
  return {
    x: node.position.x + NODE_WIDTH,
    y: baseY + offsetY,
  };
}

function getInputPosition(node: WorkflowNode, inputIndex: number, inputCount: number): { x: number; y: number } {
  const baseY = node.position.y + NODE_HEIGHT / 2;
  const offsetY = (inputIndex - (inputCount - 1) / 2) * 20;
  return {
    x: node.position.x,
    y: baseY + offsetY,
  };
}

function getBezierPath(x1: number, y1: number, x2: number, y2: number): string {
  const dx = x2 - x1;
  const cp = Math.max(Math.abs(dx) * 0.5, 50);
  return `M ${x1} ${y1} C ${x1 + cp} ${y1}, ${x2 - cp} ${y2}, ${x2} ${y2}`;
}

export function ConnectionRenderer(props: ConnectionRendererProps) {
  const getConnectionPath = (conn: Connection) => {
    const sourceNode = props.nodes.find(n => n.id === conn.sourceNodeId);
    const targetNode = props.nodes.find(n => n.id === conn.targetNodeId);
    if (!sourceNode || !targetNode) return null;

    const sourceDef = getNodeTypeDefinition(sourceNode.type);
    const targetDef = getNodeTypeDefinition(targetNode.type);
    if (!sourceDef || !targetDef) return null;

    const sourcePos = getOutputPosition(sourceNode, conn.sourceOutputIndex, sourceDef.outputs);
    const targetPos = getInputPosition(targetNode, conn.targetInputIndex, targetDef.inputs);

    return {
      path: getBezierPath(sourcePos.x, sourcePos.y, targetPos.x, targetPos.y),
      sourceStatus: sourceNode.status,
      isAnimating: sourceNode.status === 'running' || sourceNode.status === 'success',
    };
  };

  const getDraftConnectionPath = () => {
    if (!props.connectingFrom || !props.connectingTo || !props.canvasRect) return null;

    const sourceNode = props.nodes.find(n => n.id === props.connectingFrom!.nodeId);
    if (!sourceNode) return null;

    const sourceDef = getNodeTypeDefinition(sourceNode.type);
    if (!sourceDef) return null;

    const sourcePos = getOutputPosition(sourceNode, props.connectingFrom.outputIndex, sourceDef.outputs);
    
    const targetX = (props.connectingTo.x - props.canvasRect.left - props.offset.x) / props.zoom;
    const targetY = (props.connectingTo.y - props.canvasRect.top - props.offset.y) / props.zoom;

    return getBezierPath(sourcePos.x, sourcePos.y, targetX, targetY);
  };

  return (
    <svg class="absolute pointer-events-none" style={{ width: '20000px', height: '20000px', left: '-10000px', top: '-10000px' }}>
      <g transform="translate(10000, 10000)">
        <For each={props.connections}>
          {(conn) => {
            const pathData = createMemo(() => getConnectionPath(conn));
            
            return (
              <Show when={pathData()}>
                {(data) => (
                  <g class="pointer-events-auto cursor-pointer" onClick={(e) => props.onSelect(conn.id, e.shiftKey)}>
                    <path
                      d={data().path}
                      fill="none"
                      stroke="transparent"
                      stroke-width="20"
                    />
                    <path
                      d={data().path}
                      fill="none"
                      stroke={props.selectedConnectionIds.has(conn.id) ? '#fb923c' : 'rgba(148, 163, 184, 0.3)'}
                      stroke-width={props.selectedConnectionIds.has(conn.id) ? 3 : 2}
                      stroke-linecap="round"
                      class="transition-all duration-200"
                    />
                    <Show when={data().isAnimating}>
                      <circle r="4" fill="#fb923c" class="drop-shadow-lg">
                        <animateMotion
                          dur={data().sourceStatus === 'running' ? '1s' : '2s'}
                          repeatCount="indefinite"
                          path={data().path}
                        />
                      </circle>
                    </Show>
                  </g>
                )}
              </Show>
            );
          }}
        </For>

        <Show when={getDraftConnectionPath()}>
          {(path) => (
            <path
              d={path()}
              fill="none"
              stroke="#fb923c"
              stroke-width="2"
              stroke-dasharray="8 4"
              stroke-linecap="round"
              opacity="0.8"
            />
          )}
        </Show>
      </g>
    </svg>
  );
}

export { getOutputPosition, getInputPosition, getBezierPath };
