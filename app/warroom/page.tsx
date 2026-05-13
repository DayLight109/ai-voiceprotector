"use client";

/* ==================================================================
   L'AFFAIRE · WARROOM
   Dark inverted theme, same design tokens.
   Subscribes to /api/v1/feed/stream (Go backend) when available,
   falls back to a built-in simulator if not.
   ================================================================== */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpLeft, ShieldAlert, Radar as RadarIcon,
  Activity, Volume2, Map as MapIcon, Cpu, Terminal,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

/* ---------- Constants ---------- */

const PHONE_PREFIXES = [
  "+86-138", "+86-186", "+855-23", "+95-9", "+856-21",
  "+84-28", "+90-553", "+62-21", "+91-90", "+960-7",
];
const ORIGINS = ["MM/YGN", "KH/PNH", "LA/VTE", "VN/SGN", "TH/BKK", "PH/MNL", "MY/KUL", "NG/LAG", "IN/BOM", "AE/DXB"];
const SCRIPT_HITS = [
  "URGENCY · 今天必须办", "TRANSFER · 安全账户", "ISOLATE · 不能告诉家人",
  "CREDS · 验证码 / 卡号", "AUTHORITY · 公检法",
  "RELATIVE · 克隆孙子", "DEEPFAKE · 实时换声",
];
const FEED_VERBS = ["INTERCEPT", "ANALYZE", "VOICEPRINT", "ROUTE", "BLOCK", "FLAG", "TRACE", "ESCALATE"];

const BACKEND_URL =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL
    : "http://localhost:8080";

/* ---------- Helpers ---------- */
const r = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const rint = (a: number, b: number) => Math.floor(a + Math.random() * (b - a + 1));
const phone = () => `${r(PHONE_PREFIXES)}-${rint(100, 999)}-${rint(1000, 9999)}`;
const pad = (n: number, l = 2) => String(n).padStart(l, "0");

/* ==================================================================
   PAGE
   ================================================================== */

export default function WarroomPage() {
  return (
    <div className="dark relative h-screen w-screen overflow-hidden bg-background text-foreground">
      <FieldCanvas />

      <div className="relative z-[5] flex h-full flex-col">
        <TopBar />
        <DefconStrip />

        <section className="grid min-h-0 flex-1 grid-cols-12 gap-3 px-4 pt-3 pb-2">
          <div className="col-span-3 flex min-h-0 flex-col gap-3">
            <LiveFeed />
            <Voiceprint />
          </div>
          <div className="col-span-6 min-h-0">
            <Radar />
          </div>
          <div className="col-span-3 flex min-h-0 flex-col gap-3">
            <PriorityAlerts />
            <CounterStack />
            <AsciiMap />
          </div>
        </section>

        <CommandLine />
        <BottomTicker />
      </div>
    </div>
  );
}

/* ==================================================================
   Background field — subtle drifting dot grid in vermillion
   ================================================================== */
function FieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const CELL = 10, GAP = 2;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let cols = 0, rows = 0;

    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.scale(dpr, dpr);
      cols = Math.ceil(w / CELL); rows = Math.ceil(h / CELL);
    };
    resize();
    window.addEventListener("resize", resize);

    const noise = (x: number, y: number, t: number) => {
      const n1 = Math.sin(x * 0.036 + t * 0.00033) * Math.cos(y * 0.04 + t * 0.00026);
      const n2 = Math.sin(x * 0.082 + t * 0.00052) * Math.cos(y * 0.092 + t * 0.00042) * 0.5;
      const band = Math.sin(y * 0.033 - t * 0.00038 + Math.sin(x * 0.009) * 0.4) * 0.4;
      return ((n1 + n2 + band) + 1.9) / 3.8;
    };

    let raf = 0;
    const draw = (now: number) => {
      const w = window.innerWidth, h = window.innerHeight;
      ctx.fillStyle = "#15120E";
      ctx.fillRect(0, 0, w, h);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const v = noise(x, y, now);
          if (v < 0.5) continue;
          let R: number, G: number, B: number, A: number;
          if (v > 0.86)      { R = 230; G = 130; B = 110; A = 0.42; }
          else if (v > 0.72) { R = 200; G =  85; B =  65; A = 0.32; }
          else if (v > 0.58) { R = 150; G =  55; B =  40; A = 0.22; }
          else               { R =  95; G =  35; B =  25; A = 0.14; }
          ctx.fillStyle = `rgba(${R},${G},${B},${A})`;
          ctx.fillRect(x * CELL, y * CELL, CELL - GAP, CELL - GAP);
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0" style={{ opacity: 0.55 }} aria-hidden />
  );
}

/* ==================================================================
   TOP BAR
   ================================================================== */
function TopBar() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 50);
    return () => clearInterval(id);
  }, []);

  const stamp =
    `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ` +
    `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}.${pad(now.getMilliseconds(), 3)}`;

  return (
    <header className="relative flex items-center justify-between border-b border-border bg-card/70 px-5 py-2 backdrop-blur-sm">
      <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.14em]">
        <Badge variant="destructive">
          <span className="signal-dot text-vermillion" />
          <span className="font-display-italic normal-case" style={{ fontStyle: "italic", letterSpacing: 0 }}>
            L'Affaire
          </span>
          <span className="opacity-65">· Warroom v2.6.1</span>
        </Badge>
        <Separator orientation="vertical" className="hidden h-4 md:block" />
        <span className="hidden text-muted-foreground md:inline">
          Clearance · <span className="text-foreground">TS // SI // NOFORN</span>
        </span>
        <Separator orientation="vertical" className="hidden h-4 md:block" />
        <span className="hidden text-muted-foreground md:inline">REC · ENC · 24H</span>
      </div>

      <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.14em]">
        <span className="text-muted-foreground">Uplink</span>
        <span className="flex items-center gap-1">
          {[0, 0.18, 0.36, 0.54, 0.72].map((d, i) => (
            <span key={i} className="h-2 w-1 rounded-sm bg-vermillion"
              style={{ animation: `pulse-ring 1.6s ease-in-out infinite ${d}s`, opacity: 0.7 }} />
          ))}
        </span>
        <span className="text-muted-foreground">CN-SH-PVG-04</span>
        <Separator orientation="vertical" className="h-4" />
        <span className="tabular-nums font-medium text-vermillion-soft">{stamp} UTC+8</span>
        <Separator orientation="vertical" className="h-4" />
        <Button asChild variant="outline" size="sm">
          <Link href="/" className="gap-1.5">
            <ArrowUpLeft className="h-3 w-3" /> Esc Exit
          </Link>
        </Button>
      </div>
    </header>
  );
}

/* ==================================================================
   DEFCON
   ================================================================== */
function DefconStrip() {
  const [defcon, setDefcon] = useState(2);

  const labels: Record<number, [string, string]> = {
    5: ["Normal Ops",   "正常运营"],
    4: ["Inc. Watch",   "提高警戒"],
    3: ["High Alert",   "高风险"],
    2: ["Active Threat","活跃威胁"],
    1: ["War Footing",  "战时戒备"],
  };

  return (
    <div className="grid grid-cols-5 gap-px border-b border-border bg-border">
      {[5, 4, 3, 2, 1].map((d) => {
        const active = d === defcon;
        return (
          <button
            key={d}
            onClick={() => setDefcon(d)}
            className="relative bg-background px-4 py-2.5 text-left transition-colors hover:bg-card"
            style={{
              background: active
                ? "linear-gradient(180deg, color-mix(in oklab, var(--vermillion) 16%, transparent) 0%, color-mix(in oklab, var(--vermillion) 8%, transparent) 100%)"
                : undefined,
            }}
          >
            <div className="flex items-baseline gap-3">
              <span className={`font-mono text-[10px] uppercase tracking-[0.18em] ${active ? "text-vermillion" : "text-muted-foreground"}`}>
                DEFCON
              </span>
              <span
                className={`font-display text-[42px] leading-none font-medium tabular-nums ${active ? "text-vermillion" : "text-muted-foreground/50"}`}
                style={{ textShadow: active ? "0 0 18px color-mix(in oklab, var(--vermillion) 60%, transparent)" : undefined }}
              >
                {d}
              </span>
              {active && <Badge variant="destructive" className="ml-auto">Active</Badge>}
            </div>
            <div className={`mt-1 font-mono text-[10px] uppercase tracking-[0.16em] ${active ? "text-vermillion-soft" : "text-muted-foreground/65"}`}>
              {labels[d][0]} · {labels[d][1]}
            </div>
            {active && <div className="absolute inset-x-0 bottom-0 h-[2px] bg-vermillion" />}
          </button>
        );
      })}
    </div>
  );
}

/* ==================================================================
   Panel wrapper
   ================================================================== */
function Panel({
  title, right, icon: Icon, children, className = "",
}: {
  title: string; right?: string; icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode; className?: string;
}) {
  return (
    <Card className={`relative flex min-h-0 flex-col border-border bg-card/85 p-3.5 backdrop-blur-sm ${className}`}>
      <div className="mb-3 flex items-center justify-between border-b border-border pb-2.5">
        <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-vermillion font-medium">
          <Icon className="h-3.5 w-3.5" />
          {title}
        </div>
        {right && (
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {right}
          </span>
        )}
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
    </Card>
  );
}

/* ==================================================================
   LIVE FEED — subscribes to Go backend SSE if available
   ================================================================== */
type FeedItem = { ts: string; verb: string; payload: string; lvl: 0 | 1 | 2 };

function LiveFeed() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Try SSE first.
    let es: EventSource | null = null;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;

    try {
      es = new EventSource(`${BACKEND_URL}/api/v1/feed/stream`);
      es.addEventListener("hello", () => setConnected(true));
      es.addEventListener("feed", (e: MessageEvent) => {
        try {
          const ev = JSON.parse(e.data);
          const ts = new Date(ev.ts);
          const stamp = `${pad(ts.getHours())}:${pad(ts.getMinutes())}:${pad(ts.getSeconds())}.${pad(ts.getMilliseconds(), 3)}`;
          const lvl: 0 | 1 | 2 = ev.level === "danger" ? 2 : ev.level === "warn" ? 1 : 0;
          setItems((prev) => [{ ts: stamp, verb: ev.verb, payload: ev.payload, lvl }, ...prev].slice(0, 13));
        } catch { /* ignore */ }
      });
      es.onerror = () => {
        if (!cancelled && !connected) {
          es?.close();
          es = null;
          startSim();
        }
      };
    } catch {
      startSim();
    }

    function startSim() {
      const tick = () => {
        if (cancelled) return;
        const now = new Date();
        const ts = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}.${pad(now.getMilliseconds(), 3)}`;
        const verb = r(FEED_VERBS);
        const payload = (() => {
          switch (verb) {
            case "INTERCEPT": return phone();
            case "ANALYZE":   return `match=${(85 + Math.random() * 14).toFixed(1)}%`;
            case "VOICEPRINT":return `synth=${(60 + Math.random() * 38).toFixed(1)}% / F0↓`;
            case "ROUTE":     return `actual_origin=${r(ORIGINS)}`;
            case "BLOCK":     return `${phone()} → KILL`;
            case "FLAG":      return r(SCRIPT_HITS);
            case "TRACE":     return `hops=${rint(2, 8)} via VPN/PBX`;
            case "ESCALATE":  return `→ DEFCON ${rint(1, 2)}`;
            default: return "";
          }
        })();
        const lvl: 0 | 1 | 2 =
          verb === "BLOCK" || verb === "ESCALATE" ? 2 :
          verb === "FLAG"  || verb === "VOICEPRINT" ? 1 : 0;
        setItems((prev) => [{ ts, verb, payload, lvl }, ...prev].slice(0, 13));
        timer = setTimeout(tick, 700 + Math.random() * 600);
      };
      timer = setTimeout(tick, 200);
    }

    return () => {
      cancelled = true;
      es?.close();
      if (timer) clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Panel title="Live Feed" right={connected ? "SSE · LIVE" : "STREAM"} icon={Activity} className="flex-1">
      <ScrollArea className="h-full">
        <ul className="font-mono text-[10.5px] leading-snug">
          {items.length === 0 && (
            <li className="text-muted-foreground">
              awaiting events… <span className="cursor-blink" />
            </li>
          )}
          {items.map((it, i) => {
            const c = it.lvl === 2 ? "var(--vermillion)" : it.lvl === 1 ? "var(--vermillion-soft)" : "var(--foreground)";
            const op = i === 0 ? 1 : Math.max(0.32, 1 - i * 0.06);
            return (
              <li key={`${it.ts}-${i}`} className="grid grid-cols-12 gap-2 py-[3px]"
                style={{ opacity: op, animation: i === 0 ? "rise 0.4s cubic-bezier(0.25, 1, 0.5, 1) both" : undefined }}>
                <span className="col-span-4 truncate text-muted-foreground">[{it.ts}]</span>
                <span className="col-span-3 truncate font-medium" style={{ color: c }}>{it.verb}</span>
                <span className="col-span-5 truncate" style={{ color: "var(--vermillion-soft)" }}>{it.payload}</span>
              </li>
            );
          })}
        </ul>
      </ScrollArea>
    </Panel>
  );
}

/* ==================================================================
   VOICEPRINT
   ================================================================== */
function Voiceprint() {
  const [bars, setBars] = useState<number[]>(() => Array.from({ length: 60 }, () => 0.2));
  const [stat, setStat] = useState({ synth: 92.4, f0: 0.04, breath: "弱" });

  useEffect(() => {
    const id = setInterval(() => {
      setBars((prev) =>
        prev.map((_, i) => {
          const phase = i / 60;
          const ai = 0.4 + Math.sin(i * 0.7 + Date.now() * 0.003) * 0.25;
          const center = Math.exp(-((phase - 0.5) ** 2) / 0.06);
          const noise = Math.random() * 0.5;
          return Math.max(0.1, Math.min(1, center * 0.5 + ai + noise * 0.45));
        }),
      );
      setStat({
        synth: Math.max(85, Math.min(99, 90 + Math.random() * 8)),
        f0: 0.02 + Math.random() * 0.06,
        breath: Math.random() > 0.3 ? "弱" : "极弱",
      });
    }, 80);
    return () => clearInterval(id);
  }, []);

  return (
    <Panel title="Voiceprint" right="Layer 02" icon={Volume2}>
      <div className="flex h-14 items-end gap-px">
        {bars.map((v, i) => {
          const ai = i > 24;
          return (
            <span key={i} className="block flex-1 rounded-[1.5px]"
              style={{
                height: `${v * 100}%`,
                background: ai ? "var(--vermillion)" : "var(--vermillion-soft)",
                opacity: 0.45 + v * 0.55,
                transition: "height 80ms linear",
              }}
            />
          );
        })}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em]">
        <Cell label="Synth" v={`${stat.synth.toFixed(1)}%`} hi />
        <Cell label="F0_jtr" v={stat.f0.toFixed(3)} />
        <Cell label="Breath" v={stat.breath} />
      </div>
    </Panel>
  );
}

function Cell({ label, v, hi }: { label: string; v: string; hi?: boolean }) {
  return (
    <div className={`rounded-md px-2 py-1.5 ${hi ? "border border-vermillion/40 bg-vermillion/8" : "border border-border bg-background/40"}`}>
      <div className="text-[8.5px] text-muted-foreground">{label}</div>
      <div className={`mt-0.5 ${hi ? "text-vermillion" : "text-foreground"}`}>{v}</div>
    </div>
  );
}

/* ==================================================================
   RADAR
   ================================================================== */
type Blip = { id: number; x: number; y: number; label: string; bornAt: number };

function Radar() {
  const [blips, setBlips] = useState<Blip[]>([]);
  const [, force] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const angle = Math.random() * Math.PI * 2;
      const radius = 50 + Math.random() * 170;
      const x = 250 + Math.cos(angle) * radius;
      const y = 250 + Math.sin(angle) * radius;
      setBlips((prev) => [...prev, { id: Date.now() + Math.random(), x, y, label: phone(), bornAt: Date.now() }].slice(-14));
      timer = setTimeout(tick, 850 + Math.random() * 700);
    };
    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setBlips((prev) => prev.filter((b) => Date.now() - b.bornAt < 6500));
      force((x) => (x + 1) % 1000);
    }, 250);
    return () => clearInterval(id);
  }, []);

  return (
    <Panel title="Scope / Omni-Radar" right="Sweep 4 RPM · Band L · 3000 km" icon={RadarIcon} className="h-full">
      <div className="relative h-full w-full">
        <svg viewBox="0 0 500 500" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="wr-sweep" x1="250" y1="250" x2="500" y2="250" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#B83227" stopOpacity="0" />
              <stop offset="60%" stopColor="#B83227" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#E08866" stopOpacity="0.75" />
            </linearGradient>
            <radialGradient id="wr-rg" cx="250" cy="250" r="240" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#B83227" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#15120E" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="250" cy="250" r="240" fill="url(#wr-rg)" />
          {[60, 120, 180, 240].map((r) => (
            <circle key={r} cx="250" cy="250" r={r} fill="none" stroke="#B83227" strokeOpacity="0.22" strokeWidth="0.7" />
          ))}
          {[80, 140, 200].map((r) => (
            <circle key={r} cx="250" cy="250" r={r} fill="none" stroke="#B83227" strokeOpacity="0.07" strokeWidth="0.4" strokeDasharray="2 4" />
          ))}
          {Array.from({ length: 36 }).map((_, i) => {
            const deg = i * 10;
            const rad = ((deg - 90) * Math.PI) / 180;
            const inner = i % 3 === 0 ? 50 : 235;
            const outer = 240;
            const x1 = 250 + Math.cos(rad) * inner;
            const y1 = 250 + Math.sin(rad) * inner;
            const x2 = 250 + Math.cos(rad) * outer;
            const y2 = 250 + Math.sin(rad) * outer;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#B83227" strokeOpacity={i % 9 === 0 ? 0.4 : 0.12} strokeWidth="0.5" />;
          })}
          <g style={{ fontFamily: "JetBrains Mono, monospace" }}>
            <text x="250" y="36"  textAnchor="middle" fill="#E08866" fontSize="13" letterSpacing="2.5">N · 北</text>
            <text x="472" y="256" textAnchor="middle" fill="#E08866" fontSize="13" letterSpacing="2.5">E · 东</text>
            <text x="250" y="478" textAnchor="middle" fill="#E08866" fontSize="13" letterSpacing="2.5">S · 南</text>
            <text x="28"  y="256" textAnchor="middle" fill="#E08866" fontSize="13" letterSpacing="2.5">W · 西</text>
          </g>
          <g>
            <path d="M250,250 L250,10 A240,240 0 0,1 490,250 Z" fill="url(#wr-sweep)" />
            <line x1="250" y1="250" x2="490" y2="250" stroke="#E08866" strokeWidth="1.2" strokeOpacity="0.75" />
            <animateTransform attributeName="transform" type="rotate" from="0 250 250" to="360 250 250" dur="4.5s" repeatCount="indefinite" />
          </g>
          {blips.map((b) => {
            const age = (Date.now() - b.bornAt) / 6500;
            const isFresh = Date.now() - b.bornAt < 1500;
            return (
              <g key={b.id} opacity={Math.max(0, 1 - age)}>
                {isFresh && (
                  <circle cx={b.x} cy={b.y} r="4" fill="none" stroke="#E08866" strokeWidth="1.2">
                    <animate attributeName="r" from="4" to="22" dur="1.4s" repeatCount="2" />
                    <animate attributeName="opacity" from="0.85" to="0" dur="1.4s" repeatCount="2" />
                  </circle>
                )}
                <circle cx={b.x} cy={b.y} r="2.8" fill="#E08866" />
                <text x={b.x + 7} y={b.y + 3} fill="#E08866" fontSize="9" fontFamily="JetBrains Mono, monospace" opacity="0.9">
                  {b.label}
                </text>
              </g>
            );
          })}
          <g>
            <circle cx="250" cy="250" r="24" fill="none" stroke="#E08866" strokeWidth="0.6" strokeOpacity="0.4" />
            <circle cx="250" cy="250" r="8" fill="none" stroke="#E08866" strokeWidth="1" />
            <circle cx="250" cy="250" r="3" fill="#E08866">
              <animate attributeName="r" from="3" to="6" dur="1.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="1" to="0.4" dur="1.2s" repeatCount="indefinite" />
            </circle>
            <line x1="250" y1="234" x2="250" y2="266" stroke="#E08866" strokeWidth="0.6" />
            <line x1="234" y1="250" x2="266" y2="250" stroke="#E08866" strokeWidth="0.6" />
            <text x="250" y="294" textAnchor="middle" fill="#B83227" fontSize="11" fontFamily="JetBrains Mono, monospace" letterSpacing="3">OPERATIONAL</text>
            <text x="250" y="308" textAnchor="middle" fill="#B83227" fontSize="9"  fontFamily="JetBrains Mono, monospace" opacity="0.6">CN-SH · 31.23N 121.47E</text>
          </g>
        </svg>

        <div className="absolute left-2 top-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Omni · [{blips.length} contacts]
        </div>
        <div className="absolute right-2 top-2"><Badge variant="destructive"><span className="signal-dot text-vermillion" /> Tracking</Badge></div>
        <div className="absolute bottom-2 left-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground">Gain +12dB · Loss 0.3%</div>
        <div className="absolute bottom-2 right-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground">Thermal · Nominal</div>
      </div>
    </Panel>
  );
}

/* ==================================================================
   PRIORITY ALERTS
   ================================================================== */
type Alert = { id: number; text: string; sub: string; bornAt: number };
const ALERT_PRESETS: [string, string][] = [
  ["AI VOICE CLONE",          "synth >90% / breath weak"],
  ["URGENT TRANSFER",         "「今天必须办」"],
  ["AUTHORITY IMPERSONATION", "「公检法」语义命中"],
  ["DEEPFAKE LIVE",           "实时换声 / lipsync drift"],
  ["ROUTE ANOMALY",           "MM/YGN ≠ shown CN/BJ"],
  ["RELATIVE IMPERSONATION",  "「孙子」声纹偏移"],
];

function PriorityAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const [text, sub] = ALERT_PRESETS[Math.floor(Math.random() * ALERT_PRESETS.length)];
      setAlerts((prev) => [...prev.slice(-2), { id: Date.now() + Math.random(), text, sub, bornAt: Date.now() }]);
      timer = setTimeout(tick, 2500 + Math.random() * 1500);
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Panel title="Priority Alerts" right="P0" icon={ShieldAlert}>
      <ul className="space-y-2">
        {alerts.length === 0 && (
          <li className="font-mono text-[11px] text-muted-foreground">
            monitoring… <span className="cursor-blink" />
          </li>
        )}
        {alerts.slice().reverse().map((a, i) => (
          <li key={a.id} className="rounded-md border-l-2 border-vermillion bg-vermillion/8 px-3 py-2"
            style={{ opacity: i === 0 ? 1 : 0.6, animation: i === 0 ? "rise 0.4s both" : undefined }}>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-vermillion animate-pulse" />
              <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-vermillion">
                {a.text}
              </span>
            </div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/85">
              ⚠ {a.sub}
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/* ==================================================================
   COUNTERS
   ================================================================== */
function CounterStack() {
  const [intercepted, setIntercepted] = useState(3621847);
  const [blocked, setBlocked]         = useState(8294);
  const [clones, setClones]           = useState(142);

  useEffect(() => {
    const id = setInterval(() => {
      setIntercepted((v) => v + rint(1, 6));
      if (Math.random() > 0.5) setBlocked((v) => v + 1);
      if (Math.random() > 0.85) setClones((v) => v + 1);
    }, 600);
    return () => clearInterval(id);
  }, []);

  return (
    <Panel title="Counters · 24h" right="Live" icon={Cpu}>
      <div className="space-y-2">
        <BigCount label="Intercepted" v={intercepted} unit="Calls" />
        <BigCount label="Blocked"     v={blocked}     unit="Hostile" />
        <BigCount label="AI Clones"   v={clones}      unit="Detected" hi />
      </div>
    </Panel>
  );
}

function BigCount({ label, v, unit, hi }: { label: string; v: number; unit: string; hi?: boolean }) {
  return (
    <button
      className={`block w-full rounded-md border px-3 py-2 text-left transition-colors ${
        hi ? "border-vermillion/40 bg-vermillion/8 hover:bg-vermillion/12" : "border-border bg-background/40 hover:border-foreground/30"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className={`font-mono text-[9.5px] uppercase tracking-[0.16em] ${hi ? "text-vermillion" : "text-muted-foreground"}`}>
          {label}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{unit}</span>
      </div>
      <div
        className={`mt-1 numplate text-[36px] leading-[0.95] tabular-nums font-medium ${hi ? "text-vermillion" : "text-foreground"}`}
        style={{ textShadow: hi ? "0 0 14px color-mix(in oklab, var(--vermillion) 45%, transparent)" : undefined }}
      >
        {v.toLocaleString("en-US")}
      </div>
    </button>
  );
}

/* ==================================================================
   ASCII MAP
   ================================================================== */
const MAP_LINES = [
  "·····████████·███······█████··",
  "····██████████·███··█████████·",
  "···████ ◉ ████··████████ ●  ██",
  "··████████████···████████ ●  █",
  "·· ███████████·····██████·····",
  "····██████████ ●  ███·········",
  "·······████████·███···········",
  "·······████ ◉ ██·███··········",
  "··········█████·█·············",
  "···········███················",
];

function AsciiMap() {
  return (
    <Panel title="Threat Map" right="SE-Asia · 2025" icon={MapIcon} className="flex-1">
      <pre className="font-mono text-[8.5px] leading-[1.15]">
        {MAP_LINES.map((l, i) => (
          <div key={i}>
            {l.split("").map((ch, j) => {
              if (ch === "◉") return <span key={j} className="text-vermillion-soft animate-pulse">{ch}</span>;
              if (ch === "●") return <span key={j} className="text-vermillion-soft">{ch}</span>;
              if (ch === "█") return <span key={j} className="text-vermillion/55">{ch}</span>;
              return <span key={j} className="text-muted-foreground/40">{ch}</span>;
            })}
          </div>
        ))}
      </pre>
      <div className="mt-2 grid grid-cols-2 gap-1 font-mono text-[9px] uppercase tracking-[0.14em]">
        <span>
          <span className="text-vermillion-soft">◉</span>{" "}
          <span className="text-muted-foreground">Hotspot</span>
        </span>
        <span>
          <span className="text-vermillion-soft">●</span>{" "}
          <span className="text-muted-foreground">Active</span>
        </span>
      </div>
    </Panel>
  );
}

/* ==================================================================
   COMMAND LINE
   ================================================================== */
const COMMANDS: { cmd: string; out: string[] }[] = [
  { cmd: "tail -f /var/log/intercept.log | grep AI_CLONE", out: ["[INFO] streaming…", "[HIT ] +86-138-XXXX-XX21 / synth=92.4%"] },
  { cmd: "./vg-scan --target=cn-sh-04 --depth=full", out: ["matched 8294 patterns / 24ms avg", "[OK ] scan complete"] },
  { cmd: "voiceprint analyze --realtime --model=vg-2.6.1", out: ["model loaded · 47.2ms", "F0_jitter=0.04 · breath=weak", "[VERDICT] SYNTH"] },
  { cmd: "curl -X POST localhost:8080/api/v1/analyze -d @case-1437.json", out: ["risk: 96 BLOCK", "latency: 28ms"] },
  { cmd: "defcon get && uplink status", out: ["DEFCON: 2 (ACTIVE)", "uplink: CN-SH-PVG-04 / 99.97% / 4.2ms"] },
  { cmd: "alerts --since=1h --severity=high | wc -l", out: ["8294"] },
  { cmd: "show route +86-138-XXXX-XX21", out: ["claimed_origin: CN/BJ", "actual_origin:  MM/YGN", "hops: 5 (VPN+PBX)", "[FLAG] mismatch"] },
];

function CommandLine() {
  const [idx, setIdx]         = useState(0);
  const [typed, setTyped]     = useState("");
  const [outRevealed, setOut] = useState(0);
  const [phase, setPhase]     = useState<"type" | "out" | "wait">("type");

  useEffect(() => {
    const c = COMMANDS[idx];
    let timer: ReturnType<typeof setTimeout>;
    if (phase === "type") {
      if (typed.length < c.cmd.length) {
        timer = setTimeout(() => setTyped(c.cmd.slice(0, typed.length + 1)), 26 + Math.random() * 28);
      } else {
        timer = setTimeout(() => setPhase("out"), 320);
      }
    } else if (phase === "out") {
      if (outRevealed < c.out.length) {
        timer = setTimeout(() => setOut((o) => o + 1), 220);
      } else {
        timer = setTimeout(() => setPhase("wait"), 1100);
      }
    } else {
      timer = setTimeout(() => {
        setIdx((i) => (i + 1) % COMMANDS.length);
        setTyped("");
        setOut(0);
        setPhase("type");
      }, 700);
    }
    return () => clearTimeout(timer);
  }, [phase, typed, outRevealed, idx]);

  const c = COMMANDS[idx];

  return (
    <div className="border-t border-border bg-card/70 px-5 py-2.5 font-mono text-[12.5px] backdrop-blur-sm">
      <div className="flex items-baseline gap-2">
        <Terminal className="h-3.5 w-3.5 text-vermillion-soft" />
        <span className="text-vermillion-soft">root@warroom</span>
        <span className="text-muted-foreground">:</span>
        <span className="text-vermillion">~</span>
        <span className="text-muted-foreground">#</span>
        <span className="text-vermillion-soft">{typed}</span>
        {phase === "type" && <span className="cursor-blink" />}
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Shell · zsh · {String(idx + 1).padStart(2, "0")}/{String(COMMANDS.length).padStart(2, "0")}
        </span>
      </div>
      <div className="mt-1 grid gap-0.5 text-[11.5px]">
        {phase !== "type" && c.out.slice(0, outRevealed).map((line, i) => (
          <div key={i} className="text-vermillion-soft/90">› {line}</div>
        ))}
      </div>
    </div>
  );
}

/* ==================================================================
   BOTTOM TICKER
   ================================================================== */
const TICKER_ITEMS = [
  "DEFCON 2 · ACTIVE THREAT",
  "AI CLONES ↑ 24% (24H)",
  "RTE FLAG · MM/YGN ≠ CN/BJ",
  "SCRIPT MATCH · TRANSFER URGENCY",
  "BLOCKED THIS HOUR · 8,294",
  "SYNTH RATE PEAK · 96.8%",
  "NEXT SWEEP · 04S",
  "UPLINK CN-SH-PVG-04 · 99.97% · 4.2ms",
  "CLEARANCE · TS // SI // NOFORN",
  "L'AFFAIRE · v2.6.1 · BUILD-2026.05",
  "70% 人耳无法辨别 AI 合成声",
  "3 SEC 样本 · 85% 相似度",
];

function BottomTicker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="relative overflow-hidden border-t border-border bg-vermillion/8 py-1.5">
      <div className="flex">
        <div className="marquee flex shrink-0 items-center gap-10 whitespace-nowrap px-4 font-mono text-[11px] uppercase tracking-[0.14em] text-vermillion-soft">
          {items.map((t, i) => (
            <span key={i} className="inline-flex items-center gap-2">
              <span className="text-vermillion">▮</span>
              {t}
            </span>
          ))}
        </div>
        <div className="marquee flex shrink-0 items-center gap-10 whitespace-nowrap px-4 font-mono text-[11px] uppercase tracking-[0.14em] text-vermillion-soft" aria-hidden>
          {items.map((t, i) => (
            <span key={`d-${i}`} className="inline-flex items-center gap-2">
              <span className="text-vermillion">▮</span>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
