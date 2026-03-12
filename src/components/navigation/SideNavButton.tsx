import { ParentProps } from "solid-js";
import { A } from "@solidjs/router";
import { Tooltip } from "../display/Tooltip";
import { Icon } from "@iconify-icon/solid";

export interface SideNavButtonProps extends ParentProps {
  href: string;
  active?: boolean;
  icon?: any;
  collapsed?: boolean;
  onDblClick?: (e: MouseEvent) => void;
  onClick?: (e: MouseEvent) => void;
  tooltip?: string;
  class?: string;
  isSubItem?: boolean;
}

export function SideNavButton(props: SideNavButtonProps) {
  const iconSize = () => props.isSubItem ? 16 : 24;

  return (
    <div class="relative flex items-center w-full">
      <A
        href={props.href}
        end={true}
        onDblClick={props.onDblClick}
        onClick={props.onClick}
        activeClass="bg-surface text-main shadow-md backdrop-blur-2xl"
        inactiveClass="text-muted hover:bg-surface/50 hover:text-main backdrop-blur-md"
        class={`flex items-center rounded-xl group border-none cursor-pointer h-8 w-full px-0 justify-start overflow-hidden transition-all duration-300 ${props.class || ""} ${props.active ? 'bg-surface text-main shadow-md' : ''}`}
      >
        <Tooltip text={props.tooltip!} position="right" disabled={!props.collapsed || !props.tooltip}>
          <div class="w-full px-0">
            <div class="flex items-center w-full min-w-0 pl-0 pr-4">
              <div class={`flex items-center justify-center rounded-lg shrink-0 w-8 h-8 transition-transform duration-300 ${props.active ? 'bg-theme text-white shadow-md' : 'bg-surface/50 group-hover:bg-accent-muted'}`}>
                {props.icon && (
                  <div class="flex items-center justify-center" style={{ width: `${iconSize()}px`, height: `${iconSize()}px` }}>
                    <Icon icon={props.icon} width={iconSize()} height={iconSize()} />
                  </div>
                )}
              </div>
              <div class={`flex items-center ${props.isSubItem ? 'ml-2' : 'ml-3'} flex-1 min-w-0 transition-all duration-300 transform ${props.collapsed ? 'opacity-0 translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}>
                <span class={`whitespace-nowrap overflow-hidden text-ellipsis ${props.isSubItem ? 'text-[11px]' : 'text-[13px]'}`}>{props.children}</span>
              </div>
            </div>
          </div>
        </Tooltip>
      </A>
    </div>
  );
}
