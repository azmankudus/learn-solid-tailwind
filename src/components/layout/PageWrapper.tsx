import { ParentProps, createEffect } from "solid-js";
import { useLocation } from "@solidjs/router";

export interface PageWrapperProps extends ParentProps {
  class?: string;
}

export function PageWrapper(props: PageWrapperProps) {
  const location = useLocation();
  let wrapperRef: HTMLDivElement | undefined;

  createEffect(() => {
    // Listen to route changes to re-trigger CSS animations
    location.pathname;
    if (wrapperRef) {
      wrapperRef.style.animation = 'none';
      void wrapperRef.offsetHeight; // force DOM reflow
      wrapperRef.style.animation = '';
    }
  });

  return (
    <div ref={wrapperRef} class={`animate-fade-in ${props.class || ""}`}>
      {props.children}
    </div>
  );
}
