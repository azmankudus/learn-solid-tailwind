import { Show, createSignal, onCleanup, For, createEffect } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import { isLoggedIn, setIsLoggedIn, mode, setMode, bg, setBg, color, setColor, isLoginModalOpen, setIsLoginModalOpen, redirectUrl, setRedirectUrl, lang, setLang } from "~/lib/store";
import { t, LANGUAGES } from "~/lib/i18n";
import { IconButton, Button, ThemeButton, CustomDropdown, Modal, TextField } from "./ThemeComponents";
import { Motion, Presence } from "solid-motionone";
import { 
  HiSolidMagnifyingGlass, HiSolidSun, HiSolidMoon, HiSolidPaintBrush,
  HiSolidArrowLeftOnRectangle, HiSolidUser
} from "solid-icons/hi";
import { TbOutlinePalette } from "solid-icons/tb";
import { COLORS, BGS, getButtonBg } from "~/lib/constants";



export default function TopNav() {
  const [showDropdown, setShowDropdown] = createSignal(false);
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [usernameError, setUsernameError] = createSignal("");
  const [passwordError, setPasswordError] = createSignal("");
  
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleLoginSubmit = () => {
    let valid = true;
    setUsernameError("");
    setPasswordError("");
    
    if (!username()) {
      setUsernameError(t("auth.required"));
      valid = false;
    }
    if (!password()) {
      setPasswordError(t("auth.required"));
      valid = false;
    }
    
    if (valid) {
      const validAccounts = ["admin/admin", "manager/manager", "user/user"];
      const cred = `${username()}/${password()}`;
      if (validAccounts.includes(cred)) {
        setIsLoggedIn(true);
        setIsLoginModalOpen(false);
        setUsername("");
        setPassword("");
        
        const nextUrl = redirectUrl() || "/protected";
        setRedirectUrl("");
        navigate(nextUrl);
      } else {
        setPasswordError(t("auth.invalid"));
      }
    }
  };

  const toggleMode = () => setMode(mode() === "light" ? "dark" : "light");

  const renderColorIcon = (v: string) => (
    <div class="h-5 w-5 rounded-full shadow-lg shadow-black/10 border border-white/20" style={{ background: getButtonBg(v) }} />
  );

  const renderBgIcon = (v: string) => {
    const Icon = BGS.find(b => b.value === v)?.icon || HiSolidPaintBrush;
    return <span class="text-xs text-theme-solid opacity-80"><Icon /></span>;
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

  return (
    <nav 
      ref={navRef}
      class="sticky top-0 z-[100] w-full bg-nav backdrop-blur-xl transition-all duration-300 shadow-sm border-none"
    >
      <div class="absolute inset-0 bg-primary/[0.02] dark:bg-transparent pointer-events-none" />
      <div class="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8 relative z-10">
        <A href="/" class="flex items-center space-x-2 transition-transform hover:scale-105 mr-auto group">
          <div class="h-9 w-9 rounded-xl flex items-center justify-center shadow-lg shadow-black/10 transition-all bg-theme group-hover:rotate-12">
            <span class="text-white font-black text-lg">A</span>
          </div>
          <span class="text-xl font-bold tracking-tight text-theme px-1">
            Antigravity
          </span>
        </A>

        <div class="flex items-center gap-2">
          <div class="hidden md:flex items-center gap-6 mr-4">
            <A href="/docs" class="text-sm font-medium text-muted hover:text-main transition-colors hover:scale-105">{t("nav.docs")}</A>
            <A href="/help" class="text-sm font-medium text-muted hover:text-main transition-colors hover:scale-105">{t("nav.help")}</A>
            <IconButton tooltip={t("nav.search")}>
              <HiSolidMagnifyingGlass size={20} />
            </IconButton>

            <div class="relative">
              <IconButton 
                onClick={() => setShowDropdown(!showDropdown())}
                tooltip={t("nav.personalize")}
                class={`personalize-btn transition-all duration-300 relative ${showDropdown() ? '!opacity-50 !grayscale' : ''}`}
              >
                <Show when={showDropdown()}>
                  <div class="absolute inset-0 bg-primary/5 animate-pulse" />
                </Show>
                <div class="relative z-10">
                  <TbOutlinePalette size={20} />
                </div>
              </IconButton>

              <Presence>
                <Show when={showDropdown()}>
                  <Motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2, easing: "ease-out" }}
                    class="personalize-dropdown absolute right-0 mt-3 w-80 rounded-2xl bg-solid border border-black/5 p-8 z-[101]"
                    style={{ "box-shadow": "var(--card-shadow)" }}
                  >
                    <div class="space-y-8">
                      <div>
                     <h4 class="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted mb-4 ml-1 opacity-70">{t("appearance.themeMode")}</h4>
                     <button 
                       onClick={toggleMode}
                       class="w-full flex items-center justify-between p-3 rounded-xl bg-surface hover:bg-black/5 transition-all group border-none"
                     >
                       <div class="flex items-center gap-3">
                         <div class="text-theme">
                           {mode() === 'dark' ? <HiSolidMoon size={20} /> : <HiSolidSun size={20} />}
                         </div>
                          <span class="text-xs font-semibold text-main uppercase tracking-widest">
                            {mode() === 'dark' ? t("appearance.darkMode") : t("appearance.lightMode")}
                          </span>
                       </div>
                       <div class={`h-7 w-12 rounded-full relative p-1.5 transition-colors ${mode() === 'dark' ? 'bg-theme' : 'bg-black/10 shadow-inner'}`}>
                            <div class={`h-4 w-4 rounded-full transition-all duration-300 shadow-md bg-white border-none ${mode() === 'dark' ? 'translate-x-5' : 'translate-x-0'}`}></div>
                          </div>
                        </button>
                      </div>

                      <div>
                     <h4 class="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted mb-4 ml-1 opacity-70">{t("appearance.themePalette")}</h4>
                     <CustomDropdown 
                       value={color()} 
                       options={COLORS} 
                       onChange={setColor} 
                       renderIcon={renderColorIcon}
                     />
                  </div>

                  <div>
                     <h4 class="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted mb-4 ml-1 opacity-70">{t("appearance.backdropArt")}</h4>
                     <CustomDropdown 
                       value={bg()} 
                       options={BGS} 
                       onChange={setBg} 
                       renderIcon={renderBgIcon}
                     />
                  </div>
                  
                  <div>
                     <h4 class="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted mb-4 ml-1 opacity-70">{t("appearance.language")}</h4>
                     <CustomDropdown 
                       value={lang()} 
                       options={LANGUAGES} 
                       onChange={setLang} 
                     />
                  </div>
                    </div>
                  </Motion.div>
                </Show>
              </Presence>
            </div>
          </div>

          <Show 
            when={isLoggedIn()} 
            fallback={
              <Button 
                onClick={() => setIsLoginModalOpen(true)}
                class="px-5 py-2 text-xs font-bold shadow-sm"
              >
                {t("nav.login")}
              </Button>
            }
          >
            <div class="flex items-center gap-2">
              <A href="/protected">
                <Button class="px-5 py-2 font-bold text-xs shadow-md bg-theme text-white border-none transition-all active:scale-95">
                  {t("nav.dashboard")}
                </Button>
              </A>

              <IconButton 
                onClick={handleLogout}
                tooltip={t("nav.logout")}
                class="!bg-rose-500 !text-white hover:!bg-rose-600 shadow-md border-none transition-all active:scale-95"
              >
                <HiSolidArrowLeftOnRectangle size={20} />
              </IconButton>
            </div>
          </Show>
        </div>
      </div>

      <Modal
        isOpen={isLoginModalOpen()}
        onClose={() => setIsLoginModalOpen(false)}
        title={t("auth.title")}
        icon={<HiSolidUser size={24} />}
        footer={
          <>
            <button 
              onClick={() => setIsLoginModalOpen(false)}
              class="px-5 py-2.5 rounded-xl text-sm font-semibold text-muted hover:bg-black/5 hover:text-main transition-colors border-none bg-transparent"
            >
              {t("auth.cancel")}
            </button>
            <Button onClick={handleLoginSubmit}>
              {t("auth.submit")}
            </Button>
          </>
        }
      >
        <div class="flex flex-col gap-6 py-2">
           <TextField 
             label={t("auth.username")} 
             value={username()} 
             onInput={setUsername} 
             placeholder="e.g. admin"
             error={usernameError()}
           />
           <TextField 
             type="password"
             label={t("auth.password")} 
             value={password()} 
             onInput={setPassword} 
             placeholder="e.g. admin"
             error={passwordError()}
           />
        </div>
      </Modal>
    </nav>
  );
}
