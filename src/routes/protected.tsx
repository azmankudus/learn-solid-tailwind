import { ParentProps } from "solid-js";
import ProtectedLayout from "~/components/ProtectedLayout";

export default function Layout(props: ParentProps) {
  return (
    <ProtectedLayout>
      {props.children}
    </ProtectedLayout>
  );
}
