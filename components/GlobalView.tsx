import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function GlobalView() {
  return (
    <section className="relative border-b border-border bg-paper-warm/30">
      <div className="mx-auto max-w-[1400px] px-6 py-24">
        <div className="grid grid-cols-12 items-end gap-6 border-b border-border pb-6">
          <div className="col-span-12 lg:col-span-7">
            <div className="rubric">CHAPTER IX · 全&nbsp;·&nbsp;球</div>
            <h2 className="mt-4 font-display text-[clamp(40px,5vw,76px)] font-medium leading-[0.98] tracking-[-0.025em]">
              这不是<span className="font-display-italic text-vermillion">一个国家</span>
              <br className="hidden md:block" />
              的事。
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <p className="font-display text-[15.5px] leading-[1.85] text-foreground/85">
              电信网络诈骗已是蔓延全球的公共安全挑战。
              境内的技术防范，是<span className="text-vermillion font-medium">全链条打击</span>中
              不可或缺的基础环节。
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-12 gap-5">
          <Card className="col-span-12 overflow-hidden border-foreground/15 p-5 lg:col-span-7">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md bg-background">
              <div className="absolute left-5 top-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Threat Flows · 2024–2025
              </div>
              <div className="absolute right-5 top-4">
                <Badge variant="destructive"><span className="signal-dot text-vermillion" /> Live</Badge>
              </div>

              <div className="absolute inset-x-5 inset-y-12 opacity-40" style={{
                backgroundImage: "radial-gradient(circle, color-mix(in oklab, var(--ink) 25%, transparent) 1px, transparent 1.4px)",
                backgroundSize: "10px 10px",
                WebkitMaskImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 110'><path fill='black' d='M20 30 q15 -10 32 -8 q20 2 32 16 q12 14 28 12 q22 -2 36 8 q14 8 30 4 q12 -3 22 6 M30 60 q18 -8 40 0 q24 10 50 -2 q24 -10 48 2 M40 84 q24 -6 50 0 q26 6 60 -4'/></svg>\")",
                maskImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 110'><path fill='black' d='M20 30 q15 -10 32 -8 q20 2 32 16 q12 14 28 12 q22 -2 36 8 q14 8 30 4 q12 -3 22 6 M30 60 q18 -8 40 0 q24 10 50 -2 q24 -10 48 2 M40 84 q24 -6 50 0 q26 6 60 -4'/></svg>\")",
                WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskSize: "100% 100%", maskSize: "100% 100%",
              }} />

              <svg viewBox="0 0 800 500" className="absolute inset-0 h-full w-full" aria-hidden>
                <defs>
                  <linearGradient id="gx" x1="0" x2="1">
                    <stop offset="0%" stopColor="#B83227" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#5B7A3A" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
                {[
                  { from: [380, 320], to: [600, 200], delay: "0s" },
                  { from: [420, 340], to: [620, 210], delay: "0.6s" },
                  { from: [350, 300], to: [580, 180], delay: "1.2s" },
                  { from: [560, 360], to: [620, 200], delay: "1.8s" },
                ].map((arc, i) => (
                  <g key={i}>
                    <path
                      d={`M${arc.from[0]},${arc.from[1]} Q ${(arc.from[0] + arc.to[0]) / 2},${Math.min(arc.from[1], arc.to[1]) - 80} ${arc.to[0]},${arc.to[1]}`}
                      stroke="url(#gx)" strokeWidth="1.6" fill="none" strokeDasharray="4 5">
                      <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="1.8s" repeatCount="indefinite" begin={arc.delay} />
                    </path>
                    <circle cx={arc.from[0]} cy={arc.from[1]} r="4" fill="#B83227" />
                    <circle cx={arc.to[0]} cy={arc.to[1]} r="4" fill="#5B7A3A">
                      <animate attributeName="r" from="4" to="11" dur="1.6s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="1" to="0" dur="1.6s" repeatCount="indefinite" />
                    </circle>
                  </g>
                ))}
              </svg>

              <div className="absolute left-[40%] top-[58%] font-mono text-[10px] uppercase tracking-[0.12em] text-vermillion">
                ▾ 缅北 · 老挝 · 柬埔寨
              </div>
              <div className="absolute right-[18%] top-[34%] font-mono text-[10px] uppercase tracking-[0.12em] text-olive">
                ▴ 中国大陆 · 受害侧
              </div>
              <div className="absolute bottom-4 left-5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                与 <span className="text-foreground font-medium">8 国</span> 建立执法合作 · 6.8 万嫌疑人归案
              </div>
            </div>
          </Card>

          <div className="col-span-12 lg:col-span-5">
            <div className="grid grid-cols-2 gap-3">
              {[
                { v: "30", u: "国与地区", n: "全球公共安全合作论坛 · 2025" },
                { v: "8",  u: "国合作",   n: "西/阿联酋/缅/印尼/菲/老/泰/柬" },
                { v: "6.8",u: "万人归案", n: "境外涉诈犯罪嫌疑人" },
                { v: "1",  u: "项倡议",   n: "建立国际打击电信网络诈骗联盟" },
              ].map((n, i) => (
                <Card key={i} className="border-border bg-card p-5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="numplate text-[42px] font-medium leading-none">{n.v}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{n.u}</span>
                  </div>
                  <div className="mt-2.5 text-[11.5px] leading-snug text-foreground/80">{n.n}</div>
                </Card>
              ))}
            </div>

            <Card className="mt-5 border-border bg-card p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                江苏 · 连云港 · 2025.09
              </div>
              <blockquote className="mt-3 font-display text-[17px] font-medium leading-[1.6] tracking-tight">
                <span className="font-display-italic text-vermillion text-[1.3em] leading-none mr-1">"</span>
                以电信网络诈骗为代表的新型犯罪
                <span className="font-display-italic text-vermillion">已成为世界公害</span>
                和全球性打击治理难题。
                <span className="font-display-italic text-vermillion text-[1.3em] leading-none ml-1">"</span>
              </blockquote>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                — 全球公共安全合作论坛 2025 年大会
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
