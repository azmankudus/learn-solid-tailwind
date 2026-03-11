import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { text } from "~/lib/i18n";
import { setIsLoggedIn, setIsLoginModalOpen, redirectUrl, setRedirectUrl } from "~/lib/store";
import { Button } from "../input/Button";
import { TextField } from "../input/TextField";

interface LoginFormProps {
  onCancel: () => void;
}

export function LoginForm(props: LoginFormProps) {
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [usernameError, setUsernameError] = createSignal("");
  const [passwordError, setPasswordError] = createSignal("");

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
        setIsLoginModalOpen(false);
        setUsername("");
        setPassword("");

        const nextUrl = redirectUrl() || "/protected";
        setRedirectUrl("");
        navigate(nextUrl);
      } else {
        setPasswordError(text("auth.invalid"));
      }
    }
  };

  return (
    <form onSubmit={handleLoginSubmit} class="flex flex-col">
      <div class="flex flex-col gap-6 py-2">
        <TextField
          label={text("auth.username")}
          value={username()}
          onInput={setUsername}
          placeholder="e.g. admin"
          error={usernameError()}
        />
        <TextField
          type="password"
          label={text("auth.password")}
          value={password()}
          onInput={setPassword}
          placeholder="e.g. admin"
          error={passwordError()}
        />
      </div>

      <div class="mt-8 flex items-center justify-end gap-3 border-t border-black/5 pt-6 -mx-6 px-6 bg-surface/30">
        <button
          onClick={props.onCancel}
          type="button"
          class="px-5 py-2.5 rounded-xl text-sm font-semibold text-muted hover:bg-black/5 hover:text-main transition-colors border-none bg-transparent cursor-pointer"
        >
          {text("auth.cancel")}
        </button>
        <Button type="submit">
          {text("auth.submit")}
        </Button>
      </div>
    </form>
  );
}
