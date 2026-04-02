// components/charts/DynamicChartWrapper.js
"use client";

import dynamic from "next/dynamic";

const DynamicChartWrapper = ({ componentPath, data, ...props }) => {
  const DynamicComponent = dynamic(
    () => import(`@/components/charts/${componentPath}`),
    {
      ssr: false,
      loading: () => <div className="p30">Loading Chart...</div>,
    }
  );

  return <DynamicComponent data={data} {...props} />;
};

export default DynamicChartWrapper;