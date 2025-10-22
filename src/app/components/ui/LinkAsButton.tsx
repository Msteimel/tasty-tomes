import * as React from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/app/components/ui/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/app/components/lib/utils";

type LinkAsButtonProps = React.ComponentProps<"a"> &
  VariantProps<typeof buttonVariants> & {
    href: string;
  };

function LinkAsButton({
  className,
  variant,
  size,
  children,
  href,
  ...props
}: LinkAsButtonProps) {
  return (
    <Button asChild variant={variant} size={size} className={cn(className)}>
      <Link href={href}>{children}</Link>
    </Button>
  );
}

export { LinkAsButton };
