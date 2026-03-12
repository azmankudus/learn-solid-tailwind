import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { text } from "~/lib/i18n";
import { Button } from "../input/Button";
import { TextField } from "../input/TextField";

interface RegisterFormProps {
}

export function RegisterForm(props: RegisterFormProps) {
  const [fullName, setFullName] = createSignal("");
  const [username, setUsername] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");

  const [fullNameError, setFullNameError] = createSignal("");
  const [usernameError, setUsernameError] = createSignal("");
  const [emailError, setEmailError] = createSignal("");
  const [passwordError, setPasswordError] = createSignal("");

  const [isSuccess, setIsSuccess] = createSignal(false);
  const navigate = useNavigate();

  const resetForm = () => {
    setFullName("");
    setUsername("");
    setEmail("");
    setPassword("");
    setFullNameError("");
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
  };

  const handleRegister = (e: Event) => {
    e.preventDefault();
    let valid = true;

    setFullNameError("");
    setUsernameError("");
    setEmailError("");
    setPasswordError("");

    if (!fullName()) {
      setFullNameError(text("auth.required"));
      valid = false;
    } else if (fullName().length > 100) {
      setFullNameError(text("auth.error.fullNameTooLong"));
      valid = false;
    }

    if (!username()) {
      setUsernameError(text("auth.required"));
      valid = false;
    } else if (username().length > 30) {
      setUsernameError(text("auth.error.usernameTooLong"));
      valid = false;
    }

    if (!email()) {
      setEmailError(text("auth.required"));
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email())) {
        setEmailError(text("auth.invalidEmail"));
        valid = false;
      } else if (email().length > 254) {
        setEmailError(text("auth.error.emailTooLong"));
        valid = false;
      }
    }

    if (!password()) {
      setPasswordError(text("auth.required"));
      valid = false;
    } else if (password().length < 8) {
      setPasswordError(text("auth.error.passwordTooShort"));
      valid = false;
    } else if (password().length > 64) {
      setPasswordError(text("auth.error.passwordTooLong"));
      valid = false;
    }

    if (valid) {
      // Simulate registration
      setIsSuccess(true);
    }
  };

  if (isSuccess()) {
    return (
      <div class="flex flex-col gap-6 py-6 text-center">
        <div class="mx-auto h-16 w-16 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-2">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h3 class="text-xl font-bold">{text("auth.registerSuccess")}</h3>
        <p class="text-sm text-muted">{text("auth.registerSuccessDesc").replace("{username}", username())}</p>
        <Button onClick={() => navigate("/user/login-local")} class="mt-4 w-full py-3">{text("auth.returnToLogin")}</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleRegister} class="flex flex-col h-full relative" onReset={(e) => { e.preventDefault(); resetForm(); }}>
      <div class="flex flex-col gap-5 py-2">
        <TextField
          label={text("auth.fullName")}
          value={fullName()}
          onInput={setFullName}
          placeholder={text("auth.fullNamePlaceholder")}
          error={fullNameError()}
        />
        <TextField
          label={text("auth.username")}
          value={username()}
          onInput={setUsername}
          placeholder={text("auth.usernamePlaceholder")}
          error={usernameError()}
        />
        <TextField
          label={text("auth.emailAddress")}
          value={email()}
          onInput={setEmail}
          placeholder={text("auth.emailPlaceholder")}
          error={emailError()}
        />
        <TextField
          type="password"
          label={text("auth.password")}
          value={password()}
          onInput={setPassword}
          placeholder={text("auth.passwordPlaceholder")}
          error={passwordError()}
        />
      </div>

      <div class="mt-8 flex items-center justify-between border-t border-black/5 pt-6 -mx-8 px-8 bg-surface/30">
        <button
          type="button"
          class="text-xs font-bold text-muted hover:text-main bg-transparent border-none cursor-pointer flex items-center gap-1"
          onClick={() => navigate("/user/login-local")}
        >
          ← {text("auth.backToLogin")}
        </button>
        <Button type="submit">
          {text("auth.createAccount")}
        </Button>
      </div>
    </form>
  );
}
