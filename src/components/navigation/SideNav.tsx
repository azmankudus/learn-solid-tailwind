import { Show, For, createSignal, onMount } from "solid-js";
import { useLocation } from "@solidjs/router";
import { isSidebarCollapsed, setIsSidebarCollapsed } from "~/lib/store";
import { text } from "~/lib/i18n";
import { SideNavButton } from "./SideNavButton";
import { SideNavButtonGroup } from "./SideNavButtonGroup";
import { Tooltip } from "../display/Tooltip";
import { SIDE_NAV_ITEMS, NavItem } from "~/lib/navigation";
import { HiSolidChevronLeft } from "solid-icons/hi";


export function SideNav() {
  const location = useLocation();
  const [openGroups, setOpenGroups] = createSignal<Record<string, boolean>>({});

  onMount(() => {
    const currentPath = location.pathname;

    // Find if current path is in any child of a group
    const initialGroups: Record<string, boolean> = {};
    SIDE_NAV_ITEMS.forEach(item => {
      if (item.children?.some(child => child.href === currentPath)) {
        initialGroups[item.label] = true;
      }
    });
    setOpenGroups(initialGroups);
  });

  const toggleGroup = (label: string) => {
    setOpenGroups(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed());

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isGroupActive = (item: NavItem) => {
    return item.children?.some(child => isActive(child.href!));
  };

  return (
    <>
      <aside
        class={`sticky top-16 h-[calc(100dvh-64px)] border-none bg-nav backdrop-blur-xl hidden md:flex flex-col transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-20 animate-fade-in-left overflow-hidden ${isSidebarCollapsed() ? 'w-20' : 'w-64'}`}
      >
        <div class="absolute inset-0 bg-primary/[0.02] dark:bg-transparent pointer-events-none" />

        <nav class="flex-1 min-h-0 overflow-y-auto overflow-x-hidden custom-scrollbar relative z-10 py-2 space-y-1 pl-6 pr-6">
          <For each={SIDE_NAV_ITEMS}>
            {(item) => (
              <Show
                when={item.children}
                fallback={
                  <SideNavButton
                    href={item.href!}
                    icon={item.icon}
                    collapsed={isSidebarCollapsed()}
                    active={isActive(item.href!)}
                    onDblClick={toggleSidebar}
                    tooltip={item.label}
                  >
                    {item.label}
                  </SideNavButton>
                }
              >
                <SideNavButtonGroup
                  label={item.label}
                  icon={item.icon}
                  collapsed={isSidebarCollapsed()}
                  active={isGroupActive(item)}
                  isOpen={openGroups()[item.label]}
                  onToggle={toggleGroup}
                  onDblClick={toggleSidebar}
                >
                  <For each={item.children}>
                    {(child) => (
                      <SideNavButton
                        href={child.href!}
                        icon={child.icon}
                        active={isActive(child.href!)}
                        isSubItem={true}
                      >
                        {child.label}
                      </SideNavButton>
                    )}
                  </For>
                </SideNavButtonGroup>
              </Show>
            )}
          </For>
        </nav>

        <div class="mt-auto border-t border-border-theme/40 relative z-10 bg-nav/50 backdrop-blur-xl px-4 lg:px-5 py-4">
          <Show when={isSidebarCollapsed()} fallback={
            <button
              onClick={toggleSidebar}
              class="flex h-8 w-full items-center rounded-xl bg-surface/80 border-none hover:bg-surface text-muted hover:text-main transition-all active:scale-95 shadow-sm group hover:scale-[1.02] cursor-pointer px-2.5 justify-between"
            >
              <span class="text-[10px] font-bold uppercase tracking-wider">{text("menu.collapse")}</span>
              <div class="flex items-center justify-center transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]">
                <HiSolidChevronLeft size={18} />
              </div>
            </button>
          }>
            <Tooltip text={text("menu.expand")} position="right">
              <button
                onClick={toggleSidebar}
                class="flex h-8 w-8 items-center rounded-xl bg-surface/80 border-none hover:bg-surface text-muted hover:text-main transition-all active:scale-95 shadow-sm group hover:scale-[1.02] cursor-pointer justify-center"
              >
                <div class="flex items-center justify-center px-0.5 rotate-180 transition-transform ease-[cubic-bezier(0.4,0,0.2,1)]">
                  <HiSolidChevronLeft size={20} />
                </div>
              </button>
            </Tooltip>
          </Show>
        </div>
      </aside>

    </>
  );
}
