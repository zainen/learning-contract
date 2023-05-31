import { PropsWithChildren } from "react";

export const Button = ({children, onClick, className, disable}: PropsWithChildren<{className?: string; onClick?: () => void; isLoading?: boolean; disable?: boolean}>) => {
  return (
    <button className={` ${className}`} onClick={onClick} disabled={disable}>{children}</button>
  )
}