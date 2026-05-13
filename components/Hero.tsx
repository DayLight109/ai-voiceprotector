"use client";

import { useEffect, useState } from "react";
import { ArrowRight, AlertTriangle, ShieldAlert, Radio } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

function Waveform() {
  const [bars, setBars] = useState<number[]>(() =>
    Array.from({ length: 64 }, () => Math.random())
  );

  useEffect(() => {
    const id = setInterval(() => {
      setBars((prev) =>
        prev.map((_, i) => {
          const c = 32;
          const dist = Math.abs(i - c) / c;
          const base = 1 - dist * 0.55;
          return Math.max(0.1, Math.min(1, base * (0.5 + Math.random() * 0.7)));
        })
      );
    }, 80);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-between gap-[3px]">
      {bars.map((v, i) => {
        const isAI = i > 32;
        return (
          <span
            key={i}
            className="block w-[3px] rounded-[1px]"
            style={{
              height: `${v * 100}%`,
              background: isAI
                ? "color-mix(in oklab, var(--vermillion), transparent 8%)"
                : "color-mix(in oklab, var(--ink), transparent 30%)",
              opacity: 0.45 + v * 0.55,
              transition: "height 80ms cubic-bezier(0.25, 1, 0.5, 1)",
            }}
          />
        );
      })}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* page furniture · folio numbers in the margins */}
      <div className="pointer-events-none absolute left-6 top-6 hidden lg:block">
        <span className="folio">— 01 ·  L'Affaire ·  No.2026/05 —</span>
      </div>
      <div className="pointer-events-none absolute right-6 top-6 hidden lg:block">
        <span className="folio">— 案件 黄石/丁/04-28 —</span>
      </div>

      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-x-8 px-6 pb-24 pt-24 lg:pt-32">
        {/* ─── Left: editorial lede ─── */}
        <div className="col-span-12 lg:col-span-7">
          <div className="rubric">特别报道 · 调查 No. 04</div>

          <h1 className="mt-7 font-display text-[clamp(54px,8.2vw,118px)] font-medium leading-[0.95] tracking-[-0.025em]">
            她，听见了
            <br />
            <span className="font-display-italic text-vermillion">「孙子」</span>
            的哭声。
          </h1>

          <div className="mt-9 max-w-[640px]">
            <p className="drop-cap font-display text-[19px] leading-[1.65] text-foreground/85">
              七十多岁的丁女士接到一通电话——是孙子的声音，带着哭腔，说自己在学校
              打伤了同学，急需四万元私了。慌乱中她凑了两万元现金，亲手交给小区
              门口一名陌生男子。第二天向家人核实，孙子对此<em className="not-italic font-medium text-vermillion">毫不知情</em>。
              那个&laquo;孙子&raquo;的声音，是 3 秒语音样本合成的 AI 克隆。
            </p>
          </div>

          {/* byline */}
          <div className="mt-9 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <span>湖北 · 黄石 · 2025/04/28 14:37</span>
            <span className="h-px w-8 bg-vermillion" />
            <span>《今日说法 · 守护银发族》</span>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button size="lg" asChild>
              <a href="#demo">
                观看 12 秒识别演示 <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#defense">三层防护机制</a>
            </Button>
            <span className="ml-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
              端侧推理 · 0 上云 · &lt; 220 ms
            </span>
          </div>

          {/* dossier strip */}
          <div className="mt-14 grid max-w-[680px] grid-cols-3 gap-px overflow-hidden rounded-md border border-border bg-border">
            {[
              { k: "克隆门槛", v: "3", u: "秒" },
              { k: "声纹相似度", v: "85", u: "%" },
              { k: "人耳无法分辨", v: "70", u: "%" },
            ].map((m) => (
              <div key={m.k} className="bg-card px-5 py-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {m.k}
                </div>
                <div className="mt-2.5 flex items-baseline gap-1.5">
                  <span className="numplate text-[44px] font-medium leading-none">{m.v}</span>
                  <span className="font-mono text-[12px] text-muted-foreground">{m.u}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Right: live audit panel ─── */}
        <div className="col-span-12 mt-16 lg:col-span-5 lg:mt-2">
          <Card className="overflow-hidden border-foreground/15 shadow-lg">
            <div className="flex items-center justify-between border-b border-border bg-paper-warm px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <Radio className="h-3.5 w-3.5 text-vermillion" />
                <span className="font-mono text-[11px] uppercase tracking-[0.16em]">
                  Exhibit A · Call #2025-04-28-1437
                </span>
              </div>
              <Badge variant="destructive">
                <span className="signal-dot text-vermillion" /> Live
              </Badge>
            </div>

            <CardContent className="space-y-4 p-5">
              {/* identity */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-md border border-border bg-paper-warm/50 p-3.5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    Caller ID
                  </div>
                  <div className="mt-2 font-mono text-[15px] font-medium">+86 138-XXXX-XX21</div>
                  <div className="mt-1 font-mono text-[11px] text-caramel">显示 · 北京</div>
                </div>
                <div className="rounded-md border border-vermillion/30 bg-vermillion/5 p-3.5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-vermillion">
                    Real Origin
                  </div>
                  <div className="mt-2 font-mono text-[15px] font-medium text-vermillion">MM · YGN</div>
                  <div className="mt-1 font-mono text-[11px] text-vermillion/80">实际 · 缅甸 仰光</div>
                </div>
              </div>

              {/* spectrogram */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    FFT · 0–8 kHz · 16 kHz SR
                  </div>
                  <div className="font-mono text-[10px] text-muted-foreground">window 50 ms</div>
                </div>
                <div
                  className="grid gap-px overflow-hidden rounded-md border border-border"
                  style={{ gridTemplateColumns: "repeat(36, minmax(0, 1fr))" }}
                >
                  {Array.from({ length: 7 * 36 }).map((_, i) => {
                    const x = i % 36;
                    const isAI = x > 19;
                    const r = (Math.sin(i * 0.7) + 1) / 2;
                    const intensity = Math.min(1, Math.max(0, r * 0.4 + Math.random() * 0.6));
                    const c = isAI
                      ? `color-mix(in oklab, var(--vermillion) ${intensity * 100}%, transparent)`
                      : `color-mix(in oklab, var(--ink) ${intensity * 80}%, transparent)`;
                    return (
                      <span
                        key={i}
                        className="block h-3"
                        style={{ backgroundColor: c, opacity: 0.25 + intensity * 0.75 }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* waveform */}
              <div className="h-24 rounded-md border border-border bg-paper-warm/40 px-2.5 py-2">
                <Waveform />
              </div>

              {/* layer scores */}
              <div className="space-y-2.5">
                {[
                  { label: "L1 · Origin Trace", v: "Mismatch",          val: 100, ind: "bg-vermillion" },
                  { label: "L2 · Voiceprint",   v: "Synth 92.4%",       val: 92,  ind: "bg-vermillion-soft" },
                  { label: "L3 · Script NLU",   v: "Urgent Transfer",   val: 88,  ind: "bg-caramel" },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-3">
                    <div className="w-36 font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted-foreground">
                      {l.label}
                    </div>
                    <Progress value={l.val} indicatorClassName={l.ind} className="h-2 flex-1" />
                    <div className="w-32 text-right font-mono text-[11px]">{l.v}</div>
                  </div>
                ))}
              </div>

              {/* verdict */}
              <Separator />
              <div className="flex items-center justify-between rounded-md border border-vermillion/40 bg-vermillion/5 px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <ShieldAlert className="h-4 w-4 text-vermillion" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-vermillion">
                    Threat · 09 / 10
                  </span>
                </div>
                <span className="numplate text-[16px] font-medium text-vermillion">AUTO-BLOCK</span>
              </div>

              <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                <span>端侧推理 · 0 上云</span>
                <span>延迟 184 ms</span>
              </div>
            </CardContent>
          </Card>

          <div className="mt-4 flex items-start gap-2 font-mono text-[10.5px] leading-[1.7] tracking-[0.04em] text-muted-foreground">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>
              图例 · 基于真实案件的脱敏复现 · 实际部署中所有原始音频均在本地嵌入式平台完成推理，不上传第三方服务器。
            </span>
          </div>
        </div>
      </div>

      <hr className="hr-editorial" />

      {/* deployed-across strip */}
      <div className="bg-paper-warm/40">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-6 py-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            已部署 · Deployed across
          </span>
          <div className="flex flex-wrap items-center gap-7">
            {[
              "上海 · 公安系统",
              "北京 · 银行客服",
              "深圳 · 养老机构",
              "杭州 · 校园 Wi-Fi",
              "成都 · 政务热线",
            ].map((t) => (
              <span
                key={t}
                className="font-mono text-[11px] uppercase tracking-[0.08em] text-foreground/70 transition-colors hover:text-foreground"
              >
                · {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
