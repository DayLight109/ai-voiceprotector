const ITEMS = [
  "公安部 · 2025 全国侦破电信网络诈骗 25.8 万起",
  "全年拦截诈骗电话 36 亿次 · 短信 33 亿条",
  "紧急止付涉诈资金 2170.7 万元",
  "见面劝阻群众 674.7 万人次",
  "AI 克隆只需 3 秒语音 · 相似度 85%",
  "70% 的人无法听辨 AI 合成声音",
  "「十四五」期间共破案 173.9 万起",
  "2024 累计紧急拦截涉案资金 3151 亿元",
  "AI 诈骗 2024 上半年涉案金额超 1.85 亿元",
];

export default function StatusTicker() {
  const items = [...ITEMS, ...ITEMS];

  return (
    <div className="relative z-20 overflow-hidden border-b border-border bg-paper-warm">
      <div className="flex">
        <div className="marquee flex shrink-0 items-center gap-12 whitespace-nowrap py-2.5 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
          {items.map((t, i) => (
            <span key={i} className="inline-flex items-center gap-3">
              <span className="h-1 w-1 rounded-full bg-vermillion" />
              <span>{t}</span>
            </span>
          ))}
        </div>
        <div
          className="marquee flex shrink-0 items-center gap-12 whitespace-nowrap py-2.5 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground"
          aria-hidden
        >
          {items.map((t, i) => (
            <span key={`b-${i}`} className="inline-flex items-center gap-3">
              <span className="h-1 w-1 rounded-full bg-vermillion" />
              <span>{t}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-paper-warm to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-paper-warm to-transparent" />
    </div>
  );
}
