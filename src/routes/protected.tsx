import { ParentProps } from "solid-js";
import { ProtectedLayout } from "~/components/layout/ProtectedLayout";

export default function Layout(props: ParentProps) {
  return (
    <ProtectedLayout>
      {props.children}
    </ProtectedLayout>
  );
}
