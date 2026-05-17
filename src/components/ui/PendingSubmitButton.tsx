"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PendingSubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  pendingLabel: ReactNode;
  statusText?: string;
  statusClassName?: string;
}

export function PendingSubmitButton({
  children,
  className,
  disabled,
  pendingLabel,
  statusText,
  statusClassName,
  type = "submit",
  ...props
}: PendingSubmitButtonProps) {
  const { pending } = useFormStatus();
  const isDisabled = disabled || pending;

  return (
    <>
      <button
        {...props}
        type={type}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={pending}
        className={cn(
          "inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed",
          className,
        )}
      >
        {pending && (
          <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
        )}
        {pending ? pendingLabel : children}
      </button>
      {pending && statusText && (
        <p
          role="status"
          className={cn(
            "mt-2 text-center text-xs text-text-muted",
            statusClassName,
          )}
        >
          {statusText}
        </p>
      )}
    </>
  );
}
