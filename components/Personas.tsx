import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Personas() {
  return (
    <section className="relative border-b border-border bg-paper-warm/30">
      <div className="mx-auto max-w-[1400px] px-6 py-24">
        <div className="grid grid-cols-12 items-end gap-6 border-b border-border pb-6">
          <div className="col-span-12 lg:col-span-7">
            <div className="rubric">CHAPTER VII · 谁&nbsp;·&nbsp;在&nbsp;·&nbsp;用</div>
            <h2 className="mt-4 font-display text-[clamp(40px,5vw,76px)] font-medium leading-[0.98] tracking-[-0.025em]">
              三种家庭，
              <br className="hidden md:block" />
              三种<span className="font-display-italic text-vermillion">脆弱</span>。
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <p className="font-display text-[15.5px] leading-[1.85] text-foreground/85">
              我们的产品不要求用户学会识别话术、记忆口诀。它静默运行在网络入口，
              让最脆弱的人也能不必「变成专家」。
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          <PersonaCard
            n="01" tag="家庭 · 银发"
            title={["独居老人", "看一眼指示灯。"]}
            stat={{ big: "70", unit: "%", label: "公检法类受害占比" }}
            body="2023–2025 AI 诈骗案受害者中，老年群体占比 27%，与年轻人并列最高。已记录最大年龄 93 岁。我们的设备静默运行在家中网络盒上——绿 / 橙 / 红，老人唯一要做的，是看一眼颜色。"
            device={<HomeBox />}
            footer="Src · 公安部刑侦局《电信网络诈骗犯罪白皮书》"
          />
          <PersonaCard
            n="02" tag="未成年人 · 在校"
            title={["学生", "在他们点开链接前。"]}
            stat={{ big: "68.3", unit: "%", label: "学生在借贷受害者占比" }}
            body="游戏皮肤诈骗、追星打榜诈骗、冒充家长施压——未成年人受骗案件持续上升，最小受害者 6 岁。系统在校园 / 家庭 Wi-Fi 边界上工作，覆盖座机、手表手机、安卓 / iOS。"
            device={<PhoneCase />}
            footer="Src · 最高人民检察院 2024 年工作报告"
          />
          <PersonaCard
            n="03" tag="机构 · 集中部署"
            title={["养老院 · 学校 · 政府", "一处部署，全域守护。"]}
            stat={{ big: "213", unit: "万起", label: "2024 全国电诈案件" }}
            body="网络接入级部署，无需逐机安装即可对全机构来电进行统一风险分析与预警管理。后台实时查看风险记录，一键将涉诈信息上报公安系统，形成「发现 → 预警 → 取证 → 上报」完整闭环。"
            device={<RackUnit />}
            footer="Src · 公安部刑侦局 · 直接经济损失 970 亿元"
          />
        </div>
      </div>
    </section>
  );
}

function PersonaCard({
  n, tag, title, stat, body, device, footer,
}: {
  n: string; tag: string;
  title: [string, string];
  stat: { big: string; unit: string; label: string };
  body: string; device: React.ReactNode; footer: string;
}) {
  return (
    <Card className="group flex flex-col border-border bg-card p-7 transition-shadow hover:shadow-md lg:p-8">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Persona · <span className="text-vermillion">{n}</span>
        </span>
        <Badge variant="outline">{tag}</Badge>
      </div>

      <div className="mt-6 flex h-[260px] items-center justify-center rounded-md border border-border bg-paper-warm/40 p-5">
        {device}
      </div>

      <h3 className="mt-7 font-display text-[26px] font-medium leading-[1.08] tracking-[-0.015em]">
        {title[0]}<br />
        <span className="font-display-italic text-vermillion">{title[1]}</span>
      </h3>

      <div className="mt-6 flex items-baseline gap-2">
        <span className="numplate text-[60px] font-medium leading-none text-vermillion">{stat.big}</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-vermillion/80">{stat.unit}</span>
      </div>
      <div className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">{stat.label}</div>

      <p className="mt-5 grow text-[13.5px] leading-[1.85] text-foreground/80">{body}</p>

      <div className="mt-6 border-t border-dashed border-border pt-3 font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground">
        {footer}
      </div>
    </Card>
  );
}

function HomeBox() {
  return (
    <div className="relative">
      <div className="relative h-[200px] w-[260px] rounded-xl border border-foreground/15 bg-gradient-to-b from-card to-paper-warm shadow-md">
        <div className="absolute inset-x-5 top-5 h-[110px] overflow-hidden rounded-md border border-border bg-background p-3">
          <div className="flex items-center justify-between font-mono text-[8.5px] uppercase tracking-[0.16em] text-muted-foreground">
            <span>VG · HOME</span>
            <span className="text-olive">● 安全</span>
          </div>
          <div className="mt-2 font-display text-[22px] font-semibold leading-none">一切安好</div>
          <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
            最近 24h · 0 次预警
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-muted">
            <div className="h-full w-[34%] rounded-full bg-olive" />
          </div>
        </div>
        <div className="absolute inset-x-5 bottom-9 flex items-center justify-between rounded-md bg-paper-warm px-3 py-2 ring-1 ring-border">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">Status</span>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-olive shadow-[0_0_10px_var(--olive)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted" />
          </div>
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[8px] uppercase tracking-[0.24em] text-muted-foreground">
          L'Affaire · Home
        </div>
      </div>
    </div>
  );
}

function PhoneCase() {
  return (
    <div className="relative">
      <div className="relative h-[230px] w-[125px] rounded-[22px] border-2 border-foreground/30 bg-ink p-1.5">
        <div className="absolute left-1/2 top-1.5 h-2.5 w-12 -translate-x-1/2 rounded-full bg-ink z-10" />
        <div className="h-full w-full overflow-hidden rounded-[16px] p-2.5"
          style={{ background: "color-mix(in oklab, var(--ink) 92%, white 5%)" }}>
          <div className="flex items-center justify-between font-mono text-[7px] uppercase tracking-[0.14em]"
            style={{ color: "color-mix(in oklab, var(--paper) 60%, transparent)" }}>
            <span>14:37</span><span>● ●</span>
          </div>
          <div className="mt-3 rounded-md border border-vermillion/40 bg-vermillion/15 p-2">
            <div className="font-mono text-[7.5px] uppercase tracking-[0.14em] text-vermillion-soft">⚠ 高风险</div>
            <div className="mt-1 font-display text-[10px] font-semibold leading-tight text-paper">
              你的孩子正在接听一通可疑通话
            </div>
            <div className="mt-1 font-mono text-[7px] uppercase tracking-[0.14em] opacity-65 text-paper">
              已自动触发提醒
            </div>
          </div>
          <div className="mt-2 rounded-md border border-paper/15 bg-paper/5 p-2">
            <div className="font-mono text-[7.5px] uppercase tracking-[0.14em] opacity-65 text-paper">话术命中</div>
            <div className="mt-1 text-[9px] leading-tight opacity-85 text-paper">
              「你妈让我接你 / 把卡号发给我」
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1">
            <div className="rounded-sm bg-vermillion py-1 text-center font-mono text-[7.5px] uppercase tracking-[0.14em] font-medium text-paper">
              立即拨号
            </div>
            <div className="rounded-sm border border-paper/20 py-1 text-center font-mono text-[7.5px] uppercase tracking-[0.14em] text-paper">
              查看详情
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RackUnit() {
  return (
    <div className="relative">
      <div className="relative h-[100px] w-[280px] rounded-md border border-foreground/15 bg-gradient-to-b from-card to-paper-warm shadow-md">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="absolute h-2 w-2 rounded-full border border-border bg-background"
            style={{ top: i < 2 ? 10 : "calc(100% - 18px)", left: i % 2 === 0 ? 10 : "calc(100% - 18px)" }} />
        ))}
        <div className="absolute inset-y-3 left-7 flex items-center gap-3">
          <div className="font-display text-[13px] font-semibold leading-tight">
            L'Affaire
            <div className="font-mono text-[8px] uppercase tracking-[0.22em] text-muted-foreground mt-0.5">PRO · RACK 1U</div>
          </div>
        </div>
        <div className="absolute inset-y-3 right-7 flex items-center gap-2.5">
          <div className="flex flex-col items-center">
            <span className="h-2 w-2 rounded-full bg-olive shadow-[0_0_8px_var(--olive)]" />
            <span className="mt-1 font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground">PWR</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="h-2 w-2 animate-pulse rounded-full bg-vermillion shadow-[0_0_8px_var(--vermillion)]" />
            <span className="mt-1 font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground">SIG</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="h-2 w-2 rounded-full bg-muted" />
            <span className="mt-1 font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground">ALT</span>
          </div>
          <div className="ml-1 h-9 w-20 rounded-sm border border-border bg-paper-warm/60 p-1">
            <div className="flex justify-between font-mono text-[7px] text-muted-foreground">
              <span>CALLS</span><span className="text-olive">112</span>
            </div>
            <div className="font-mono text-[7px] text-muted-foreground mt-1 flex justify-between">
              <span>BLOCK</span><span className="text-vermillion">04</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
