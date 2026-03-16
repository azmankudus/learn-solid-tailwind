
import { createSignal, JSX, Show } from "solid-js";
import { Card } from "./Card";
import { HeadingText } from "./Heading";
import { Radio } from "../input/Radio";

export interface ComponentViewerProps {
  title: string;
  icon?: JSX.Element;
  description?: string;
  code: string;
  children: JSX.Element;
  class?: string;
}

export function ComponentViewer(props: ComponentViewerProps) {
  const [view, setView] = createSignal("preview");

  return (
    <Card class={`flex flex-col border-none shadow-sm transition-all duration-300 relative hover:z-[100] focus-within:z-[300] ${props.class || ""}`} padding="p-0" overflowVisible={true}>
      <div class="px-8 py-6 border-b border-input-border flex flex-wrap items-center justify-between gap-6 bg-surface/50 rounded-t-2xl">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-3">
             <div class="text-theme flex items-center justify-center w-5 h-5">
              {props.icon}
            </div>
            <span class="text-sm font-bold text-main tracking-tight">{props.title}</span>
          </div>
          <Show when={props.description}>
            <p class="text-[10px] items-center font-bold text-muted uppercase tracking-wider">{props.description}</p>
          </Show>
        </div>

        <Radio
          class="w-40 !p-0.5"
          value={view()}
          onChange={setView}
          options={[
            { id: "preview", label: "Preview" },
            { id: "code", label: "HTML" }
          ]}
        />
      </div>

      <div class="relative bg-surface/10 rounded-b-2xl">
        <Show when={view() === "preview"} fallback={
          <div class="p-8 overflow-auto max-h-[500px] bg-[#0d1117] rounded-b-2xl">
            <pre class="text-[11px] font-mono p-6 bg-black/20 rounded-xl border border-white/5 text-emerald-400 overflow-x-auto whitespace-pre rounded-b-2xl">
              {props.code.trim()}
            </pre>
          </div>
        }>
          <div class="p-10 flex flex-wrap gap-6 items-center justify-center min-h-[200px]">
            {props.children}
          </div>
        </Show>
      </div>
    </Card>
  );
}
