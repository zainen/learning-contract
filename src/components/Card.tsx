import { PropsWithChildren } from "react";

export const Card = (props: PropsWithChildren<{className?: string}>) => {
  return (
    <div className={`border-green-600 border-2 bg-slate-300 rounded-md ${props.className}`}>
      {props.children}
    </div>
  );
};