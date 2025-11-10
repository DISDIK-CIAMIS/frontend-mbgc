"use client";

import { useEffect, useState } from "react";
import NestedDataTable from "./NestedDataTable"; // default

export default function ClientOnlyTable({ data, component: Component = NestedDataTable, ...rest }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // or skeleton
  return <Component data={data} {...rest} />;
}