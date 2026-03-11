import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";

import { PublicLayout } from "./components/Components";

import { MetaProvider, Title, Meta } from "@solidjs/meta";

export default function App() {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <Title>UI-DEN | Premium Design System</Title>
          <Meta name="description" content="A premium, modern design system built with SolidJS and Tailwind CSS v4." />
          <PublicLayout>
            <Suspense>{props.children}</Suspense>
          </PublicLayout>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
