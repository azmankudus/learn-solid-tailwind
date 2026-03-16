import { createSignal, For, JSX, Show } from "solid-js";
import { Icon } from "@iconify-icon/solid";
import { ICON_CHEVRON_DOWN } from "~/lib/icons";

export interface AccordionItem {
  id: string;
  title: string;
  content: JSX.Element;
  icon?: any;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  class?: string;
}

export function Accordion(props: AccordionProps) {
  const [openIds, setOpenIds] = createSignal<string[]>([]);

  const toggle = (id: string) => {
    if (props.allowMultiple) {
      if (openIds().includes(id)) {
        setOpenIds(openIds().filter((i) => i !== id));
      } else {
        setOpenIds([...openIds(), id]);
      }
    } else {
      setOpenIds(openIds().includes(id) ? [] : [id]);
    }
  };

  return (
    <div class={`flex flex-col gap-2 ${props.class || ""}`}>
      <For each={props.items}>
        {(item) => {
          const isOpen = () => openIds().includes(item.id);
          
          return (
            <div 
              class="border border-input-border rounded-2xl overflow-hidden transition-all duration-300"
              classList={{
                "bg-solid shadow-lg": isOpen(),
                "bg-input/30 hover:bg-input/50": !isOpen()
              }}
            >
              <button
                onClick={() => toggle(item.id)}
                class="w-full flex items-center justify-between p-4 text-left outline-none"
              >
                <div class="flex items-center gap-3">
                  <Show when={item.icon}>
                    <div 
                      class="h-8 w-8 rounded-xl bg-theme/5 text-theme flex items-center justify-center transition-transform duration-300"
                      classList={{ "scale-110 bg-theme text-white shadow-lg": isOpen() }}
                    >
                      <Icon icon={item.icon} width={18} height={18} />
                    </div>
                  </Show>
                  <span 
                    class="text-sm font-black uppercase tracking-widest transition-colors"
                    classList={{ "text-theme": isOpen(), "text-main": !isOpen() }}
                  >
                    {item.title}
                  </span>
                </div>
                <Icon 
                  icon={ICON_CHEVRON_DOWN} 
                  class={`transition-transform duration-500 text-muted/50 ${isOpen() ? "rotate-180 text-theme" : ""}`} 
                  width={20} 
                  height={20} 
                />
              </button>

              <div 
                class="grid transition-all duration-500 ease-in-out"
                style={{ "grid-template-rows": isOpen() ? "1fr" : "0fr" }}
              >
                <div class="overflow-hidden">
                  <div class="p-5 pt-0 text-sm font-medium text-muted leading-relaxed animate-fade-in">
                    {item.content}
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </For>
    </div>
  );
}
