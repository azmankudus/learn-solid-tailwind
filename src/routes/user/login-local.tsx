import { PageWrapper } from "~/components/layout/PageWrapper";
import { LoginFormLocal } from "~/components/composite/LoginFormLocal";
import { text } from "~/lib/i18n";
import { useNavigate } from "@solidjs/router";

export default function LoginLocalPage() {
  const navigate = useNavigate();

  return (
    <PageWrapper class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative min-h-[80vh]">
      <div class="w-full max-w-md space-y-8 relative z-10 transition-all duration-500">
        <div class="bg-solid rounded-2xl shadow-2xl border border-black/5 overflow-hidden flex flex-col transition-all duration-300">
          <div class="px-6 py-4 flex items-center justify-between border-b border-black/5 backdrop-blur-md bg-surface/50">
            <h3 class="text-lg font-bold text-main tracking-tight">{text("auth.title")}</h3>
          </div>
          <div class="p-8">
            <LoginFormLocal onCancel={() => navigate("/user/login")} />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
