import { PageWrapper } from '~/components/layout/PageWrapper';
import { HeadingText } from '~/components/content/Heading';
import { Icon } from '@iconify-icon/solid';
import { ICON_LIST_BULLET, ICON_BOLT } from '~/lib/icons';
import { List } from '~/components/data/List';
import { TABLE_DATA } from '~/lib/sample';
import { Card } from '~/components/content/Card';
import { Badge } from '~/components/content/Badge';
import { Avatar } from '~/components/content/Avatar';

export default function ListPage() {
  return (
    <PageWrapper class="flex flex-col space-y-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-10 w-10 rounded-xl bg-theme/10 text-theme flex items-center justify-center">
          <Icon icon={ICON_LIST_BULLET} width={24} height={24} />
        </div>
        <HeadingText level={2} class="text-3xl font-bold">List</HeadingText>
      </div>

      <div class="flex flex-col gap-10 pb-20">
        <section class="flex flex-col gap-6">
           <div class="flex items-center gap-3 border-b border-input-border pb-2 px-1">
              <span class="text-[11px] font-bold uppercase tracking-wider text-theme">Grid Layout</span>
              <div class="h-[1px] bg-theme/10 flex-1" />
           </div>
           
           <List 
             data={TABLE_DATA} 
             grid={true}
             pageSize={6}
             renderItem={(item) => (
                <Card class="group hover:border-theme/40 transition-all duration-300 hover:shadow-lg">
                   <div class="flex items-start justify-between mb-4">
                      <Avatar name={item.name} size="md" status={item.status.toLowerCase() as any} />
                      <Badge variant={item.role === 'Root' ? 'error' : 'primary'} size="xs">{item.role}</Badge>
                   </div>
                   <h3 class="font-bold text-sm text-main mb-1">{item.name}</h3>
                   <p class="text-[10px] font-bold text-muted uppercase tracking-wider mb-4">{item.email}</p>
                   
                   <div class="pt-4 border-t border-input-border/50 flex items-center justify-between">
                      <div class="flex flex-col">
                         <span class="text-[8px] font-bold uppercase text-muted">Reliability</span>
                         <span class="text-xs font-bold text-theme">{item.reliability}%</span>
                      </div>
                      <button class="w-8 h-8 rounded-lg bg-input flex items-center justify-center hover:bg-theme hover:text-white transition-colors">
                         <Icon icon={ICON_BOLT} width={14} />
                      </button>
                   </div>
                </Card>
             )}
           />
        </section>

        <section class="flex flex-col gap-6">
           <div class="flex items-center gap-3 border-b border-input-border pb-2 px-1">
              <span class="text-[11px] font-bold uppercase tracking-wider text-muted">Stack Layout</span>
              <div class="h-[1px] bg-input-border/50 flex-1" />
           </div>

           <List 
             data={TABLE_DATA} 
             pageSize={5}
             renderItem={(item) => (
                <div class="flex items-center justify-between p-4 bg-surface border border-input-border rounded-2xl hover:bg-theme/[0.02] transition-colors group">
                   <div class="flex items-center gap-4">
                      <div class="w-1 h-10 rounded-full bg-input-border group-hover:bg-theme transition-colors" />
                      <div class="flex flex-col">
                         <span class="text-[9px] font-bold uppercase tracking-wider text-muted">{item.id}</span>
                         <span class="text-sm font-bold text-main">{item.name}</span>
                      </div>
                   </div>
                   <div class="flex items-center gap-6">
                      <div class="hidden md:flex flex-col items-end">
                         <span class="text-[8px] font-bold uppercase text-muted">Last Activity</span>
                         <span class="text-[11px] font-semibold text-main/80">{item.lastActive}</span>
                      </div>
                      <Badge variant="outline" size="sm">{item.status}</Badge>
                   </div>
                </div>
             )}
           />
        </section>
      </div>
    </PageWrapper>
  );
}
