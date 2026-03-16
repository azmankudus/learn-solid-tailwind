import { createSignal, For, Show } from "solid-js";
import { Icon } from "@iconify-icon/solid";
import { ICON_CHEVRON_RIGHT, ICON_CUBE, ICON_DOCUMENT_TEXT } from "~/lib/icons";

export interface TreeItem {
  id: string;
  label: string;
  icon?: any;
  children?: TreeItem[];
}

export interface TreeProps {
  items: TreeItem[];
  class?: string;
  onSelect?: (item: TreeItem) => void;
}

function TreeView(props: { item: TreeItem, depth: number, onSelect?: (item: TreeItem) => void }) {
  const [isOpen, setIsOpen] = createSignal(false);
  const hasChildren = () => !!props.item.children?.length;

  return (
    <div class="flex flex-col">
      <button
        onClick={() => {
          if (hasChildren()) setIsOpen(!isOpen());
          props.onSelect?.(props.item);
        }}
        class="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-theme/5 transition-colors group text-left"
        style={{ "padding-left": `${props.depth * 16 + 8}px` }}
      >
        <Show when={hasChildren()}>
          <Icon 
            icon={ICON_CHEVRON_RIGHT} 
            class={`transition-transform duration-300 ${isOpen() ? 'rotate-90' : ''} text-muted/50 group-hover:text-theme`} 
            width={14} 
          />
        </Show>
        <Show when={!hasChildren()}>
          <div class="w-3.5" />
        </Show>
        
        <Icon 
          icon={props.item.icon || (hasChildren() ? ICON_CUBE : ICON_DOCUMENT_TEXT)} 
          class={hasChildren() ? "text-theme/70" : "text-muted/70"}
          width={16} 
        />
        
        <span class="text-[13px] font-semibold text-main/80 group-hover:text-main truncate">
          {props.item.label}
        </span>
      </button>

      <Show when={isOpen() && hasChildren()}>
        <div class="flex flex-col overflow-hidden animate-fade-in">
          <For each={props.item.children}>
            {(child) => <TreeView item={child} depth={props.depth + 1} onSelect={props.onSelect} />}
          </For>
        </div>
      </Show>
    </div>
  );
}

export function Tree(props: TreeProps) {
  return (
    <div class={`flex flex-col gap-1 ${props.class || ""}`}>
      <For each={props.items}>
        {(item) => <TreeView item={item} depth={0} onSelect={props.onSelect} />}
      </For>
    </div>
  );
}
