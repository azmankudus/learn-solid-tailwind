import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Icon } from '@iconify-icon/solid';
import { ICON_TABLE_CELLS, ICON_BOLT } from '~/lib/icons';
import { Table, Column } from '~/components/data/Table';
import { TABLE_DATA } from '~/lib/sample';
import { Badge } from '~/components/content/Badge';
import { showToast } from '~/components/content/Toast';

export default function TablePage() {
  const columns: Column<any>[] = [
    { 
      key: "id", 
      header: "ID", 
      width: "120px",
      type: "string",
      render: (item) => <code class="text-[10px] font-bold text-theme">{item.id}</code>
    },
    { 
      key: "name", 
      header: "User Name",
      type: "string",
      sortable: true,
      filterable: true
    },
    {
      key: "active",
      header: "Active",
      type: "boolean",
      width: "120px",
      sortable: true,
      filterable: true
    },
    { 
      key: "status", 
      header: "Status",
      width: "120px",
      type: "enum",
      sortable: true,
      filterable: true,
      render: (item) => (
        <Badge 
          variant={item.status === 'Active' ? 'success' : item.status === 'Suspended' ? 'error' : item.status === 'Idle' ? 'warning' : 'secondary'} 
          size="xs" 
          round={true}
        >
           {item.status}
        </Badge>
      )
    },
    { 
      key: "reliability", 
      header: "Score",
      width: "100px",
      type: "number",
      sortable: true,
      render: (item) => <span class="font-mono text-xs font-bold">{item.reliability}%</span>
    },
    {
      key: "cycles",
      header: "Cycles",
      width: "100px",
      type: "number",
      sortable: true
    },
    { 
      key: "lastActive", 
      header: "Last Seen",
      width: "200px",
      type: "date-time",
      sortable: true,
      render: (item) => (
        <span class="text-[11px] font-bold text-muted">
          {new Date(item.lastActive).toLocaleString()}
        </span>
      )
    },
    {
      key: "actions",
      header: "Actions",
      width: "140px",
      type: "action"
    }
  ];

  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_TABLE_CELLS} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-bold">Data Table</HeadingText>
      </div>

      <div class="flex flex-col gap-8 pb-20">
        <div class="flex flex-col gap-2 bg-theme/5 border border-theme/10 p-4 rounded-2xl max-w-2xl">
           <div class="flex items-center gap-2 text-theme">
              <Icon icon={ICON_BOLT} width={14} />
              <span class="text-[10px] font-bold uppercase tracking-widest">Component Features</span>
           </div>
           <p class="text-xs font-medium text-main/70 leading-relaxed">
             This table component includes built-in support for sorting, filtering, and pagination. It also allows for custom cell rendering, enabling you to display badges, icons, or formatted text easily.
           </p>
        </div>

        <Table 
          data={TABLE_DATA} 
          columns={columns} 
          pageSize={10} 
          class="w-full"
          title="User Management"
          onExecute={(item) => showToast({ type: 'success', title: 'Action Triggered', message: `Initializing process for ${item.id}...` })}
          onEdit={(item) => showToast({ type: 'info', title: 'Edit Mode', message: `Editing details for ${item.name}` })}
          onDelete={(item) => showToast({ type: 'error', title: 'Delete Entry', message: `Deleting ${item.id} from the records...` })}
        />
      </div>
    </PageWrapper>
  );
}
