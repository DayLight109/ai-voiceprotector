"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Play, Square, RotateCcw, Phone, PhoneOff, ShieldAlert } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Phase = "idle" | "ringing" | "answered" | "analyzing" | "warned" | "blocked";

const TIMELINE: Array<{
  at: number; event: string;
  side: "system" | "trace" | "voice" | "script";
  level?: "info" | "warn" | "danger";
  phrase?: string; tag?: string;
}> = [
  { at: 0,     event: "来电铃响 · +86 138-XXXX-XX21", side: "system", level: "info" },
  { at: 280,   event: "网络层路由开始追踪", side: "trace", level: "info" },
  { at: 900,   event: "信令源 ≠ 来电号码归属地", side: "trace", level: "warn" },
  { at: 1500,  event: "实际信号源 → 缅甸 / 仰光", side: "trace", level: "danger" },
  { at: 2200,  event: "用户接听 · 通话建立", side: "system", level: "info" },
  { at: 2600,  event: "声学采样 16 kHz · FFT 启动", side: "voice", level: "info" },
  { at: 3400,  event: "话术语义分析启动 (LLM 端侧)", side: "script", level: "info" },
  { at: 4100,  phrase: "奶奶，我闯祸了……", side: "script", level: "info", event: "片段 · 受害人无标记" },
  { at: 5200,  event: "声纹规则性 ↑ · 自然抖动 ↓", side: "voice", level: "warn" },
  { at: 5800,  phrase: "你可不要告诉我爸妈", side: "script", level: "warn", tag: "切断外部联系", event: "命中：切断外部联系" },
  { at: 6900,  event: "频率结构匹配 AI 合成模板 92.4%", side: "voice", level: "danger" },
  { at: 7700,  phrase: "今天必须把钱凑齐", side: "script", level: "warn", tag: "制造紧迫感", event: "命中：制造紧迫感" },
  { at: 8800,  phrase: "把钱打到这个账户", side: "script", level: "danger", tag: "引导转账", event: "命中：引导转账 · 高风险" },
  { at: 9600,  event: "三层均触发 · 风险等级 09 / 10", side: "system", level: "danger" },
  { at: 10300, event: "亲属手机推送已发出", side: "system", level: "warn" },
  { at: 11000, event: "通话证据已加密留存 · #EVID-0428-001", side: "system", level: "warn" },
  { at: 11800, event: "AUTO-BLOCK · 通话已切断", side: "system", level: "danger" },
];

const TOTAL_MS = 12500;

export default function CallSimulator() {
  const [running, setRunning] = useState(false);
  const [t, setT] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!running) return;
    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;
      setT(elapsed);
      if (elapsed < TOTAL_MS) rafRef.current = requestAnimationFrame(tick);
      else setRunning(false);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [running]);

  const reset = () => {
    cancelAnimationFrame(rafRef.current);
    startRef.current = null;
    setT(0);
    setRunning(false);
  };
  const start = () => { reset(); requestAnimationFrame(() => setRunning(true)); };

  const phase: Phase = useMemo(() => {
    if (t === 0) return "idle";
    if (t < 2200) return "ringing";
    if (t < 5000) return "answered";
    if (t < 9000) return "analyzing";
    if (t < 11800) return "warned";
    return "blocked";
  }, [t]);

  const events = TIMELINE.filter((e) => e.at <= t);
  const phrases = events.filter((e) => e.phrase);

  const risk = useMemo(() => {
    if (t < 1500) return 5;
    if (t < 2200) return 22;
    if (t < 5200) return 28;
    if (t < 5800) return 42;
    if (t < 6900) return 58;
    if (t < 7700) return 72;
    if (t < 8800) return 84;
    return 96;
  }, [t]);

  const riskTone =
    risk < 35 ? { color: "var(--olive)", label: "SAFE" } :
    risk < 65 ? { color: "var(--caramel)", label: "WATCH" } :
    risk < 85 ? { color: "var(--vermillion-soft)", label: "ALERT" } :
                { color: "var(--vermillion)", label: "BLOCK" };

  return (
    <section id="demo" className="relative border-b border-border bg-paper-warm/30">
      <div className="mx-auto max-w-[1400px] px-6 py-24">
        <div className="grid grid-cols-12 items-end gap-6 border-b border-border pb-6">
          <div className="col-span-12 lg:col-span-8">
            <div className="rubric">CHAPTER V · 实&nbsp;·&nbsp;时</div>
            <h2 className="mt-4 font-display text-[clamp(40px,5vw,76px)] font-medium leading-[0.98] tracking-[-0.025em]">
              一通电话，<span className="font-display-italic text-vermillion">12 秒</span>。
              <br className="hidden md:block" />
              全部识别完成。
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <p className="font-display text-[15.5px] leading-[1.85] text-foreground/85">
              下方为根据真实案件脱敏复现的「接听—分析—阻断」过程。
              点击启动，三层防护将以毫秒级时间线，实时给出判断。
            </p>
          </div>
        </div>

        {/* control bar */}
        <Card className="mt-8 flex flex-wrap items-center justify-between gap-4 border-border bg-card px-6 py-3.5">
          <div className="flex items-center gap-3">
            <Button onClick={running ? reset : start} variant={running ? "outline" : "default"} size="default">
              {running ? <><Square className="h-4 w-4" /> 停止</> : <><Play className="h-4 w-4" /> 启动演示</>}
            </Button>
            <Button onClick={reset} variant="ghost" size="sm">
              <RotateCcw className="h-3.5 w-3.5" /> 重置
            </Button>
          </div>
          <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <span>T <span className="text-foreground">+{(t / 1000).toFixed(2)}s</span></span>
            <span>Phase · <span className="text-vermillion">{phase.toUpperCase()}</span></span>
          </div>
        </Card>

        <div className="mt-5 grid grid-cols-12 gap-5">
          <div className="col-span-12 lg:col-span-4">
            <PhoneScreen phase={phase} risk={risk} riskTone={riskTone} />
          </div>
          <div className="col-span-12 lg:col-span-5">
            <Tabs defaultValue="trace" className="w-full">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="trace">L1 · Trace</TabsTrigger>
                <TabsTrigger value="voice">L2 · Voice</TabsTrigger>
                <TabsTrigger value="script">L3 · Script</TabsTrigger>
              </TabsList>
              <TabsContent value="trace"><TracePanel t={t} active={phase !== "idle"} /></TabsContent>
              <TabsContent value="voice"><VoicePanel t={t} active={t > 2400} /></TabsContent>
              <TabsContent value="script"><ScriptStream phrases={phrases} /></TabsContent>
            </Tabs>
          </div>
          <div className="col-span-12 lg:col-span-3">
            <Telemetry events={events} risk={risk} riskTone={riskTone} t={t} />
          </div>
        </div>

        <Scrubber t={t} />

        <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          注 · 演示场景为基于真实案件的脱敏复现，所有数据仅用于说明系统工作机制。
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Phone screen ─────────────────── */
function PhoneScreen({
  phase, risk, riskTone,
}: { phase: Phase; risk: number; riskTone: { color: string; label: string } }) {
  return (
    <div
      className="relative mx-auto aspect-[9/19] w-full max-w-[300px] overflow-hidden rounded-[40px] border-[6px] p-2.5 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.35)]"
      style={{
        borderColor: phase === "idle" ? "color-mix(in oklab, var(--ink) 22%, transparent)" : riskTone.color,
        background: "var(--ink)",
        transition: "border-color 0.6s",
      }}
    >
      <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-[color-mix(in_oklab,var(--ink)_92%,black)]" />

      <div
        className="relative h-full w-full overflow-hidden rounded-[30px] p-4"
        style={{
          color: "var(--paper)",
          background:
            phase === "blocked" || phase === "warned"
              ? `radial-gradient(120% 80% at 50% 0%, color-mix(in oklab, ${riskTone.color} 26%, transparent) 0%, var(--ink) 60%)`
              : `radial-gradient(120% 80% at 50% 0%, color-mix(in oklab, var(--ink) 60%, white 8%) 0%, var(--ink) 60%)`,
          transition: "background 0.6s",
        }}
      >
        <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.14em] opacity-65">
          <span>14:37</span><span>● ● ● 5G</span>
        </div>

        <div className="mt-12 text-center">
          {phase === "idle" && <div className="font-mono text-[11px] uppercase tracking-[0.16em] opacity-50">待机中</div>}
          {phase !== "idle" && (
            <>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-65">
                {phase === "ringing" && "来电中…"}
                {phase === "answered" && "通话中"}
                {phase === "analyzing" && "通话中 · 分析中"}
                {phase === "warned" && "高风险通话"}
                {phase === "blocked" && "已阻断"}
              </div>
              <div className="mt-3 font-display text-[28px] font-medium tracking-tight">孙子</div>
              <div className="mt-1 font-mono text-[11px] tracking-[0.12em] opacity-65">+86 138-XXXX-XX21</div>
            </>
          )}
        </div>

        <div className="relative mx-auto mt-6 h-24 w-24">
          {(phase === "warned" || phase === "blocked") && (
            <>
              <span className="absolute inset-0 rounded-full" style={{ background: `color-mix(in oklab, ${riskTone.color} 30%, transparent)`, animation: "pulse-ring 1.8s ease-out infinite" }} />
              <span className="absolute inset-3 rounded-full" style={{ background: `color-mix(in oklab, ${riskTone.color} 30%, transparent)`, animation: "pulse-ring 1.8s ease-out infinite 0.4s" }} />
            </>
          )}
          <div className="absolute inset-4 flex items-center justify-center rounded-full font-display text-[28px] font-medium"
            style={{
              background: phase === "blocked" || phase === "warned" ? riskTone.color : "color-mix(in oklab, var(--paper) 18%, var(--ink))",
              color: phase === "blocked" || phase === "warned" ? "var(--ink)" : "var(--paper)",
              transition: "background 0.4s",
            }}>
            孙
          </div>
        </div>

        <div className="mt-5 min-h-[68px]">
          {phase === "ringing"   && <Banner color="caramel"    title="信号路径异常" sub="来电号码与信号源不一致" />}
          {phase === "answered"  && <Banner color="caramel"    title="启动声纹分析" sub="正在校验声音真实性…" />}
          {phase === "analyzing" && <Banner color="vermillion" title="检测到 AI 合成特征" sub="频率结构匹配度 92%" />}
          {(phase === "warned" || phase === "blocked") && (
            <Banner color="vermillion" title="高风险诈骗通话" sub="疑似 AI 克隆 · 命中转账话术" />
          )}
        </div>

        <div className="mt-4 rounded-md border border-white/12 bg-white/[0.04] p-3">
          <div className="flex items-baseline justify-between font-mono text-[9.5px] uppercase tracking-[0.16em] opacity-65">
            <span>Risk</span>
            <span style={{ color: riskTone.color }}>{riskTone.label}</span>
          </div>
          <Progress value={risk} className="mt-2 h-2 bg-white/10" indicatorClassName="!bg-[var(--ind)]"
            style={{ ["--ind" as never]: riskTone.color }} />
          <div className="mt-1.5 numplate text-[20px] font-medium tabular-nums" style={{ color: riskTone.color }}>
            {risk.toFixed(0)} <span className="text-[10px] opacity-60">/ 100</span>
          </div>
        </div>

        <div className="absolute inset-x-4 bottom-5 flex items-center justify-between">
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-vermillion text-paper" aria-label="hang up">
            <PhoneOff className="h-5 w-5" />
          </button>
          {phase === "blocked" ? (
            <Badge variant="destructive">已自动阻断</Badge>
          ) : (
            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-olive text-paper" aria-label="answer">
              <Phone className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Banner({
  color, title, sub,
}: { color: "caramel" | "vermillion"; title: string; sub: string }) {
  const cv = color === "caramel" ? "var(--caramel)" : "var(--vermillion)";
  return (
    <div
      className="relative rounded-md border px-3 py-2.5"
      style={{
        borderColor: `color-mix(in oklab, ${cv} 38%, transparent)`,
        background: `color-mix(in oklab, ${cv} 14%, transparent)`,
        animation: "rise 0.5s cubic-bezier(0.25, 1, 0.5, 1) both",
      }}
    >
      <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em]" style={{ color: cv }}>
        <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: cv }} />
        ⚠ {title}
      </div>
      <div className="mt-1 text-[12px] opacity-90">{sub}</div>
    </div>
  );
}

/* ─────────────────── Trace panel ─────────────────── */
function TracePanel({ t, active }: { t: number; active: boolean }) {
  const progress = Math.min(1, t / 2000);
  return (
    <Card className="border-border bg-card p-5">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-vermillion">L1 · Origin Trace</span>
        <Badge variant={active ? "olive" : "muted"}>{active ? "Active" : "Standby"}</Badge>
      </div>

      <div className="mt-5">
        <div className="relative h-12">
          <div className="absolute inset-y-1/2 left-0 right-0 h-px bg-border" />
          <div
            className="absolute inset-y-1/2 left-0 h-px"
            style={{
              width: `${progress * 100}%`,
              background: "linear-gradient(to right, var(--olive), var(--caramel), var(--vermillion))",
              transition: "width 0.5s linear",
            }}
          />
          <div className="absolute -top-0.5 left-0 flex flex-col items-center">
            <span className="h-3 w-3 rounded-full bg-olive" />
            <span className="mt-2 font-mono text-[10px] text-olive">起点</span>
            <span className="font-mono text-[9px] text-muted-foreground">境内</span>
          </div>
          <div className="absolute -top-0.5 left-1/2 flex -translate-x-1/2 flex-col items-center">
            <span className="h-3 w-3 bg-caramel" />
            <span className="mt-2 font-mono text-[10px] text-[color-mix(in_oklab,var(--caramel)_75%,black_25%)]">中转 ×3</span>
            <span className="font-mono text-[9px] text-muted-foreground">VPN/PBX</span>
          </div>
          <div className="absolute -top-0.5 right-0 flex flex-col items-center">
            <span className="h-3 w-3 rounded-full bg-vermillion" />
            <span className="mt-2 font-mono text-[10px] text-vermillion">真实源</span>
            <span className="font-mono text-[9px] text-muted-foreground">缅甸 · 仰光</span>
          </div>
        </div>

        <div className="mt-2 grid grid-cols-3 gap-2 font-mono text-[10px]">
          <div className="rounded-md border border-border bg-paper-warm/50 p-2.5">
            <div className="uppercase tracking-[0.12em] text-muted-foreground">Shown</div>
            <div className="mt-1">+86 138...XX21</div>
          </div>
          <div className="rounded-md border border-border bg-paper-warm/50 p-2.5">
            <div className="uppercase tracking-[0.12em] text-muted-foreground">Registry</div>
            <div className="mt-1">北京</div>
          </div>
          <div className="rounded-md border border-vermillion/40 bg-vermillion/8 p-2.5">
            <div className="uppercase tracking-[0.12em] text-vermillion">Real Origin</div>
            <div className="mt-1 text-vermillion font-medium">MM · YGN</div>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ─────────────────── Voice panel ─────────────────── */
function VoicePanel({ t, active }: { t: number; active: boolean }) {
  const [bars, setBars] = useState<number[]>(() => Array.from({ length: 80 }, () => 0.1));
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      setBars((prev) =>
        prev.map((_, i) => {
          const phase = i / 80;
          const center = Math.exp(-((phase - 0.5) ** 2) / 0.06);
          const aiPattern = t > 5000 ? 0.4 + Math.sin(i * 0.7) * 0.25 : 0;
          const noise = Math.random() * 0.55;
          return Math.max(0.1, Math.min(1, center * 0.5 + aiPattern + noise * 0.4));
        })
      );
    }, 80);
    return () => clearInterval(id);
  }, [active, t]);

  const synth = t < 5000 ? 0 : t < 7000 ? 64 : t < 8500 ? 88 : 92.4;

  return (
    <Card className="border-border bg-card p-5">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-vermillion">L2 · Voiceprint</span>
        <Badge variant={active ? "destructive" : "muted"}>
          {active ? `Synth ${synth.toFixed(1)}%` : "Standby"}
        </Badge>
      </div>

      <div className="mt-5 flex h-16 items-center justify-between gap-[2px]">
        {bars.map((v, i) => {
          const aiSection = t > 5000 && i > 24;
          const c = aiSection ? "var(--vermillion)" : "color-mix(in oklab, var(--ink), transparent 30%)";
          return (
            <span key={i} className="block flex-1 rounded-[1px]"
              style={{ height: `${v * 100}%`, background: c, opacity: 0.4 + v * 0.6, transition: "height 80ms linear" }}
            />
          );
        })}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 font-mono text-[10px]">
        <div className="rounded-md border border-border bg-paper-warm/50 p-2.5">
          <div className="uppercase tracking-[0.12em] text-muted-foreground">F0 抖动</div>
          <div className="mt-1">{t > 5000 ? "0.04 ↓" : "0.18"}</div>
        </div>
        <div className="rounded-md border border-border bg-paper-warm/50 p-2.5">
          <div className="uppercase tracking-[0.12em] text-muted-foreground">呼吸感</div>
          <div className="mt-1">{t > 5000 ? "弱" : "正常"}</div>
        </div>
        <div className="rounded-md border border-vermillion/40 bg-vermillion/8 p-2.5">
          <div className="uppercase tracking-[0.12em] text-vermillion">规则性</div>
          <div className="mt-1 text-vermillion font-medium">{t > 5000 ? "↑↑" : "—"}</div>
        </div>
      </div>
    </Card>
  );
}

/* ─────────────────── Script ─────────────────── */
function ScriptStream({ phrases }: { phrases: typeof TIMELINE }) {
  return (
    <Card className="border-border bg-card p-5">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-vermillion">L3 · Script NLU</span>
        <span className="font-mono text-[11px]">{phrases.length} 条命中</span>
      </div>

      <ScrollArea className="mt-4 max-h-[280px]">
        <div className="space-y-2 pr-2">
          {phrases.length === 0 && (
            <div className="font-mono text-[11px] text-muted-foreground">
              等待语音输入… <span className="cursor-blink" />
            </div>
          )}
          {phrases.map((p, i) => (
            <div key={i} className="grid grid-cols-12 items-center gap-2 rounded-md border-l-2 px-3 py-2.5"
              style={{
                borderLeftColor: p.level === "danger" ? "var(--vermillion)" : p.level === "warn" ? "var(--caramel)" : "var(--olive)",
                background: p.level === "danger" ? "color-mix(in oklab, var(--vermillion) 8%, transparent)" : "var(--paper-warm)",
                animation: "rise 0.5s cubic-bezier(0.25, 1, 0.5, 1) both",
              }}>
              <div className="col-span-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                T+{(p.at / 1000).toFixed(1)}s
              </div>
              <div className="col-span-7 font-display text-[13.5px] leading-snug">「{p.phrase}」</div>
              <div className="col-span-3 text-right">
                {p.tag && <Badge variant={p.level === "danger" ? "destructive" : "caramel"}>{p.tag}</Badge>}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}

/* ─────────────────── Telemetry ─────────────────── */
function Telemetry({
  events, risk, riskTone, t,
}: { events: typeof TIMELINE; risk: number; riskTone: { color: string; label: string }; t: number }) {
  return (
    <div className="space-y-4">
      <Card className="border-border bg-card p-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Threat Level</div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="numplate text-[68px] font-medium leading-none" style={{ color: riskTone.color }}>
            {risk.toFixed(0)}
          </span>
          <span className="font-mono text-[12px] text-muted-foreground">/ 100</span>
        </div>
        <div className="mt-2 font-mono text-[12px] uppercase tracking-[0.16em]" style={{ color: riskTone.color }}>
          {riskTone.label}
        </div>
        <Progress value={risk} className="mt-4 h-2"
          indicatorClassName="!bg-[var(--ind)]"
          style={{ ["--ind" as never]: riskTone.color }} />
      </Card>

      <Card className="border-border bg-card p-5">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Event Log</span>
          <span className="font-mono text-[10px] text-muted-foreground">T+{(t / 1000).toFixed(1)}s</span>
        </div>
        <ScrollArea className="mt-3 max-h-[280px]">
          <div className="space-y-1.5 pr-2 font-mono text-[10.5px] leading-snug">
            {events.length === 0 && (
              <div className="text-muted-foreground"><span className="cursor-blink">等待启动…</span></div>
            )}
            {events.slice().reverse().map((e, i) => {
              const c =
                e.level === "danger" ? "var(--vermillion)" :
                e.level === "warn"   ? "var(--caramel)" :
                e.side === "trace"   ? "var(--olive)"  :
                                       "var(--ink)";
              return (
                <div key={i} className="flex gap-2">
                  <span className="text-muted-foreground">[{(e.at / 1000).toFixed(2)}]</span>
                  <span style={{ color: c }}>· {e.event}</span>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </Card>

      {risk > 84 && (
        <Card className="border-vermillion bg-vermillion/8 p-5 text-vermillion" style={{ animation: "rise 0.5s both" }}>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] flex items-center gap-1.5">
            <ShieldAlert className="h-3.5 w-3.5" />
            Final Verdict
          </div>
          <div className="mt-2 font-display text-[22px] font-medium tracking-tight">自动阻断 · 取证留存</div>
          <div className="mt-2 text-[12px] leading-snug text-foreground/80">
            #EVID-0428-001 已加密保存 · 推送至公安系统 / 家属手机。
          </div>
        </Card>
      )}
    </div>
  );
}

/* ─────────────────── Scrubber ─────────────────── */
function Scrubber({ t }: { t: number }) {
  const pct = Math.min(100, (t / TOTAL_MS) * 100);
  return (
    <Card className="mt-6 border-border bg-card p-4">
      <div className="flex items-center gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Timeline</span>
        <div className="relative h-7 flex-1 overflow-hidden rounded-md bg-muted">
          {[
            { from: 0,  to: 18,  label: "RING",    color: "color-mix(in oklab, var(--caramel) 38%, transparent)" },
            { from: 18, to: 42,  label: "ANSWER",  color: "color-mix(in oklab, var(--olive) 32%, transparent)" },
            { from: 42, to: 78,  label: "ANALYZE", color: "color-mix(in oklab, var(--caramel) 42%, transparent)" },
            { from: 78, to: 95,  label: "WARN",    color: "color-mix(in oklab, var(--vermillion) 32%, transparent)" },
            { from: 95, to: 100, label: "BLOCK",   color: "color-mix(in oklab, var(--vermillion) 55%, transparent)" },
          ].map((b, i) => (
            <div key={i} className="absolute top-0 h-full font-mono text-[9px] uppercase tracking-[0.12em]"
              style={{ left: `${b.from}%`, width: `${b.to - b.from}%`, background: b.color }}>
              <span className="absolute left-2 top-1.5">{b.label}</span>
            </div>
          ))}
          <div className="absolute -top-1 bottom-[-4px] w-px bg-vermillion" style={{ left: `${pct}%` }}>
            <span className="absolute -top-1.5 -left-1 h-2.5 w-2.5 rotate-45 bg-vermillion" />
          </div>
        </div>
        <span className="font-mono text-[10px] tabular-nums uppercase tracking-[0.12em]">
          {(t / 1000).toFixed(2)} / {(TOTAL_MS / 1000).toFixed(2)}s
        </span>
      </div>
    </Card>
  );
}
