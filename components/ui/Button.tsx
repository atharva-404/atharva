import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type IconMotion = "right" | "up-right" | "down" | "none";

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: "md" | "sm";
  icon?: ReactNode;
  iconMotion?: IconMotion;
  /** Opens in a new tab with safe rel attributes and a screen-reader hint. */
  external?: boolean;
}

/** Link styled as a button. Works in server and client components. */
export function ButtonLink({
  variant = "primary",
  size = "md",
  icon,
  iconMotion = "right",
  external,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <a
      className={cn("btn", `btn-${variant}`, size === "sm" && "btn-sm", className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      <span>{children}</span>
      {icon ? (
        <span className="btn-icon" data-motion={iconMotion} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}
