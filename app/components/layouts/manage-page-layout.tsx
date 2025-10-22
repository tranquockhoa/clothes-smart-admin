import type { ReactNode } from "react";

interface ManagePageLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function ManagePageLayout({
  children,
  className = "",
}: ManagePageLayoutProps) {
  const baseClassName = "p-[32px] flex flex-col gap-[10px]";
  const finalClassName = `${baseClassName} ${className}`.trim();

  return <div className={finalClassName}>{children}</div>;
}
