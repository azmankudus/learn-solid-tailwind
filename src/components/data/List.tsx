import { createSignal, createMemo, For, JSX } from "solid-js";
import { Pagination } from "./Pagination";

export interface ListProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => JSX.Element;
  pageSize?: number;
  class?: string;
  grid?: boolean;
  cols?: number;
}

export function List<T>(props: ListProps<T>) {
  const [currentPage, setCurrentPage] = createSignal(1);
  const pageSize = () => props.pageSize || 10;

  const paginatedData = createMemo(() => {
    const start = (currentPage() - 1) * pageSize();
    return props.data.slice(start, start + pageSize());
  });

  return (
    <div class={`flex flex-col gap-6 ${props.class || ""}`}>
      <div 
        classList={{
          "grid gap-4": props.grid,
          "grid-cols-1 md:grid-cols-2 lg:grid-cols-3": props.grid && !props.cols,
          [`grid-cols-${props.cols}`]: props.grid && !!props.cols,
          "flex flex-col gap-3": !props.grid
        }}
      >
        <For each={paginatedData()}>
          {(item, i) => (
             <div class="animate-fade-in" style={{ "animation-delay": `${i() * 50}ms` }}>
                {props.renderItem(item, i())}
             </div>
          )}
        </For>
      </div>

      <div class="flex justify-center mt-4">
        <Pagination 
          current={currentPage()} 
          total={props.data.length} 
          pageSize={pageSize()} 
          onChange={setCurrentPage} 
        />
      </div>
    </div>
  );
}
