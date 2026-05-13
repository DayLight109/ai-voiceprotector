"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || seen) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setSeen(true); },
      { threshold: 0.25 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [seen]);
  return { ref, seen };
}

function CountUp({ to, duration = 1800, decimals = 0, start }: {
  to: number; duration?: number; decimals?: number; start: boolean;
}) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / duration);
      const eased = k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
      setV(eased * to);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, to, duration]);
  return (
    <span className="numplate">
      {v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
    </span>
  );
}

export default function CrisisStats() {
  const { ref, seen } = useInView<HTMLDivElement>();

  return (
    <section id="crisis" ref={ref} className="relative border-b border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-6 pt-24">
        <div className="flex items-end justify-between border-b border-border pb-6">
          <div>
            <div className="rubric">CHAPTER II · 危&nbsp;·&nbsp;局</div>
            <h2 className="mt-4 font-display text-[clamp(40px,5vw,76px)] font-medium leading-[0.98] tracking-[-0.025em]">
              当电话<span className="font-display-italic text-vermillion">每分钟</span>都在
              <br className="hidden md:block" />
              制造受害者。
            </h2>
          </div>
          <div className="hidden text-right font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground md:block">
            Updated · 2026/05
          </div>
        </div>
      </div>

      {/* HERO STAT — 36 亿 */}
      <div className="mx-auto max-w-[1400px] px-6 pt-12">
        <div className="grid grid-cols-12 gap-5">
          <Card className="col-span-12 border-foreground/15 bg-paper-warm/40 p-8 lg:col-span-7">
            <div className="flex items-baseline justify-between">
              <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted-foreground">
                Calls intercepted · 2025
              </div>
              <Badge variant="outline">Public · MPS</Badge>
            </div>

            <div className="mt-6 flex items-end gap-6">
              <div className="font-display text-[clamp(120px,17vw,232px)] font-medium leading-[0.84] tracking-[-0.05em]">
                <CountUp to={36} start={seen} />
                <span className="font-display-italic text-vermillion">亿</span>
              </div>
              <div className="mb-6 max-w-[280px] text-[15px] leading-[1.75] text-foreground/85">
                次诈骗电话被拦截。<br />
                平均每秒，<span className="text-vermillion font-medium">114&nbsp;通</span>。
                这个数字仍在增长。
              </div>
            </div>

            {/* mini bar */}
            <div className="mt-8 flex items-end gap-1 h-10">
              {[18, 25, 22, 32, 28, 36, 41, 38, 47, 52, 58, 64].map((v, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{
                  height: `${(v / 64) * 100}%`,
                  background: i >= 9 ? "var(--vermillion)" : "color-mix(in oklab, var(--vermillion), transparent 65%)",
                  transition: `height 0.6s ${i * 30}ms cubic-bezier(0.25, 1, 0.5, 1)`,
                }} />
              ))}
            </div>
            <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              <span>2024-06</span>
              <span>2025-12</span>
            </div>
          </Card>

          <div className="col-span-12 grid grid-cols-2 gap-4 lg:col-span-5">
            {[
              { label: "诈骗短信拦截", v: 33, suffix: "亿条", note: "2025 全年", trend: "up" },
              { label: "侦破电诈案件", v: 25.8, suffix: "万起", note: "同比 ↑ 持续高位", dec: 1, trend: "up" },
              { label: "紧急止付资金", v: 2170.7, suffix: "万元", note: "2025 已止付", dec: 1, trend: "up" },
              { label: "见面劝阻群众", v: 674.7, suffix: "万人次", note: "全年累计", dec: 1, trend: "up" },
            ].map((s) => (
              <Card key={s.label} className="border-border p-5">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {s.label}
                  </div>
                  {s.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3 text-vermillion" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-olive" />
                  )}
                </div>
                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="numplate text-[40px] font-medium leading-none">
                    <CountUp to={s.v} decimals={s.dec ?? 0} start={seen} />
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.1em] text-muted-foreground">{s.suffix}</span>
                </div>
                <div className="mt-2.5 text-[11.5px] text-muted-foreground">{s.note}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* divider with section number */}
      <div className="mx-auto my-20 flex max-w-[1400px] items-center gap-5 px-6">
        <span className="folio">§ 02.2</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* AI shock */}
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4">
            <Badge variant="destructive">DATA · 声音克隆</Badge>
            <h3 className="mt-5 font-display text-[clamp(28px,3vw,44px)] font-medium leading-[1.05] tracking-[-0.02em]">
              耳朵已经
              <br />
              <span className="font-display-italic text-vermillion">不够用</span>了。
            </h3>
            <p className="mt-5 font-display text-[16px] leading-[1.85] text-foreground/85">
              克隆一个真人的声音，已经不需要专业设备、不需要长时间录音。
              一段 3 秒钟的微信语音，足以合成相似度高达 85% 的克隆人声——
              <em className="not-italic font-medium text-foreground">而 70% 的人，分辨不出真假</em>。
            </p>
            <div className="mt-7 font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
              Source · 澎湃新闻 · 瑞莱智慧
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-3 gap-px overflow-hidden rounded-md border border-border bg-border">
              {[
                { big: "3",  unit: "秒", label: "克隆门槛",    note: "截取一段微信语音 / 抖音音频，足以训练。" },
                { big: "85", unit: "%",  label: "声纹相似度",  note: "合成结果在常规通话场景下，足以骗过亲属。" },
                { big: "70", unit: "%",  label: "无法人耳分辨", note: "在 7000+ 受访者样本中，超过七成无法识别。" },
              ].map((g, i) => (
                <div key={i} className="bg-card px-7 py-9">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Metric · 0{i + 1}
                  </div>
                  <div className="mt-5 flex items-baseline">
                    <span className="numplate text-[clamp(72px,7vw,116px)] font-medium leading-[0.85] text-vermillion">
                      <CountUp to={parseInt(g.big)} start={seen} />
                    </span>
                    <span className="ml-2 font-display text-[28px] font-medium text-vermillion">{g.unit}</span>
                  </div>
                  <div className="mt-4 font-display text-[17px] font-semibold">{g.label}</div>
                  <div className="mt-2 max-w-[240px] text-[12.5px] leading-[1.7] text-muted-foreground">
                    {g.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* growth chart */}
      <div className="mx-auto mt-20 max-w-[1400px] px-6 pb-24">
        <Card className="border-foreground/15 p-8">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
                AI 诈骗涉案金额 · 复合增长率
              </div>
              <div className="mt-2.5 font-display text-[30px] font-medium tracking-tight">
                2020 → 2024，
                <span className="font-display-italic text-vermillion">+1928.8%</span>
              </div>
            </div>
            <div className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground md:block">
              Source · 瑞莱智慧 · 新京报
            </div>
          </div>

          <div className="mt-8 space-y-5">
            {[
              { y: "2020",   v: 0.2,   max: 18500, label: "0.2 万元" },
              { y: "2021",   v: 8,     max: 18500, label: "≈ 8 万元" },
              { y: "2022",   v: 60,    max: 18500, label: "≈ 60 万元" },
              { y: "2023",   v: 1670,  max: 18500, label: "1,670 万元" },
              { y: "2024H1", v: 18500, max: 18500, label: "1.85 亿元 (H1)" },
            ].map((b, i) => (
              <div key={i} className="grid grid-cols-12 items-center gap-3">
                <div className="col-span-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground md:col-span-1">
                  {b.y}
                </div>
                <div className="col-span-7 h-2.5 overflow-hidden rounded-full bg-muted md:col-span-8">
                  <div className="h-full rounded-full" style={{
                    width: seen ? `${(b.v / b.max) * 100}%` : "0%",
                    transition: `width 1.6s ${0.1 * i}s cubic-bezier(0.25, 1, 0.5, 1)`,
                    background: "linear-gradient(to right, var(--olive), var(--caramel), var(--vermillion))",
                  }} />
                </div>
                <div className="col-span-3 font-mono text-[12.5px]">{b.label}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
