import { Show, For, createSignal, createEffect } from "solid-js";
import { isServer, } from "solid-js/web";
import { useLocation, useNavigate } from "@solidjs/router";
import { isLoggedIn, setIsLoggedIn, setIsLoginModalOpen } from "~/lib/store";
import { text } from "~/lib/i18n";
import { Button } from "../input/Button";
import { PersonalizationPanel } from "./PersonalizationPanel";
import { SideNavButton } from "./SideNavButton";
import { SideNavButtonGroup } from "./SideNavButtonGroup";
import { HiSolidMagnifyingGlass, HiSolidArrowLeftOnRectangle } from "solid-icons/hi";
import { TOP_NAV_ITEMS, SIDE_NAV_ITEMS } from "~/lib/navigation";
import { TbOutlinePalette } from "solid-icons/tb";

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu(props: MobileMenuProps) {
  const [showDropdown, setShowDropdown] = createSignal(false);
  const [openMobileGroups, setOpenMobileGroups] = createSignal<Record<string, boolean>>({});

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setIsLoggedIn(false);
    props.onClose();
    navigate("/");
  };

  const toggleMobileGroup = (label: string) => {
    setOpenMobileGroups(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (path: string) => location.pathname === path;

  const isGroupActive = (item: any) => {
    return item.children?.some((child: any) => isActive(child.href!));
  };

  createEffect(() => {
    if (isServer) return;
    if (props.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      setShowDropdown(false);
      setOpenMobileGroups({});
    }
  });

  return (
    <div
      class="md:hidden fixed top-16 inset-x-0 bottom-0 flex flex-col transition-all duration-300 overscroll-contain mobile-menu-overlay"
      style={{ "z-index": 90, "background-color": "var(--bg-solid)" }}
      classList={{
        "opacity-0 pointer-events-none translate-y-4": !props.isOpen,
        "opacity-100 pointer-events-auto translate-y-0": props.isOpen
      }}
    >
      {/* Scrollable Content Area */}
      <div class="flex-1 overflow-y-auto custom-scrollbar p-6 pb-32 space-y-6">
        <Show when={props.isOpen}>

          {/* Combined Topdown Links Structure */}
          <div class="space-y-6">

            {/* NEW: Search & Personalize Tools at the Top */}
            <div class="space-y-3">
              <h4 class="text-[10px] font-bold uppercase tracking-widest text-muted px-2 mb-2">Tools</h4>
              <div class="flex flex-col space-y-2 relative">
                <Button class="w-full py-4 text-xs font-bold bg-surface/80 border border-input-border/50 text-main flex items-center justify-center gap-2 hover:bg-solid/100 shadow-sm transition-colors">
                  <HiSolidMagnifyingGlass size={18} />
                  <span>{text("nav.search")}</span>
                </Button>

                <div class="w-full">
                  <Button
                    onClick={() => setShowDropdown(!showDropdown())}
                    class={`w-full py-4 text-xs font-bold border flex items-center justify-center gap-2 shadow-sm transition-colors ${showDropdown() ? 'bg-theme/10 text-theme border-primary' : 'bg-surface/80 border-input-border/50 text-main hover:bg-solid/100'}`}
                  >
                    <TbOutlinePalette size={18} />
                    <span>{text("nav.personalize")}</span>
                  </Button>

                  <div
                    class="grid transition-all duration-300 ease-in-out"
                    style={{
                      "grid-template-rows": showDropdown() ? "1fr" : "0fr",
                      opacity: showDropdown() ? 1 : 0,
                      visibility: showDropdown() ? "visible" : "hidden"
                    }}
                  >
                    <div class="overflow-hidden">
                      <div class="mt-3 w-full rounded-2xl bg-solid border border-black/5 p-6 shadow-xl relative z-[110]">
                        <PersonalizationPanel />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Public Links */}
            <div>
              <h4 class="text-[10px] font-bold uppercase tracking-widest text-muted px-2 mb-2">{text("nav.group.public")}</h4>
              <div class="flex flex-col space-y-1">
                <For each={TOP_NAV_ITEMS}>
                  {(item) => (
                    <SideNavButton
                      href={item.href!}
                      icon={item.icon}
                      active={isActive(item.href!)}
                      onClick={() => props.onClose()}
                    >
                      {item.label}
                    </SideNavButton>
                  )}
                </For>
              </div>
            </div>

            {/* Protected Links */}
            <Show when={isLoggedIn()}>
              <div>
                <h4 class="text-[10px] font-bold uppercase tracking-widest text-muted px-2 mb-2">{text("nav.group.protected")}</h4>
                <div class="flex flex-col space-y-1">
                  <For each={SIDE_NAV_ITEMS}>
                    {(item) => (
                      <Show
                        when={item.children}
                        fallback={
                          <SideNavButton
                            href={item.href!}
                            icon={item.icon}
                            active={isActive(item.href!)}
                            onClick={() => props.onClose()}
                          >
                            {item.label}
                          </SideNavButton>
                        }
                      >
                        <SideNavButtonGroup
                          label={item.label}
                          icon={item.icon}
                          active={isGroupActive(item)}
                          isOpen={openMobileGroups()[item.label] || isGroupActive(item)}
                          onToggle={toggleMobileGroup}
                        >
                          <For each={item.children}>
                            {(child) => (
                              <SideNavButton
                                href={child.href!}
                                icon={child.icon}
                                active={isActive(child.href!)}
                                onClick={() => props.onClose()}
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
                </div>
              </div>
            </Show>

            {/* Session Actions */}
            <div>
              <h4 class="text-[10px] font-bold uppercase tracking-widest text-muted px-2 mb-2">Account</h4>
              <div class="flex flex-col space-y-1">
                <Show
                  when={isLoggedIn()}
                  fallback={
                    <Button
                      onClick={() => {
                        if (isLoggedIn()) {
                          navigate("/protected");
                        } else {
                          setIsLoginModalOpen(true);
                        }
                        props.onClose();
                      }}
                      class="w-full py-3.5 font-bold shadow-md shadow-primary/20 transition-all active:scale-95"
                    >
                      {text("nav.login")}
                    </Button>
                  }
                >
                  <div class="flex flex-col space-y-2">
                    <Button
                      onClick={() => { navigate("/protected"); props.onClose(); }}
                      class="w-full py-3.5 font-bold shadow-md shadow-primary/20 transition-all active:scale-95"
                    >
                      {text("nav.dashboard")}
                    </Button>
                    <Button
                      onClick={handleLogout}
                      class="w-full py-3.5 font-bold !bg-none !bg-rose-500 !text-white hover:!bg-rose-600 shadow-md shadow-rose-500/20 border-none transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <HiSolidArrowLeftOnRectangle size={20} style={{ transform: "scaleX(-1)" }} />
                      {text("nav.logout")}
                    </Button>
                  </div>
                </Show>
              </div>
            </div>

          </div>

        </Show>
      </div>
    </div>
  );
}
