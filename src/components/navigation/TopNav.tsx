import { Show, createSignal, onCleanup, For, createEffect } from "solid-js";
import { Dynamic } from "solid-js/web";
import { A, useNavigate, useLocation } from "@solidjs/router";
import { isLoggedIn, setIsLoggedIn, isLoginModalOpen, setIsLoginModalOpen, view } from "~/lib/store";
import { text } from "~/lib/i18n";
import {
  IconButton, Button, Modal,
  PersonalizationPanel, LoginForm
} from "../Components";

import {
  HiSolidMagnifyingGlass,
  HiSolidArrowLeftOnRectangle, HiSolidUser,
  HiSolidBars3, HiSolidXMark, HiSolidSquare3Stack3d
} from "solid-icons/hi";
import { TOP_NAV_ITEMS, SIDE_NAV_ITEMS } from "~/lib/navigation";
import { TbOutlinePalette } from "solid-icons/tb";

export function TopNav() {
  const [showDropdown, setShowDropdown] = createSignal(false);
  const [showMobileMenu, setShowMobileMenu] = createSignal(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowMobileMenu(false);
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

  const isActive = (path: string) => location.pathname === path;

  return (
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
              <HiSolidSquare3Stack3d size={24} class="text-white" />
            </div>
            <span class="text-3xl font-black tracking-tight text-theme px-1 uppercase hidden lg:inline-block">
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
              <HiSolidMagnifyingGlass size={20} class="text-main group-hover:text-theme-solid transition-colors" />
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
                  <TbOutlinePalette size={20} class={showDropdown() ? 'text-theme-solid' : 'text-main group-hover:text-theme-solid transition-colors'} />
                </div>
              </IconButton>

              <div
                class="personalize-dropdown absolute right-0 mt-3 w-80 rounded-2xl bg-solid border border-black/5 p-8 z-[101] dropdown-panel"
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
              {showMobileMenu() ? <HiSolidXMark size={20} /> : <HiSolidBars3 size={20} />}
            </IconButton>
          </div>

          {/* Group 4: Session buttons */}
          <Show
            when={isLoggedIn()}
            fallback={
              <Button
                onClick={() => setIsLoginModalOpen(true)}
                class="px-5 py-2 text-xs font-bold shadow-sm"
              >
                {text("nav.login")}
              </Button>
            }
          >
            <div class="flex items-center gap-2">
              <A href="/protected">
                <Button class="px-5 py-2 font-bold text-xs shadow-md bg-theme text-white border-none transition-all active:scale-95 hover:brightness-110">
                  {text("nav.dashboard")}
                </Button>
              </A>

              <IconButton
                onClick={handleLogout}
                tooltip={text("nav.logout")}
                class="hidden md:flex !bg-rose-500 !text-white hover:!bg-rose-600 shadow-md border-none transition-all active:scale-95"
              >
                <HiSolidArrowLeftOnRectangle size={20} />
              </IconButton>
            </div>
          </Show>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        class="md:hidden fixed inset-0 top-16 bg-solid/95 backdrop-blur-2xl z-40 overflow-y-auto custom-scrollbar p-6 pb-24 mobile-menu-overlay"
        classList={{ "mobile-menu-overlay--open": showMobileMenu() }}
      >
        <Show when={showMobileMenu()}>
          <div class="flex flex-col space-y-8">
            {/* Top Nav Items (Mobile) */}
            <div class="space-y-4">
              <h4 class="text-[10px] font-bold uppercase tracking-widest text-muted px-2">{text("nav.group.general")}</h4>
              <div class="grid grid-cols-2 gap-3">
                <For each={TOP_NAV_ITEMS.filter(it => it.href !== '/')}>
                  {(item) => (
                    <A href={item.href!} class="flex flex-col items-center justify-center p-5 rounded-2xl bg-surface/50 border border-input-border text-center group active:scale-95 transition-all">
                      <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center mb-3">
                        <Dynamic component={item.icon} size={20} />
                      </div>
                      <span class="text-xs font-bold text-main">{item.label}</span>
                    </A>
                  )}
                </For>
              </div>
            </div>

            {/* Personalization (Mobile) */}
            <div class="space-y-4">
              <h4 class="text-[10px] font-bold uppercase tracking-widest text-muted px-2">{text("nav.group.appearance")}</h4>
              <div class="p-3 rounded-2xl bg-surface/50 border border-input-border">
                <PersonalizationPanel />
              </div>
            </div>

            {/* Navigation Group (Mobile) */}
            <Show when={isLoggedIn()}>
              <div class="space-y-4">
                <h4 class="text-[10px] font-bold uppercase tracking-widest text-muted px-2">{text("nav.group.navigation")}</h4>
                <div class="flex flex-col gap-3">
                  <For each={SIDE_NAV_ITEMS}>
                    {(item) => (
                      <div class="flex flex-col gap-2">
                        <Show
                          when={item.children}
                          fallback={
                            <A
                              href={item.href!}
                              class={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all border border-transparent ${isActive(item.href!) ? 'bg-theme text-white shadow-lg shadow-primary/20 border-primary' : 'bg-surface/30 text-muted hover:bg-surface/50 border-input-border/30'}`}
                            >
                              <Dynamic component={item.icon} size={22} />
                              <span class="text-sm font-bold">{item.label}</span>
                            </A>
                          }
                        >
                          <div class="flex flex-col gap-2 p-5 bg-surface/20 rounded-2xl border border-input-border/30">
                            <div class="flex items-center gap-3 py-1 text-main opacity-50 border-b border-input-border/30 mb-2">
                              <Dynamic component={item.icon} size={18} />
                              <span class="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                            </div>
                            <div class="grid grid-cols-1 gap-2">
                              <For each={item.children}>
                                {(child) => (
                                  <A
                                    href={child.href!}
                                    class={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${isActive(child.href!) ? 'bg-theme text-white shadow-md' : 'text-muted hover:bg-surface/30 hover:text-main'}`}
                                  >
                                    <Dynamic component={child.icon} size={18} />
                                    <span class="text-sm font-semibold">{child.label}</span>
                                  </A>
                                )}
                              </For>
                            </div>
                          </div>
                        </Show>
                      </div>
                    )}
                  </For>
                </div>
              </div>

              <div class="pt-6">
                <button
                  onClick={handleLogout}
                  class="flex items-center justify-center gap-3 w-full p-5 rounded-2xl bg-rose-500 text-white font-bold shadow-lg shadow-rose-500/20 active:scale-95 transition-all text-sm"
                >
                  <HiSolidArrowLeftOnRectangle size={20} />
                  <span>{text("nav.logout")}</span>
                </button>
              </div>
            </Show>
          </div>
        </Show>
      </div>

      <Modal
        isOpen={isLoginModalOpen()}
        onClose={() => setIsLoginModalOpen(false)}
        title={text("auth.title")}
        icon={<HiSolidUser size={20} />}
      >
        <LoginForm onCancel={() => setIsLoginModalOpen(false)} />
      </Modal>
    </nav>
  );
}
