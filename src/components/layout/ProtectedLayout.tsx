import { ParentProps, createEffect, onMount, createSignal } from "solid-js";
import { useLocation, useNavigate } from "@solidjs/router";
import { isLoggedIn, setIsLoginModalOpen, setRedirectUrl, isLoaded, view } from "~/lib/store";
import { SideNav, PageWrapper } from "../Components";

export function ProtectedLayout(props: ParentProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = createSignal(false);

  onMount(() => {
    setTimeout(() => setIsMounted(true), 150);
  });

  createEffect(() => {
    if (isLoaded() && !isLoggedIn()) {
      setRedirectUrl(location.pathname);
      navigate("/", { replace: true });
      setTimeout(() => setIsLoginModalOpen(true), 100);
    }
  });

  return (
    <div
      class={`flex w-full relative text-main min-h-screen mx-auto pt-0 layout-view-transition ${!isLoggedIn() && isMounted() ? 'opacity-0' : 'opacity-100'}`}
      style={{
        "max-width": view() === 'center' ? '1280px' : '100%'
      }}
    >
      <SideNav />
      <main class="flex-1 relative z-10 flex flex-col p-4 overflow-hidden">
        <PageWrapper class="w-full h-full text-left flex flex-col">
          {props.children}
        </PageWrapper>
      </main>
    </div>
  );
}
