import { createSignal, For, Show, onMount, createMemo } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import { useNavigate } from '@solidjs/router';
import { Workflow } from '~/lib/workflow/types';
import { PageWrapper } from '~/components/layout/PageWrapper';
import { Button } from '~/components/input/Button';
import { TextField } from '~/components/input/TextField';
import { ICON_PLUS, ICON_SEARCH, ICON_COG, ICON_TRASH, ICON_CLOCK, ICON_PLAY, ICON_COPY } from '~/lib/icons';

const STORAGE_KEY = 'workflows';

function loadWorkflows(): Workflow[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveWorkflows(workflows: Workflow[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(workflows));
}

export default function WorkflowListPage() {
  const navigate = useNavigate();
  const [workflows, setWorkflows] = createSignal<Workflow[]>([]);
  const [search, setSearch] = createSignal('');
  const [deleteConfirm, setDeleteConfirm] = createSignal<string | null>(null);

  onMount(() => {
    setWorkflows(loadWorkflows());
  });

  const filteredWorkflows = createMemo(() => {
    const q = search().toLowerCase();
    return workflows().filter(w => 
      w.name.toLowerCase().includes(q) ||
      w.description?.toLowerCase().includes(q) ||
      w.tags?.some(t => t.toLowerCase().includes(q))
    );
  });

  const createNewWorkflow = () => {
    const newWorkflow: Workflow = {
      id: `wf-${Date.now()}`,
      name: 'New Workflow',
      description: '',
      nodes: [],
      connections: [],
      variables: {},
      settings: {
        timezone: 'UTC',
        saveManualExecutions: true,
        saveExecutionProgress: true,
        saveDataErrorExecution: false,
        executionTimeout: 300,
        retryOnFail: false,
        maxTries: 3,
        waitBetweenTries: 1000,
      },
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
      tags: [],
    };
    
    const updated = [...workflows(), newWorkflow];
    setWorkflows(updated);
    saveWorkflows(updated);
    navigate(`/workflow/designer?id=${newWorkflow.id}`);
  };

  const duplicateWorkflow = (workflow: Workflow) => {
    const duplicate: Workflow = {
      ...workflow,
      id: `wf-${Date.now()}`,
      name: `${workflow.name} (Copy)`,
      nodes: workflow.nodes.map(n => ({
        ...n,
        id: `${n.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      })),
      connections: workflow.connections.map(c => ({
        ...c,
        id: `conn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      })),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    const updated = [...workflows(), duplicate];
    setWorkflows(updated);
    saveWorkflows(updated);
  };

  const deleteWorkflow = (id: string) => {
    const updated = workflows().filter(w => w.id !== id);
    setWorkflows(updated);
    saveWorkflows(updated);
    setDeleteConfirm(null);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <PageWrapper class="p-8">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-2xl font-bold text-white">Workflows</h1>
            <p class="text-slate-400 text-sm mt-1">Create and manage your automation workflows</p>
          </div>
          <Button onClick={createNewWorkflow} class="flex items-center gap-2">
            <Icon icon={ICON_PLUS} width={16} />
            New Workflow
          </Button>
        </div>

        <div class="mb-6">
          <div class="relative max-w-md">
            <Icon icon={ICON_SEARCH} class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" width={16} />
            <input
              type="text"
              placeholder="Search workflows..."
              value={search()}
              onInput={(e) => setSearch(e.currentTarget.value)}
              class="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 outline-none focus:border-orange-400/50"
            />
          </div>
        </div>

        <Show when={filteredWorkflows().length === 0}>
          <div class="text-center py-16">
            <div class="w-20 h-20 rounded-2xl bg-slate-800/50 flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:workflow" class="text-slate-600" width={40} />
            </div>
            <Show when={search()} fallback={
              <>
                <p class="text-slate-400 text-lg mb-2">No workflows yet</p>
                <p class="text-slate-500 text-sm mb-6">Create your first workflow to get started</p>
                <Button onClick={createNewWorkflow} class="flex items-center gap-2 mx-auto">
                  <Icon icon={ICON_PLUS} width={16} />
                  Create Workflow
                </Button>
              </>
            }>
              <p class="text-slate-400 text-lg">No workflows found</p>
              <p class="text-slate-500 text-sm">Try a different search term</p>
            </Show>
          </div>
        </Show>

        <Show when={filteredWorkflows().length > 0}>
          <div class="grid gap-4">
            <For each={filteredWorkflows()}>
              {(workflow) => (
                <div class="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-5 hover:border-slate-600 transition-all group">
                  <div class="flex items-start justify-between">
                    <div class="flex-1 min-w-0 cursor-pointer" onClick={() => navigate(`/workflow/designer?id=${workflow.id}`)}>
                      <h3 class="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">{workflow.name}</h3>
                      <Show when={workflow.description}>
                        <p class="text-slate-400 text-sm mt-1 truncate">{workflow.description}</p>
                      </Show>
                      
                      <div class="flex items-center gap-4 mt-3 text-xs text-slate-500">
                        <span class="flex items-center gap-1">
                          <Icon icon="mdi:cube-outline" width={14} />
                          {workflow.nodes.length} nodes
                        </span>
                        <span class="flex items-center gap-1">
                          <Icon icon="mdi:vector-line" width={14} />
                          {workflow.connections.length} connections
                        </span>
                        <span class="flex items-center gap-1">
                          <Icon icon={ICON_CLOCK} width={14} />
                          {formatDate(workflow.updatedAt)}
                        </span>
                      </div>

                      <Show when={workflow.tags && workflow.tags.length > 0}>
                        <div class="flex gap-2 mt-3">
                          <For each={workflow.tags?.slice(0, 3)}>
                            {(tag) => (
                              <span class="px-2 py-0.5 bg-slate-700/50 rounded-full text-[10px] font-bold uppercase tracking-wide text-slate-400">
                                {tag}
                              </span>
                            )}
                          </For>
                          <Show when={(workflow.tags?.length ?? 0) > 3}>
                            <span class="text-[10px] text-slate-500">+{(workflow.tags?.length ?? 0) - 3} more</span>
                          </Show>
                        </div>
                      </Show>
                    </div>

                    <div class="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => navigate(`/workflow/designer?id=${workflow.id}`)}
                        class="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-orange-400 transition-colors"
                        title="Edit"
                      >
                        <Icon icon={ICON_COG} width={18} />
                      </button>
                      <button
                        onClick={() => duplicateWorkflow(workflow)}
                        class="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-emerald-400 transition-colors"
                        title="Duplicate"
                      >
                        <Icon icon={ICON_COPY} width={18} />
                      </button>
                      <Show when={deleteConfirm() === workflow.id} fallback={
                        <button
                          onClick={() => setDeleteConfirm(workflow.id)}
                          class="p-2 rounded-lg hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                          title="Delete"
                        >
                          <Icon icon={ICON_TRASH} width={18} />
                        </button>
                      }>
                        <button
                          onClick={() => deleteWorkflow(workflow.id)}
                          class="p-2 rounded-lg bg-rose-500/20 text-rose-400 transition-colors"
                          title="Confirm Delete"
                        >
                          <Icon icon={ICON_TRASH} width={18} />
                        </button>
                      </Show>
                    </div>
                  </div>
                </div>
              )}
            </For>
          </div>
        </Show>
      </div>
    </PageWrapper>
  );
}
