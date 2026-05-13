import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function DefenseStack() {
  return (
    <section id="defense" className="relative border-b border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-24">
        <div className="grid grid-cols-12 items-end gap-6 border-b border-border pb-6">
          <div className="col-span-12 lg:col-span-8">
            <div className="rubric">CHAPTER IV · 防&nbsp;·&nbsp;护</div>
            <h2 className="mt-4 font-display text-[clamp(40px,5vw,76px)] font-medium leading-[0.98] tracking-[-0.025em]">
              三道关卡，
              <span className="font-display-italic text-vermillion"> 毫秒级</span> 同时落下。
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <p className="font-display text-[15.5px] leading-[1.85] text-foreground/85">
              一通可疑电话，从振铃到挂断的整个生命周期里，
              系统在<span className="text-vermillion font-medium">三个独立维度</span>持续判断。
              任何一道触发，都会即刻预警、记录、上报。
            </p>
          </div>
        </div>

        <div className="mt-16 space-y-20 lg:space-y-24">
          <Layer
            n="01"
            when="t = 0 ms · 振铃前"
            title={["来电", "溯源 · Trace"]}
            tag="ORIGIN"
            copy="电话从拨出到接通会在网络层留下可分析的痕迹：真实发起地、信令路径、号码与信号源是否吻合。系统在铃声响起的那一刻同时启动比对。"
            bullets={[
              "判断真实来源是境内还是境外",
              "对比来电号码与信号路由是否一致",
              "识别是否经多服务器中转伪装",
            ]}
            visual={<TraceMap />}
          />
          <Layer
            n="02"
            when="t = 1 ~ 4 s · 通话开始"
            title={["声纹", "AI 识别 · Forensics"]}
            tag="VOICEPRINT"
            flipped
            copy="真人发声包含大量自然「不规则性」——呼吸起伏、唇齿摩擦、情感颤动。AI 合成声音再逼真，仍在频率结构上留下规律性痕迹。这正是算法看得见、人耳看不见的地方。"
            bullets={[
              "声纹分布是否符合真人自然规律",
              "语速节律是否带机械感",
              "情绪表达与声学特征是否匹配",
            ]}
            visual={<SpectroPanel />}
          />
          <Layer
            n="03"
            when="t = 全程 · 与 02 并行"
            title={["话术", "语义识别 · Semantics"]}
            tag="SCRIPT"
            copy="不止针对 AI 合成，覆盖所有电信诈骗场景。语音转文字后，模型识别四类核心话术模式——一旦命中，立即弹出「具体」的风险类型而非泛泛提示。"
            bullets={[
              "制造紧迫感：「今天必须处理」「再晚就来不及」",
              "引导转账：「打到安全账户」「资金核查」",
              "切断外部联系：「不能告诉家人」「先静音」",
              "索要敏感信息：「银行卡号」「验证码」",
            ]}
            visual={<ScriptPanel />}
          />
        </div>

        {/* coordination strip */}
        <Card className="mt-20 grid grid-cols-12 gap-6 border-foreground/15 bg-paper-warm/40 p-10">
          <div className="col-span-12 lg:col-span-4">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
              三层联动
            </div>
            <h3 className="mt-3 font-display text-[28px] font-medium leading-tight">
              任何一道触发——
              <br />
              都会 <span className="font-display-italic text-vermillion">同步</span> 发生：
            </h3>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                ["弹屏预警", "在通话进行的同时，桌面终端 / 手机弹出具体风险类型"],
                ["指示灯变色", "绿 → 橙 → 红，老人无需识别话术，仅看颜色"],
                ["证据自动留存", "通话关键内容加密留存，可一键上报反诈中心"],
                ["亲属同步推送", "异地子女手机收到「父母正在接听高风险来电」通知"],
              ].map(([t, d], i) => (
                <li key={i} className="rounded-md border border-border bg-card p-4 transition-colors hover:border-vermillion/40">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-vermillion">
                    Sync · 0{i + 1}
                  </div>
                  <div className="mt-2 font-display text-[16px] font-semibold">{t}</div>
                  <div className="mt-1.5 text-[12.5px] leading-[1.7] text-muted-foreground">{d}</div>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </section>
  );
}

function Layer({
  n, when, title, tag, copy, bullets, visual, flipped,
}: {
  n: string; when: string; title: [string, string]; tag: string;
  copy: string; bullets: string[]; visual: React.ReactNode; flipped?: boolean;
}) {
  return (
    <div className="grid grid-cols-12 gap-6 lg:gap-12">
      <div className={`col-span-12 lg:col-span-5 ${flipped ? "lg:col-start-8" : ""}`}>
        <div className="flex items-center gap-3">
          <Badge variant="destructive">{tag} · L{n}</Badge>
          <Separator className="flex-1" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{when}</span>
        </div>
        <h3 className="mt-7 font-display text-[clamp(36px,4.2vw,64px)] font-medium leading-[0.98] tracking-[-0.025em]">
          {title[0]}<br />
          <span className="font-display-italic text-vermillion">{title[1]}</span>
        </h3>
        <p className="mt-6 max-w-[480px] font-display text-[15.5px] leading-[1.85] text-foreground/85">{copy}</p>
        <ul className="mt-7 space-y-3">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-vermillion" />
              <span className="text-[13.5px] leading-[1.75] text-foreground/85">{b}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={`col-span-12 lg:col-span-6 ${flipped ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-7"}`}>
        <Card className="overflow-hidden border-foreground/15 p-5">{visual}</Card>
      </div>
    </div>
  );
}

function TraceMap() {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md bg-paper-warm/30">
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--ink) 25%, transparent) 1px, transparent 1.5px)",
        backgroundSize: "12px 12px",
      }} />
      <svg viewBox="0 0 800 500" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="route" x1="0" x2="1">
            <stop offset="0%" stopColor="#5B7A3A" stopOpacity="0.18" />
            <stop offset="55%" stopColor="#A88B3F" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#B83227" stopOpacity="1" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="rgba(26,23,20,0.16)" strokeWidth="1">
          <path d="M50,200 q60,-60 140,-50 q80,10 130,60 q40,40 100,40 q60,0 130,-30 q60,-25 110,30 q40,40 100,30" />
          <path d="M120,330 q70,-30 150,0 q80,30 200,-10 q120,-40 240,-10" />
          <path d="M70,420 q120,-30 240,-10 q140,20 320,-30" />
        </g>
        <path d="M180,180 C 280,260 420,420 580,300" stroke="url(#route)" strokeWidth="1.8" fill="none" strokeDasharray="3 5" />
        <g transform="translate(180,180)">
          <circle r="22" fill="rgba(91,122,58,0.18)" />
          <circle r="12" fill="rgba(91,122,58,0.32)" />
          <circle r="5" fill="#5B7A3A" />
          <circle r="22" fill="none" stroke="#5B7A3A" strokeOpacity="0.55">
            <animate attributeName="r" from="12" to="36" dur="2s" repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" from="0.55" to="0" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>
        <g transform="translate(380,300)"><rect x="-5" y="-5" width="10" height="10" fill="#A88B3F" /></g>
        <g transform="translate(580,300)">
          <circle r="22" fill="rgba(184,50,39,0.20)" />
          <circle r="7" fill="#B83227" />
          <circle r="22" fill="none" stroke="#B83227" strokeOpacity="0.7">
            <animate attributeName="r" from="7" to="38" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" from="0.7" to="0" dur="1.6s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
      <div className="absolute left-5 top-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">ROUTE · LIVE</div>
      <div className="absolute left-5 bottom-5 font-mono text-[11px] leading-snug">
        <div className="text-olive">⊕ 来电显示</div>
        <div>+86 138-XXXX-XX21 (北京)</div>
      </div>
      <div className="absolute right-5 bottom-5 text-right font-mono text-[11px] leading-snug">
        <div className="text-vermillion">⊗ 实际信号源</div>
        <div>缅甸 · 仰光 · 14.7°N</div>
      </div>
      <div className="absolute right-5 top-4"><Badge variant="destructive">Mismatch · Block</Badge></div>
    </div>
  );
}

function SpectroPanel() {
  const cols = 56;
  const rows = 16;
  return (
    <div className="relative aspect-[16/10] w-full rounded-md bg-paper-warm/30">
      <div className="absolute left-5 top-4 z-10 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        Voiceprint · FFT · 0–8 kHz
      </div>
      <div className="absolute right-5 top-4 z-10"><Badge variant="destructive">Synth 92.4%</Badge></div>

      <div className="absolute inset-0 grid gap-px p-5"
           style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }}>
        {Array.from({ length: cols * rows }).map((_, i) => {
          const x = i % cols;
          const y = Math.floor(i / cols);
          const formant = Math.exp(-((y - 6) ** 2) / 8) * 0.9;
          const period = x > cols * 0.5 ? Math.abs(Math.sin(x * 0.6)) * 0.7 : Math.random();
          const noise = Math.random() * 0.4;
          const v = Math.min(1, formant * 0.6 + period * 0.4 + noise * 0.3);
          const isAI = x > cols * 0.55 && v > 0.45;
          const color = isAI
            ? `color-mix(in oklab, var(--vermillion) ${v * 100}%, transparent)`
            : `color-mix(in oklab, var(--ink) ${v * 70}%, transparent)`;
          return <span key={i} style={{ backgroundColor: color, opacity: 0.25 + v * 0.75, borderRadius: 1 }} />;
        })}
      </div>

      <div className="pointer-events-none absolute inset-y-5 left-[55%] border-l border-dashed border-vermillion/60" />
      <div className="absolute bottom-3 left-[55%] -translate-x-1/2">
        <Badge variant="destructive">AI 合成段起点</Badge>
      </div>

      <div className="absolute bottom-4 left-5 flex gap-4 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded bg-foreground/80" />真人段</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded bg-vermillion" />可疑段</span>
      </div>
    </div>
  );
}

function ScriptPanel() {
  const lines: { speaker: "孙子" | "受害人"; text: string }[] = [
    { speaker: "孙子", text: "奶奶，我闯祸了，你<可不要告诉我爸妈>……今天<必须>把钱凑齐，不然他们就要报警。" },
    { speaker: "受害人", text: "什么、什么事啊？你别哭、慢慢说……" },
    { speaker: "孙子", text: "对方家长要 4 万块私了，你先把钱<打到这个账户>，<不能拖>，姓名我发给你。" },
  ];
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md bg-paper-warm/30">
      <div className="absolute left-5 top-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        Transcript · Live STT
      </div>
      <div className="absolute right-5 top-4"><Badge variant="destructive">High Risk</Badge></div>

      <div className="mt-14 space-y-4 px-5 pb-5">
        {lines.map((l, i) => (
          <div key={i} className="grid grid-cols-12 gap-3">
            <div className="col-span-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{l.speaker}</div>
            <div className="col-span-10 font-display text-[14.5px] leading-[1.75]">{renderHighlighted(l.text)}</div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-5 flex flex-wrap gap-2">
        {["切断外部联系", "制造紧迫感", "引导转账"].map((t) => (
          <Badge key={t} variant="destructive">⚠ {t}</Badge>
        ))}
      </div>
    </div>
  );
}

function renderHighlighted(text: string) {
  const parts: React.ReactNode[] = [];
  const re = /<([^>]+)>/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let idx = 0;
  while ((match = re.exec(text)) !== null) {
    parts.push(text.slice(lastIndex, match.index));
    parts.push(
      <span key={idx++}
        className="rounded-sm bg-vermillion/15 px-1 py-0.5 text-vermillion underline decoration-vermillion/60 decoration-wavy underline-offset-4">
        {match[1]}
      </span>
    );
    lastIndex = match.index + match[0].length;
  }
  parts.push(text.slice(lastIndex));
  return <>{parts}</>;
}
