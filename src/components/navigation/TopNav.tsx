import { Show, createSignal, onCleanup, For, createEffect } from "solid-js";
import { isServer } from "solid-js/web";
import { A, useNavigate, useLocation } from "@solidjs/router";
import { isLoggedIn, setIsLoggedIn, view } from "~/lib/store";
import { text } from "~/lib/i18n";
import { IconButton, Button } from "../input/Button";
import { PersonalizationPanel } from "./PersonalizationPanel";
import { MobileMenu } from "./MobileMenu";
import { Icon } from "@iconify-icon/solid";
import { ICON_SEARCH_FLUENT, ICON_SETTINGS_FLUENT, ICON_LOGOUT, ICON_BARS_3, ICON_X_MARK, ICON_SQUARE_3_STACK } from "~/lib/icons";
import { TOP_NAV_ITEMS } from "~/lib/navigation";

export function TopNav() {
  const [showDropdown, setShowDropdown] = createSignal(false);
  const [showMobileMenu, setShowMobileMenu] = createSignal(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  let navRef: HTMLDivElement | undefined;
  createEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef && !navRef.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    onCleanup(() => document.removeEventListener("mousedown", handleClickOutside));
  });

  // Close mobile menu on route change
  createEffect(() => {
    location.pathname;
    setShowMobileMenu(false);
  });

  // Lock body scroll when mobile menu is open
  createEffect(() => {
    if (isServer) return;
    if (showMobileMenu()) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });

  onCleanup(() => {
    if (!isServer) {
      document.body.style.overflow = "auto";
    }
  });

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav
        ref={navRef}
        class="sticky top-0 z-[100] w-full bg-nav backdrop-blur-xl animate-fade-in shadow-sm border-none"
      >
        <div class="absolute inset-0 bg-primary/[0.02] dark:bg-transparent pointer-events-none" />
        <div
          class="flex h-16 w-full items-center justify-between px-4 lg:px-5 relative z-10 mx-auto layout-view-transition"
          style={{ "max-width": view() === 'center' ? '1280px' : '100%' }}
        >
          <div class="flex items-center gap-3">
            <A href="/" class="flex items-center space-x-3 transition-all hover:scale-102 group">
              <div class="h-10 w-10 rounded-xl flex items-center justify-center shadow-xl shadow-primary/20 transition-all bg-theme group-hover:rotate-6">
                <Icon icon={ICON_SQUARE_3_STACK} width={24} height={24} class="text-white" />
              </div>
              <span class="text-3xl font-black tracking-tight text-theme px-1 uppercase">
                UI-DEN
              </span>
            </A>

            {/* Group 2: Page links - now on the left */}
            <div class="hidden md:flex items-center gap-6 ml-8">
              <For each={TOP_NAV_ITEMS}>
                {(item) => (
                  <A
                    href={item.href!}
                    class={`text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 ${isActive(item.href!) ? 'text-theme' : 'text-muted hover:text-main'}`}
                  >
                    {item.label}
                  </A>
                )}
              </For>
            </div>
          </div>

          <div class="flex items-center gap-4">
            {/* Group 3: Icon buttons - now on the right, no background */}
            <div class="hidden md:flex items-center gap-1.5">
              <IconButton tooltip={text("nav.search")}>
                <Icon icon={ICON_SEARCH_FLUENT} width={20} height={20} class="text-main group-hover:text-theme-solid transition-colors" />
              </IconButton>

              <div class="relative">
                <IconButton
                  onClick={() => setShowDropdown(!showDropdown())}
                  tooltip={text("nav.personalize")}
                  class={`personalize-btn relative ${showDropdown() ? '!text-theme !border-theme' : ''}`}
                >
                  <Show when={showDropdown()}>
                    <div class="absolute inset-0 bg-theme/10 rounded-xl blur-lg animate-pulse" />
                  </Show>
                  <div class="relative z-10 flex items-center justify-center">
                    <Icon icon={ICON_SETTINGS_FLUENT} width={20} height={20} class={showDropdown() ? 'text-theme-solid' : 'text-main group-hover:text-theme-solid transition-colors'} />
                  </div>
                </IconButton>

                <div
                  class="personalize-dropdown absolute right-0 mt-3 w-72 rounded-2xl bg-solid border border-black/5 p-3 z-[101] dropdown-panel"
                  classList={{ "dropdown-panel--open": showDropdown() }}
                  style={{ "box-shadow": "var(--card-shadow)" }}
                >
                  <Show when={showDropdown()}>
                    <PersonalizationPanel />
                  </Show>
                </div>
              </div>
            </div>

            {/* Mobile Hamburger Button */}
            <div class="md:hidden flex items-center pr-2">
              <IconButton
                onClick={() => setShowMobileMenu(!showMobileMenu())}
                class={`relative z-[110] transition-colors ${showMobileMenu() ? 'text-theme' : 'text-main'}`}
              >
                {showMobileMenu() ? <Icon icon={ICON_X_MARK} width={20} height={20} /> : <Icon icon={ICON_BARS_3} width={20} height={20} />}
              </IconButton>
            </div>

            {/* Group 4: Session buttons */}
            <div class="hidden md:flex items-center gap-2">
              <Show
                when={isLoggedIn()}
                fallback={
                  <Button
                    onClick={() => {
                      if (isLoggedIn()) {
                        navigate("/protected/dashboard");
                      } else {
                        navigate("/user/login");
                      }
                    }}
                    class="px-5 py-2 text-xs font-bold shadow-sm"
                  >
                    {text("nav.login")}
                  </Button>
                }
              >
                <div class="flex items-center gap-2">
                  <A href="/protected/dashboard">
                    <Button class="px-5 py-2 font-bold text-xs shadow-md bg-theme text-white border-none transition-all active:scale-95 hover:brightness-110">
                      {text("nav.dashboard")}
                    </Button>
                  </A>

                  <IconButton
                    onClick={handleLogout}
                    tooltip={text("nav.logout")}
                    class="!bg-rose-500 !text-white hover:!bg-rose-600 shadow-md border-none transition-all active:scale-95"
                  >
                    <Icon icon={ICON_LOGOUT} width={20} height={20} />
                  </IconButton>
                </div>
              </Show>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Standalone Component */}
      <MobileMenu isOpen={showMobileMenu()} onClose={() => setShowMobileMenu(false)} />
    </>
  );
}
