import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ *
 * Controls — pill-shaped, flat, never rectangular.
 *
 * Thin wrappers over shadcn's Button so the design system stays in
 * control of shape and colour while cva/slot handle the mechanics.
 * ------------------------------------------------------------------ */

const control = "h-auto rounded-pill px-6 py-3 text-body font-normal";

const primary = cn(
  control,
  "border-transparent bg-feature text-chalk hover:opacity-85",
  "focus-visible:border-transparent focus-visible:ring-ink/70",
);

const secondary = cn(
  control,
  "border-[1.5px] border-ink bg-transparent text-ink",
  "hover:bg-ink hover:text-chalk",
  "focus-visible:border-ink focus-visible:ring-ink/70",
);

const primaryOnDark = cn(primary, "focus-visible:ring-chalk/70");
const secondaryOnDark = cn(
  secondary,
  "border-chalk text-chalk hover:bg-chalk hover:text-ink",
  "focus-visible:border-chalk focus-visible:ring-chalk/70",
);

type LinkProps = ComponentProps<typeof Link>;
type AnchorProps = ComponentProps<"a">;

export function PrimaryLink({
  className,
  dark,
  ...props
}: LinkProps & { dark?: boolean }) {
  return (
    <Button asChild className={cn(dark ? primaryOnDark : primary, className)}>
      <Link {...props} />
    </Button>
  );
}

export function SecondaryLink({
  className,
  dark,
  ...props
}: LinkProps & { dark?: boolean }) {
  return (
    <Button asChild className={cn(dark ? secondaryOnDark : secondary, className)}>
      <Link {...props} />
    </Button>
  );
}

export function PrimaryAnchor({
  className,
  dark,
  ...props
}: AnchorProps & { dark?: boolean }) {
  return (
    <Button asChild className={cn(dark ? primaryOnDark : primary, className)}>
      <a {...props} />
    </Button>
  );
}

export function SecondaryAnchor({
  className,
  dark,
  ...props
}: AnchorProps & { dark?: boolean }) {
  return (
    <Button asChild className={cn(dark ? secondaryOnDark : secondary, className)}>
      <a {...props} />
    </Button>
  );
}

/* ------------------------------------------------------------------ *
 * Category tag — Rain fill, Tinta text, or a hairline outline.
 * ------------------------------------------------------------------ */

const tagTones = {
  rain: "bg-tag text-ink",
  cloud: "bg-surface-muted text-ink",
  outline: "bg-transparent text-ink border-[1.5px] border-ink",
} as const;

export function Tag({
  children,
  className,
  tone = "outline",
}: {
  children: ReactNode;
  className?: string;
  tone?: keyof typeof tagTones;
}) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "h-auto rounded-[8px] px-2.5 py-1 text-caption font-medium",
        tagTones[tone],
        className,
      )}
    >
      {children}
    </Badge>
  );
}

/* ------------------------------------------------------------------ *
 * Layout helpers.
 * ------------------------------------------------------------------ */

export function Shell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1280px] px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-body-sm text-ink-muted">{children}</p>;
}

export function DottedDivider({ className }: { className?: string }) {
  return (
    <Separator className={cn("rule-dotted-x h-0 w-full border-0 bg-transparent", className)} />
  );
}

/* ------------------------------------------------------------------ *
 * Surfaces.
 * ------------------------------------------------------------------ */

export function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-t-[1.5px] border-dotted border-ink pt-4">
      <p className="display-xl text-heading-lg tabular-nums text-ink">
        {value}
      </p>
      <p className="mt-2 text-body-sm text-ink-muted">{label}</p>
    </div>
  );
}

/*
  Signature halftone block: Arizona Blue field, solid Arizona Red at the top
  right, dissolving into a dot grid toward the bottom left.
*/
export function Halftone({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("relative overflow-hidden rounded-card bg-plasma", className)}
    >
      <div className="halftone-wash absolute inset-0" />
      <div className="halftone-dots absolute inset-0" />
    </div>
  );
}