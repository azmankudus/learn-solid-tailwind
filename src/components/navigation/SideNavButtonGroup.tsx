import { ParentProps } from "solid-js";
import { Icon } from "@iconify-icon/solid";
import { ICON_CHEVRON_DOWN } from "~/lib/icons";
import { Tooltip } from "../content/Tooltip";

export interface SideNavButtonGroupProps extends ParentProps {
  label: string;
  icon: any;
  collapsed?: boolean;
  active?: boolean;
  isOpen?: boolean;
  onToggle?: (label: string) => void;
  onDblClick?: (e: MouseEvent) => void;
}

export function SideNavButtonGroup(props: SideNavButtonGroupProps) {
  const iconSize = () => '26px';


  const renderButton = (isCollapsed: boolean) => (
    <button
      onClick={() => props.onToggle?.(props.label)}
      onDblClick={props.onDblClick}
      class={`flex items-center rounded-xl group border-none cursor-pointer h-8 w-full px-0 justify-start overflow-hidden transition-all duration-300 ${props.active
        ? 'bg-surface text-main shadow-md backdrop-blur-2xl'
        : ('text-muted hover:bg-surface/50 hover:text-main backdrop-blur-md')
        }`}
    >
      <Tooltip text={props.label} position="right" disabled={!isCollapsed} class="w-full">
        <div class="w-full px-0">
          <div class="flex items-center w-full min-w-0 pl-0 pr-2.5">
            <div class={`flex items-center justify-center rounded-lg shrink-0 w-8 h-8 transition-transform duration-300 ${props.active ? 'bg-theme text-white shadow-md' : 'bg-surface/50 group-hover:bg-accent-muted'}`}>
              <div class="flex items-center justify-center" style={{ width: iconSize(), height: iconSize() }}>
                <Icon icon={props.icon} width={26} height={26} />
              </div>
            </div>

            <div class={`flex items-center justify-between flex-1 min-w-0 ml-3 transition-all duration-300 transform ${isCollapsed ? 'opacity-0 translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}>
              <span class="whitespace-nowrap overflow-hidden text-ellipsis mr-2 text-[13px] font-medium">{props.label}</span>
              <div
                class="shrink-0 opacity-60 flex items-center justify-center transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]"
                classList={{ "rotate-180": props.isOpen }}
              >
                <Icon icon={ICON_CHEVRON_DOWN} width={14} height={14} />
              </div>
            </div>
          </div>
        </div>
      </Tooltip>
    </button>
  );

  return (
    <div class="flex flex-col space-y-0.5 w-full">
      {renderButton(props.collapsed || false)}

      <div
        class="sidenav-group-panel pt-1"
        classList={{ "sidenav-group-panel--open": props.isOpen && !props.collapsed }}
      >
        <div class="sidenav-group-panel__inner">
          <div class="flex flex-col gap-0.5 ml-3 border-l border-border-theme/40 pl-1.5 py-1 pr-1">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}
