import { useNavigate } from "@solidjs/router";
import { text } from "~/lib/i18n";
import { Button } from "../input/Button";
import { Icon } from "@iconify-icon/solid";
import {
  ICON_SERVER, ICON_SHIELD_CHECK, ICON_ENVELOPE,
  ICON_LOGO_GOOGLE, ICON_LOGO_MICROSOFT, ICON_LOGO_APPLE,
  ICON_LOGO_GITHUB, ICON_LOGO_LINKEDIN, ICON_LOGO_FACEBOOK,
  ICON_LOGO_DISCORD, ICON_LOGO_SLACK, ICON_LOGO_OKTA, ICON_LOGO_GITLAB
} from "~/lib/icons";

export function LoginForm() {
  const navigate = useNavigate();
  const oauthProviders = [
    { id: "google", name: "Google", icon: ICON_LOGO_GOOGLE },
    { id: "microsoft", name: "Microsoft", icon: ICON_LOGO_MICROSOFT },
    { id: "apple", name: "Apple", icon: ICON_LOGO_APPLE },
    { id: "github", name: "GitHub", icon: ICON_LOGO_GITHUB },
    { id: "linkedin", name: "LinkedIn", icon: ICON_LOGO_LINKEDIN },
    { id: "facebook", name: "Facebook", icon: ICON_LOGO_FACEBOOK },
    { id: "discord", name: "Discord", icon: ICON_LOGO_DISCORD },
    { id: "slack", name: "Slack", icon: ICON_LOGO_SLACK },
    { id: "okta", name: "Okta", icon: ICON_LOGO_OKTA },
    { id: "gitlab", name: "GitLab", icon: ICON_LOGO_GITLAB },
  ];

  return (
    <div class="flex flex-col h-full">
      <div class="flex flex-col gap-6 py-2">

        {/* Enterprise Providers */}
        <div class="flex flex-col gap-3">
          <Button class="w-full py-3.5 bg-surface border border-input-border text-main hover:bg-theme/5 flex items-center justify-center gap-2 transition-all shadow-sm">
            <Icon icon={ICON_SHIELD_CHECK} width={20} height={20} class="text-blue-500" />
            <span>{text("auth.enterprise")}</span>
          </Button>
          <Button class="w-full py-3.5 bg-surface border border-input-border text-main hover:bg-theme/5 flex items-center justify-center gap-2 transition-all shadow-sm">
            <Icon icon={ICON_SERVER} width={20} height={20} class="text-slate-500" />
            <span>{text("auth.activeDirectory")}</span>
          </Button>
        </div>

        {/* OAuth Providers */}
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-3">
            <hr class="flex-1 border-t border-input-border" />
            <span class="text-xs font-semibold uppercase tracking-widest text-muted">{text("auth.oauthContinue")}</span>
            <hr class="flex-1 border-t border-input-border" />
          </div>

          <div class="grid grid-cols-5 gap-3">
            {oauthProviders.map((provider) => (
              <button
                type="button"
                title={`${text("nav.login")} with ${provider.name}`}
                class="h-12 flex items-center justify-center rounded-xl border border-input-border bg-surface hover:bg-theme/5 hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer"
              >
                <Icon icon={provider.icon} width={24} height={24} />
              </button>
            ))}
          </div>
        </div>

        {/* Local Login */}
        <div class="flex flex-col gap-3 mt-2">
          <Button
            class="w-full py-3.5 bg-theme text-white border-none transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
            onClick={() => navigate("/user/login-local")}
          >
            <Icon icon={ICON_ENVELOPE} width={20} height={20} />
            <span>{text("auth.loginWithEmail")}</span>
          </Button>
        </div>

      </div>
    </div>
  );
}
