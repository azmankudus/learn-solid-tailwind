import { ParentProps } from "solid-js";

export interface GridProps extends ParentProps {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: number;
  class?: string;
  responsive?: boolean;
}

export function Grid(props: GridProps) {
  const gapMap: Record<number, string> = {
    1: "gap-1", 2: "gap-2", 3: "gap-3", 4: "gap-4", 6: "gap-6", 8: "gap-8"
  };

  const colMap: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    12: "grid-cols-12"
  };

  const responsiveCols = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <div 
      class={`grid ${props.responsive ? responsiveCols : colMap[props.cols || 3]} ${gapMap[props.gap || 4]} ${props.class || ""}`}
    >
      {props.children}
    </div>
  );
}
