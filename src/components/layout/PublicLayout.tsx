import { ParentProps, createEffect, on, For, createSignal, onMount } from "solid-js";
import { useLocation } from "@solidjs/router";
import { TopNav } from "../navigation/TopNav";
import { bg, view } from "~/lib/store";

export function PublicLayout(props: ParentProps) {
  const location = useLocation();
  const [isMounted, setIsMounted] = createSignal(false);

  onMount(() => {
    setTimeout(() => setIsMounted(true), 150);
  });

  return (
    <div class="min-h-screen text-main font-sans transition-colors duration-300" data-bg={bg()}>
      <TopNav />
      <main
        class="relative z-10 mx-auto layout-view-transition"
        style={{
          "max-width": view() === 'center' ? '1280px' : '100%'
        }}
      >
        {props.children}
      </main>
    </div>
  );
}
