import { PageWrapper } from '~/components/layout/PageWrapper';
import { Icon } from '@iconify-icon/solid';
import { createSignal } from 'solid-js';
import { 
  ICON_BOLT, ICON_DATABASE, ICON_LINK, ICON_LOGO_SLACK, ICON_CODE, ICON_BRANCH, ICON_ACTIVITY
} from '~/lib/icons';
import { WorkflowBoard, WorkflowNode, WorkflowConnection } from '~/components/content/WorkflowBoard';

export default function WorkflowPage() {
  // Sophisticated enterprise starting state
  const initialNodes: WorkflowNode[] = [
    { 
      id: 'webhook-99', 
      category: 'trigger',
      type: 'webhook', 
      name: 'Order Webhook', 
      icon: ICON_ACTIVITY, 
      position: { x: 50, y: 150 }, 
      status: 'idle',
      parameters: { path: '/v1/orders', method: 'POST' },
      data: []
    },
    { 
      id: 'db-42', 
      category: 'action',
      type: 'db', 
      name: 'Verify Client', 
      icon: ICON_DATABASE, 
      position: { x: 300, y: 150 }, 
      status: 'idle',
      parameters: { table: 'customers', query: 'SELECT *' },
      data: []
    },
    { 
      id: 'if-33', 
      category: 'logic',
      type: 'if', 
      name: 'Check Credit', 
      icon: ICON_BRANCH, 
      position: { x: 550, y: 150 }, 
      status: 'idle',
      parameters: { condition: 'credit_score > 700' },
      data: []
    },
    { 
      id: 'slack-11', 
      category: 'output',
      type: 'slack', 
      name: 'Notify Discord', 
      icon: ICON_LOGO_SLACK, 
      position: { x: 800, y: 50 }, 
      status: 'idle',
      parameters: { channel: '#sales-hq', text: 'New qualified lead!' },
      data: []
    },
    { 
      id: 'code-77', 
      category: 'transform',
      type: 'code', 
      name: 'Format Invoice', 
      icon: ICON_CODE, 
      position: { x: 800, y: 250 }, 
      status: 'idle',
      parameters: { script: 'return items.map(i => ({ price: i.json.price * 1.15 }));' },
      data: []
    },
  ];

  const initialConnections: WorkflowConnection[] = [
    { id: 'c1', sourceId: 'webhook-99', targetId: 'db-42' },
    { id: 'c2', sourceId: 'db-42', targetId: 'if-33' },
    { id: 'c3', sourceId: 'if-33', targetId: 'slack-11' },
    { id: 'c4', sourceId: 'if-33', targetId: 'code-77' },
  ];

  const handleSave = (state: any) => {
    localStorage.setItem('n8n_architect_pro', JSON.stringify(state));
    console.log('Orchestration State Saved:', state);
  };

  return (
    <PageWrapper class="flex flex-col h-screen bg-[#0d1117] !p-0 overflow-hidden">
      <div class="flex-1 flex flex-col h-full overflow-hidden">
        <WorkflowBoard 
          initialNodes={initialNodes}
          initialConnections={initialConnections}
          onSave={handleSave}
        />
      </div>
    </PageWrapper>
  );
}
