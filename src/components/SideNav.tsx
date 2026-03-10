import { Show, For, createSignal, JSX } from "solid-js";
import { useLocation } from "@solidjs/router";
import { isSidebarCollapsed, setIsSidebarCollapsed } from "~/lib/store";
import { t } from "~/lib/i18n";
import { ThemeButton } from "./ThemeComponents";
import { 
  HiSolidChartBar, HiSolidUsers, HiSolidCog6Tooth, HiSolidShoppingBag, 
  HiSolidChartPie, HiSolidBolt, HiSolidDocumentChartBar, HiSolidChevronDown,
  HiSolidChevronLeft, HiSolidCube, HiSolidUserCircle, HiSolidIdentification, HiSolidSwatch
} from "solid-icons/hi";

interface NavItem {
  href?: string;
  label: string;
  icon: any;
  children?: NavItem[];
}

const NAV_ITEMS = (): NavItem[] => [
  { href: "/protected", get label() { return t("menu.overview"); }, icon: HiSolidChartBar },
  { 
    get label() { return t("menu.management"); }, 
    icon: HiSolidCube,
    children: [
      { href: "/protected/management/users", get label() { return t("menu.users"); }, icon: HiSolidUsers },
      { href: "/protected/management/products", get label() { return t("menu.products"); }, icon: HiSolidShoppingBag },
    ]
  },
  { 
    get label() { return t("menu.analytics"); }, 
    icon: HiSolidChartPie,
    children: [
      { href: "/protected/analytics/live-data", get label() { return t("menu.liveData"); }, icon: HiSolidBolt },
      { href: "/protected/analytics/reports", get label() { return t("menu.reports"); }, icon: HiSolidDocumentChartBar },
    ]
  },
  {
    get label() { return t("menu.profile"); },
    icon: HiSolidUserCircle,
    children: [
      { href: "/protected/profile/details", get label() { return t("menu.details"); }, icon: HiSolidIdentification },
      { href: "/protected/profile/appearance", get label() { return t("menu.appearance"); }, icon: HiSolidSwatch },
    ]
  },
  { href: "/protected/settings", get label() { return t("menu.settings"); }, icon: HiSolidCog6Tooth },
];

export default function SideNav() {
  const location = useLocation();
  const [openGroups, setOpenGroups] = createSignal<Record<string, boolean>>({});

  const toggleGroup = (label: string) => {
    setOpenGroups(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed());

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <aside 
        class={`sticky top-16 h-[calc(100vh-64px)] border-none bg-nav backdrop-blur-xl p-3 hidden md:flex flex-col transition-all duration-300 ease-in-out z-20 relative ${isSidebarCollapsed() ? 'w-16' : 'w-64'}`}
      >
        <div class="absolute inset-0 bg-primary/[0.02] dark:bg-transparent pointer-events-none" />
        
        <nav class="flex flex-col space-y-1 flex-grow relative z-10 overflow-y-auto custom-scrollbar pr-2">
           <For each={NAV_ITEMS()}>
             {(item) => (
               <Show 
                when={item.children} 
                fallback={
                  <ThemeButton
                    href={item.href!}
                    icon={<item.icon size={18} />}
                    collapsed={isSidebarCollapsed()}
                    active={isActive(item.href!)}
                  >
                    {item.label}
                  </ThemeButton>
                }
               >
                 <div class="flex flex-col space-y-1">
                   <button 
                     onClick={() => toggleGroup(item.label)}
                     class={`flex items-center space-x-2.5 rounded-xl px-2.5 py-1.5 text-sm font-medium transition-all text-muted hover:bg-surface/50 hover:text-main hover:scale-[1.02] active:scale-[0.98] ${isSidebarCollapsed() ? 'justify-center' : 'justify-between'}`}
                   >
                     <div class="flex items-center space-x-2.5">
                       <div class="flex h-7 w-7 min-w-[28px] items-center justify-center rounded-lg bg-surface/50 transition-colors group-hover:bg-accent-muted">
                         <item.icon size={16} />
                       </div>
                       <Show when={!isSidebarCollapsed()}>
                         <span class="whitespace-nowrap">{item.label}</span>
                       </Show>
                     </div>
                     <Show when={!isSidebarCollapsed()}>
                        <HiSolidChevronDown 
                          size={14} 
                          class={`transition-transform duration-300 ${openGroups()[item.label] ? 'rotate-180' : ''}`} 
                        />
                     </Show>
                   </button>
                   
                   <Show when={openGroups()[item.label] && !isSidebarCollapsed()}>
                      <div class="flex flex-col space-y-1 ml-4 border-l border-border-theme pl-2">
                        <For each={item.children}>
                          {(child) => (
                            <ThemeButton
                              href={child.href!}
                              icon={<child.icon size={16} />}
                              active={isActive(child.href!)}
                            >
                              {child.label}
                            </ThemeButton>
                          )}
                        </For>
                      </div>
                   </Show>
                 </div>
               </Show>
             )}
           </For>
        </nav>

        <div class="mt-auto pt-3 border-none relative z-10">
          <button 
            onClick={toggleSidebar}
            class={`flex h-9 w-full items-center rounded-xl bg-surface/80 border-none hover:bg-surface text-muted hover:text-main transition-all active:scale-95 shadow-sm group hover:scale-[1.02] ${isSidebarCollapsed() ? 'justify-center' : 'px-3 justify-between'}`}
          >
            <Show when={!isSidebarCollapsed()}>
              <span class="text-xs font-semibold">{t("menu.collapse")}</span>
            </Show>
            <div class={`transition-transform duration-300 ${isSidebarCollapsed() ? 'rotate-180' : ''}`}>
               <HiSolidChevronLeft size={20} />
            </div>
          </button>
        </div>
      </aside>

      {/* Mobile Nav */}
      <div class="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center bg-surface/90 backdrop-blur-2xl px-3 py-2 rounded-2xl shadow-xl border-none z-50 gap-1 overflow-x-auto max-w-[90vw] custom-scrollbar">
         <For each={NAV_ITEMS()}>
           {(item) => (
             <Show when={item.href}>
               <ThemeButton
                 href={item.href!}
                 icon={<item.icon size={18} />}
                 collapsed={true}
                 active={isActive(item.href!)}
               />
             </Show>
           )}
         </For>
      </div>
    </>
  );
}
