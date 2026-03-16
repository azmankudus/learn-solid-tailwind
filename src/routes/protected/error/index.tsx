
import { createSignal, For } from "solid-js";
import { Icon } from "@iconify-icon/solid";
import { ICON_EXCLAMATION_TRIANGLE } from "~/lib/icons";
import { PageWrapper } from "~/components/layout/PageWrapper";
import { HeadingText } from "~/components/content/Heading";
import { ERROR_CONFIGS } from "~/lib/errors";
import { ErrorModal } from "~/components/content/ErrorModal";

export default function ErrorShowcase() {
  const [selectedModalCode, setSelectedModalCode] = createSignal<string | null>(null);
  const errorCodes = Object.keys(ERROR_CONFIGS).filter(k => k !== "default");

  return (
    <PageWrapper class="flex flex-col space-y-8">
      <div class="flex items-center space-x-3 mb-2">
        <div class="h-10 w-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center">
          <Icon icon={ICON_EXCLAMATION_TRIANGLE} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-black italic tracking-tighter uppercase">Error Protocol</HeadingText>
      </div>

      <div class="flex flex-col gap-8">
        <section class="space-y-4 pb-12">
          <div class="flex items-center justify-between border-b border-input-border pb-4">
            <div class="space-y-1">
              <h2 class="text-lg font-bold text-main">System Status Templates</h2>
              <p class="text-sm text-muted font-medium">Click any status code to preview the diagnostic modal interface.</p>
            </div>
            <span class="text-[10px] font-black text-muted uppercase tracking-[0.2em] bg-hover px-3 py-1 rounded-full">Modal-Only Architecture</span>
          </div>
          
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pt-4">
            <For each={errorCodes}>
              {(code) => {
                const config = ERROR_CONFIGS[code];
                return (
                  <button
                    onClick={() => setSelectedModalCode(code)}
                    class="group relative flex flex-col gap-4 p-5 rounded-2xl bg-surface border border-input-border shadow-sm text-left transition-all duration-300 hover:border-theme hover:shadow-lg hover:shadow-theme/5 hover:-translate-y-1 active:scale-[0.98]"
                  >
                    <div class="flex items-center justify-between w-full">
                      <span class="text-2xl font-black font-mono text-main leading-none">
                        {code}
                      </span>
                      <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-hover text-muted group-hover:bg-theme group-hover:text-white transition-all duration-300">
                        <Icon icon={config.icon} width={20} height={20} />
                      </div>
                    </div>

                    <div class="space-y-1">
                      <h3 class="text-[10px] font-black text-muted uppercase tracking-[0.2em] group-hover:text-theme transition-colors line-clamp-2 min-h-[2.4em]">
                        {config.name}
                      </h3>
                    </div>

                    <div class="mt-auto">
                      <span
                        class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                        classList={{
                          "bg-red-500/10 text-red-500": config.isServerError,
                          "bg-amber-500/10 text-amber-500": !config.isServerError,
                        }}
                      >
                        <div
                          class="w-1.5 h-1.5 rounded-full"
                          classList={{
                            "bg-red-500": config.isServerError,
                            "bg-amber-500": !config.isServerError,
                          }}
                        ></div>
                        {config.isServerError ? "Server" : "Client"}
                      </span>
                    </div>
                  </button>
                );
              }}
            </For>
          </div>
        </section>
      </div>

      <ErrorModal 
        isOpen={!!selectedModalCode()} 
        code={selectedModalCode() || "500"} 
        onClose={() => setSelectedModalCode(null)} 
      />
    </PageWrapper>
  );
}
