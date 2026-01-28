"use client";

type TimeProps = {
  iso: string;
};

const Time = ({ iso }: TimeProps) => {
  const date = new Date(iso);

  const formatted = date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return <span title={formatted}>{formatted}</span>;
};

export default Time;