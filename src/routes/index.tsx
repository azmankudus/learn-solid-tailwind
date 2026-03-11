import { A } from "@solidjs/router";
import { HeadingText, PageWrapper, Button, Card } from "~/components/Components";
import { HiSolidArrowSmallRight, HiSolidSquare3Stack3d } from "solid-icons/hi";
import { t } from "~/lib/i18n";

export default function Home() {
  return (
    <PageWrapper class="relative overflow-hidden pt-6 pb-24 sm:pt-10 sm:pb-32 lg:pt-12 lg:pb-40">
      {/* Background Orbs for atmosphere */}
      <div class="absolute -top-40 -left-40 w-96 h-96 bg-theme rounded-full blur-[120px] opacity-10 pointer-events-none" />
      <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-theme rounded-full blur-[120px] opacity-10 pointer-events-none" />

      <div class="px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="lg:grid lg:grid-cols-12 lg:gap-24 items-center">
          <div class="sm:text-center md:mx-auto md:max-w-3xl lg:col-span-6 lg:text-left">
            <div class="mb-8 flex sm:justify-center lg:justify-start">
              <span class="bg-primary/5 text-theme-solid px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider border-none shadow-sm relative overflow-hidden">
                <div class="absolute inset-0 bg-theme/10 blur-xl pointer-events-none" />
                <span class="relative z-10">{t("landing.badge")}</span>
              </span>
            </div>
            <HeadingText level={1} class="text-5xl sm:text-6xl md:text-7xl leading-tight mb-8">
              {t("landing.title1")} <span class="text-theme">{t("landing.title2")}</span> {t("landing.title3")}
            </HeadingText>
            <p class="text-lg text-muted sm:text-xl leading-relaxed font-medium mb-10 max-w-2xl sm:mx-auto lg:mx-0">
              {t("landing.desc")}
            </p>
            <div class="flex flex-wrap gap-4 sm:justify-center lg:justify-start">
              <A href="/protected">
                <Button class="px-8 py-3.5 text-base shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:scale-[1.02]">
                  {t("landing.cta")} <HiSolidArrowSmallRight size={20} />
                </Button>
              </A>
              <button class="flex items-center justify-center px-8 py-3.5 text-base font-semibold text-main bg-surface/80 border-none backdrop-blur-md rounded-xl hover:bg-surface transition-all duration-300 active:scale-95 shadow-sm cursor-pointer">
                {t("landing.learn")}
              </button>
            </div>
          </div>

          <div class="mt-20 sm:mt-24 lg:col-span-6 lg:mt-0 relative">
            <div class="absolute -inset-10 bg-theme rounded-3xl opacity-5 blur-[100px] transition-all duration-700 pointer-events-none" />

            <div class="relative rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-1 shadow-2xl border-none bg-surface/80 backdrop-blur-2xl">
              <div class="rounded-3xl bg-surface/80 overflow-hidden border-none backdrop-blur-2xl">
                <div class="bg-surface/50 px-6 py-4 border-none flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div class="h-3 w-3 rounded-full bg-red-400/80 shadow-inner" />
                    <div class="h-3 w-3 rounded-full bg-amber-400/80 shadow-inner" />
                    <div class="h-3 w-3 rounded-full bg-emerald-400/80 shadow-inner" />
                  </div>
                  <div class="h-5 w-48 sm:w-64 bg-surface/50 shadow-inner rounded-md border-none" />
                  <div class="w-8 h-1 bg-muted rounded-full opacity-20" />
                </div>

                <div class="h-[24rem] sm:h-[30rem] flex flex-col items-center justify-center p-10 text-center relative bg-surface/20">
                  <div class="h-32 w-32 rounded-3xl bg-theme shadow-md shadow-primary/20 flex items-center justify-center mb-8 relative transition-all duration-500 hover:scale-105">
                    <div class="text-white">
                      <HiSolidSquare3Stack3d size={64} />
                    </div>
                  </div>

                  <div class="relative z-10">
                    <HeadingText level={3} class="text-2xl mb-2">{t("landing.feature.title")}</HeadingText>
                    <p class="text-sm text-muted font-medium">{t("landing.feature.desc")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
