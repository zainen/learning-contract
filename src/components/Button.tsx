import { PropsWithChildren } from "react";

export const Button = ({children, onClick, className, isLoading, disable}: PropsWithChildren<{className?: string; onClick?: () => void; isLoading?: boolean; disable?: boolean}>) => {
  console.log(isLoading)
  return (
    <button className={` ${className}`} onClick={onClick} disabled={disable}>{children}</button>
  )
}