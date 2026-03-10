import { ParentProps, createEffect, onMount, createSignal, Show } from "solid-js";
import { useLocation, useNavigate } from "@solidjs/router";
import SideNav from "./SideNav";
import { bg, isLoggedIn, setIsLoginModalOpen, setRedirectUrl, isLoaded } from "~/lib/store";
import { Motion, Presence } from "solid-motionone";

export default function ProtectedLayout(props: ParentProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mounted, setMounted] = createSignal(false);

  onMount(() => {
    setMounted(true);
  });

  createEffect(() => {
    if (isLoaded() && !isLoggedIn()) {
      setRedirectUrl(location.pathname);
      navigate("/", { replace: true });
      setTimeout(() => setIsLoginModalOpen(true), 100);
    }
  });

  return (
    <Show when={mounted() && isLoaded() && isLoggedIn()}>
      <div class="flex h-[calc(100vh-64px)] w-full transition-all duration-300 relative text-main">
        <SideNav />
        <main class="flex-1 p-4 sm:p-6 lg:p-8 relative z-10 bg-transparent overflow-y-auto custom-scrollbar overflow-x-hidden">
        <div class="w-full text-left animate-fade-in">
          {props.children}
        </div>
      </main>
      </div>
    </Show>
  );
}
