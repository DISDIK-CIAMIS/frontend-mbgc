"use client";

import { useEffect, useState } from "react";

export default function SppgCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/api/sppg")       // your GET API route
      .then(res => res.json())
      .then(data => setCount(data.length)) // count items
      .catch(console.error);
  }, []);

  return (
    <div className="text-xl font-bold">
      Total Data: {count}
    </div>
  );
}