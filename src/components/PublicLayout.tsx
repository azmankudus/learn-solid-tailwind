import { ParentProps, createEffect, on, For } from "solid-js";
import { useLocation } from "@solidjs/router";
import TopNav from "./TopNav";
import { bg } from "~/lib/store";
import { Motion, Presence } from "solid-motionone";

export default function PublicLayout(props: ParentProps) {
  const location = useLocation();

  return (
    <div class="min-h-screen text-main font-sans transition-all duration-300 overflow-x-hidden" data-bg={bg()}>
      <TopNav />
      <main class="relative z-10 block min-h-screen">
        {props.children}
      </main>
    </div>
  );
}
