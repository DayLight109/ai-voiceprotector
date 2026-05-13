"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, ShieldCheck, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV = [
  ["现状", "#crisis"],
  ["防护机制", "#defense"],
  ["实时演示", "#demo"],
  ["对比", "#compare"],
  ["政策", "#policy"],
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border glass">
      <div className="mx-auto flex max-w-[1400px] items-center gap-6 px-6 py-4">
        {/* mark */}
        <a href="#" className="group flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-foreground text-background">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div className="leading-none">
            <div className="font-display text-[18px] font-semibold tracking-tight">
              <span className="font-display-italic">L'Affaire</span>
            </div>
            <div className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.22em] text-muted-foreground">
              Voice Guardian · No.2026/05
            </div>
          </div>
        </a>

        <Separator orientation="vertical" className="hidden h-10 md:block" />

        {/* nav (desktop) */}
        <nav className="hidden flex-1 items-center gap-1 md:flex">
          {NAV.map(([t, h]) => (
            <a
              key={t}
              href={h}
              className="rounded-md px-3 py-1.5 text-[13.5px] text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
            >
              {t}
            </a>
          ))}
        </nav>

        {/* right (desktop) */}
        <div className="ml-auto hidden items-center gap-3 md:flex">
          <Badge variant="olive" className="hidden lg:inline-flex">
            <span className="signal-dot text-olive" /> 系统正常 · 99.97%
          </Badge>

          <Button asChild variant="ghost" size="sm">
            <Link href="/warroom" className="gap-1.5">
              <span className="signal-dot text-vermillion" />
              战情室
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Button>

          <Button asChild>
            <a href="#demo">观看演示</a>
          </Button>
        </div>

        {/* mobile */}
        <div className="ml-auto md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="font-display-italic">L'Affaire</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-6">
                {NAV.map(([t, h]) => (
                  <a
                    key={t}
                    href={h}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2.5 text-[15px] hover:bg-accent"
                  >
                    {t}
                  </a>
                ))}
                <Separator className="my-3" />
                <Link
                  href="/warroom"
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-[15px] text-vermillion hover:bg-accent"
                >
                  战情室 ↗
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
