
import { createSignal, JSX, Show } from "solid-js";
import { Card } from "./Card";
import { HeadingText } from "./Heading";
import { Radio } from "../input/Radio";
import { Icon } from "@iconify-icon/solid";
import { ICON_BOLT } from "~/lib/icons";

export interface ComponentViewerProps {
  title: string;
  code: string;
  children: JSX.Element;
}

export function ComponentViewer(props: ComponentViewerProps) {
  const [view, setView] = createSignal("preview");

  return (
    <Card class="flex flex-col border-none shadow-sm overflow-hidden">
      <div class="p-6 border-b border-input-border flex flex-wrap items-center justify-between gap-4">
        <HeadingText level={4} class="text-xs uppercase tracking-widest text-muted font-bold">
          {props.title}
        </HeadingText>
        
        <Radio
          class="w-48 !p-0.5"
          value={view()}
          onChange={setView}
          options={[
            { id: "preview", label: "Preview" },
            { id: "code", label: "Code" }
          ]}
        />
      </div>

      <div class="relative bg-surface/30">
        <Show when={view() === "preview"} fallback={
          <div class="p-6 overflow-auto max-h-[400px]">
            <pre class="text-[11px] font-mono p-4 bg-input rounded-xl border border-input-border text-theme-solid overflow-x-auto whitespace-pre-wrap">
              <code>{props.code.trim()}</code>
            </pre>
          </div>
        }>
          <div class="p-8 flex flex-wrap gap-4 items-center justify-center min-h-[160px]">
            {props.children}
          </div>
        </Show>
      </div>
    </Card>
  );
}
