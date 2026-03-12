import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { text } from "~/lib/i18n";
import { setIsLoggedIn, redirectUrl, setRedirectUrl } from "~/lib/store";
import { Button } from "../input/Button";
import { TextField } from "../input/TextField";

interface LoginFormLocalProps {
  onCancel: () => void;
}

export function LoginFormLocal(props: LoginFormLocalProps) {
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [usernameError, setUsernameError] = createSignal("");
  const [passwordError, setPasswordError] = createSignal("");
  const [rememberMe, setRememberMe] = createSignal(false);

  const navigate = useNavigate();

  const handleLoginSubmit = (e?: Event) => {
    e?.preventDefault();
    let valid = true;
    setUsernameError("");
    setPasswordError("");

    if (!username()) {
      setUsernameError(text("auth.required"));
      valid = false;
    }
    if (!password()) {
      setPasswordError(text("auth.required"));
      valid = false;
    }

    if (valid) {
      const validAccounts = ["admin/admin", "manager/manager", "user/user"];
      const cred = `${username()}/${password()}`;
      if (validAccounts.includes(cred)) {
        setIsLoggedIn(true);
        setUsername("");
        setPassword("");

        const nextUrl = redirectUrl() || "/protected/dashboard";
        setRedirectUrl("");
        navigate(nextUrl);
      } else {
        setPasswordError(text("auth.invalid"));
      }
    }
  };

  return (
    <form onSubmit={handleLoginSubmit} class="flex flex-col">
      <div class="flex flex-col gap-5 py-2">
        <TextField
          label={text("auth.username")}
          value={username()}
          onInput={setUsername}
          placeholder={text("auth.loginUsernamePlaceholder")}
          error={usernameError()}
        />
        <div class="flex flex-col gap-2">
          <TextField
            type="password"
            label={text("auth.password")}
            value={password()}
            onInput={setPassword}
            placeholder={text("auth.loginPasswordPlaceholder")}
            error={passwordError()}
          />
          <div class="flex items-center justify-between px-1">
            <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-muted hover:text-main transition-colors">
              <div class="relative flex items-center">
                <input 
                  type="checkbox" 
                  class="peer appearance-none w-4 h-4 rounded border-2 border-input-border bg-input checked:bg-theme checked:border-transparent transition-all"
                  checked={rememberMe()}
                  onChange={(e) => setRememberMe(e.currentTarget.checked)}
                />
                <svg class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
              {text("auth.rememberMe")}
            </label>
            <button 
              type="button" 
              class="text-xs font-bold text-theme hover:underline bg-transparent border-none cursor-pointer"
              onClick={() => navigate("/user/forgot")}
            >
              {text("auth.forgotPassword")}
            </button>
          </div>
        </div>
      </div>

      <div class="mt-8 flex flex-col gap-4 border-t border-black/5 pt-6 -mx-6 px-6 bg-surface/30">
        <Button class="w-full py-3" type="submit">
          {text("auth.submit")}
        </Button>
        <div class="flex items-center justify-between">
          <button 
            type="button" 
            class="text-xs font-bold text-muted hover:text-main bg-transparent border-none cursor-pointer flex items-center gap-1"
            onClick={() => props.onCancel()}
          >
            ← {text("auth.backToOptions")}
          </button>
          <span class="text-xs text-muted">
            {text("auth.noAccount")}{" "}
            <button 
              type="button" 
              class="font-bold text-theme hover:underline bg-transparent border-none cursor-pointer"
              onClick={() => navigate("/user/register")}
            >
              {text("auth.registerHere")}
            </button>
          </span>
        </div>
      </div>
    </form>
  );
}
