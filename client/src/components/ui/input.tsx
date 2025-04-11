import { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "file:text-foreground placeholder:text-text-primary selection:bg-primary selection:text-text-secondary dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent text-text-secondary shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      withIcon: {
        true: "pl-8 pr-3",
        false: "px-3",
      },
    },
    defaultVariants: {
      withIcon: false,
    },
  }
);

interface InputProps
  extends ComponentProps<"input">,
    VariantProps<typeof inputVariants> {
  icon?: ReactNode;
}

function Input({ icon, className, type, ...props }: InputProps) {
  const hasIcon = !!icon;

  return (
    <div className="relative">
      {hasIcon && (
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </span>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(inputVariants({ withIcon: hasIcon }), className)}
        {...props}
      />
    </div>
  );
}

export { Input, inputVariants };
