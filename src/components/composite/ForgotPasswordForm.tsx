import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { text } from "~/lib/i18n";
import { Button } from "../input/Button";
import { TextField } from "../input/TextField";

interface ForgotPasswordFormProps {
}

export function ForgotPasswordForm(props: ForgotPasswordFormProps) {
  const [email, setEmail] = createSignal("");
  const [emailError, setEmailError] = createSignal("");
  const [isSuccess, setIsSuccess] = createSignal(false);
  const navigate = useNavigate();

  const handleReset = (e: Event) => {
    e.preventDefault();
    setEmailError("");

    if (!email()) {
      setEmailError(text("auth.required"));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email())) {
      setEmailError(text("auth.invalidEmail"));
      return;
    }

    // Simulate success
    setIsSuccess(true);
  };

  return (
    <form onSubmit={handleReset} class="flex flex-col">
      <div class="py-2">
        {isSuccess() ? (
          <div class="p-4 rounded-xl relative border border-solid border-green-500/20 bg-green-500/10 text-green-700 dark:text-green-400 text-sm font-medium mb-4">
            {text("auth.resetSuccess").replace("{email}", email())}
          </div>
        ) : (
          <div class="space-y-4">
            <p class="text-xs text-muted font-medium mb-1">{text("auth.forgotDesc")}</p>
            <TextField
              label={text("auth.emailAddress")}
              value={email()}
              onInput={setEmail}
              placeholder="john.doe@example.com"
              error={emailError()}
            />
          </div>
        )}
      </div>

      <div class="mt-8 flex items-center justify-between border-t border-black/5 pt-6 -mx-6 px-6 bg-surface/30">
        <button 
          type="button" 
          class="text-xs font-bold text-muted hover:text-main bg-transparent border-none cursor-pointer flex items-center gap-1"
          onClick={() => navigate("/user/login")}
        >
          ← {text("auth.backToLogin")}
        </button>
        <Button onClick={!isSuccess() ? handleReset : () => navigate("/user/login")}>
          {isSuccess() ? "Done" : text("auth.resetPassword")}
        </Button>
      </div>
    </form>
  );
}
