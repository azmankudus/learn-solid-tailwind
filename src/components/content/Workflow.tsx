import { For, JSX, Show } from "solid-js";
import { Card } from "./Card";

export interface WorkflowStep {
  id: string | number;
  title: string;
  description: string;
  icon?: JSX.Element;
  status?: "pending" | "active" | "completed";
}

export interface WorkflowProps {
  steps: WorkflowStep[];
  class?: string;
}

export function Workflow(props: WorkflowProps) {
  return (
    <div class={`relative flex flex-col gap-12 lg:gap-0 lg:flex-row lg:items-start lg:justify-between px-4 ${props.class || ""}`}>
      {/* Background Animated Line (Desktop Only) */}
      <div class="hidden lg:block absolute top-[60px] left-0 w-full h-[2px] overflow-hidden">
        <div class="w-full h-full bg-theme/10 relative">
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-theme to-transparent w-full h-full animate-workflow-line" />
        </div>
      </div>

      <For each={props.steps}>
        {(step, index) => (
          <div class="relative z-10 flex flex-col items-center lg:w-full">
            {/* Step Indicator */}
            <div 
              class={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 shadow-lg ${
                step.status === 'active' 
                ? 'bg-theme text-white scale-110 ring-4 ring-theme/20 shadow-theme/30 animate-step-pulse' 
                : step.status === 'completed'
                ? 'bg-success text-white'
                : 'bg-surface border border-white/10 text-muted'
              }`}
            >
               <Show when={step.icon} fallback={<span class="font-bold text-lg">{index() + 1}</span>}>
                 {step.icon}
               </Show>
            </div>

            {/* Mobile Connecting Line */}
            <Show when={index() < props.steps.length - 1}>
              <div class="lg:hidden absolute top-12 left-1/2 -translate-x-1/2 w-[2px] h-12 overflow-hidden">
                <div class="w-full h-full bg-theme/10 relative">
                  <div class="absolute inset-0 bg-gradient-to-b from-transparent via-theme to-transparent w-full h-full animate-workflow-line-v" />
                </div>
              </div>
            </Show>

            {/* Content Card */}
            <Card 
              class={`w-full max-w-[280px] lg:mx-4 border-none shadow-xl ${
                step.status === 'active' ? 'ring-2 ring-theme/30' : ''
              }`}
              padding="p-5"
            >
              <h4 class="font-bold text-main text-base mb-2">{step.title}</h4>
              <p class="text-xs text-muted leading-relaxed line-clamp-3">
                {step.description}
              </p>
            </Card>
          </div>
        )}
      </For>

      <style>
        {`
          @keyframes workflow-line {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes workflow-line-v {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
          @keyframes workflow-pulse {
            0% { box-shadow: 0 0 0 0 rgba(var(--color-theme-rgb), 0.4); }
            70% { box-shadow: 0 0 0 15px rgba(var(--color-theme-rgb), 0); }
            100% { box-shadow: 0 0 0 0 rgba(var(--color-theme-rgb), 0); }
          }
          .animate-workflow-line {
            animation: workflow-line 3s linear infinite;
          }
          .animate-workflow-line-v {
            animation: workflow-line-v 3s linear infinite;
          }
          .animate-step-pulse {
            animation: workflow-pulse 2s infinite;
          }
        `}
      </style>
    </div>
  );
}
