import { Suspense } from "react";

export default function SupsenseComp({ fallback, children }) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}
