import { ParentProps } from "solid-js";
import { ProtectedLayout } from "~/components/Components";

export default function Layout(props: ParentProps) {
  return (
    <ProtectedLayout>
      {props.children}
    </ProtectedLayout>
  );
}
