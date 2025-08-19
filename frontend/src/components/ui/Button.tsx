import type { ReactElement } from "react";


interface ButtonProps{
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIncon?: ReactElement;
  onClick?: () => void;
}

const defaultStyles = "rounded-md flex"

const variantStyles = {
  "primary": "bg-purple-800 text-white",
  "secondary": "bg-purple-300 text-purple-800"
}

const sizeStyles = {
  "sm": "py-1 px-2 text-sm",
  "md": "py-2 px-4 text-md",
  "lg": "py-4 px-6 text-xl"
}

export const Button = (props: ButtonProps) => {
  return (
    <button className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]}`}>{props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null} {props.text} {props.endIncon}</button>
  )
}