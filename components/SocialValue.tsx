import { ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SocialValue() {
  return (
    <section className="relative border-b border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-24">
        <div className="grid grid-cols-12 gap-6 border-b border-border pb-6">
          <div className="col-span-12 lg:col-span-7">
            <div className="rubric">CHAPTER X · 价&nbsp;·&nbsp;值</div>
            <h2 className="mt-4 font-display text-[clamp(40px,5vw,76px)] font-medium leading-[0.98] tracking-[-0.025em]">
              把识别诈骗的负担，
              <br className="hidden md:block" />
              从最脆弱的人身上，
              <br className="hidden md:block" />
              <span className="font-display-italic text-vermillion">转移给智能设备。</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <p className="font-display text-[15.5px] leading-[1.85] text-foreground/85">
              这是 L&apos;Affaire 存在的最核心理由。
              我们不能永远让 70 岁的奶奶，独自面对最先进的犯罪工具。
              科技反诈的意义，是把门槛放在<span className="text-vermillion font-medium">诈骗链条的入口</span>，
              而不是受害者的认知负担上。
            </p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Pillar n="01" tag="经济"  title="直接经济价值" big="970" unit="亿元" note="2024 全国电诈直接损失"
            body="若覆盖率达到一定比例，仅降低 10% 的 AI 变声及高发话术诈骗成功率，每年即可为人民群众挽回数十亿元财产损失。" />
          <Pillar n="02" tag="民生"  title="社会民生价值" big="4" unit="人 / 分钟" note="2024 平均被骗速率"
            body="减轻独居老人「万一是真的」的心理负担，保护未成年人在游戏 / 刷单 / 冒充家长场景中不再因冲动受害。助力《十五五规划》对平安中国建设的明确要求。" />
          <Pillar n="03" tag="示范"  title="示范与引领"   big="∞" unit=""        note="以人民为中心"
            body="以「科技赋能反诈」为切入点，让每一位老人能安心接电话、每一位学生能放心使用手机、每一个家庭和机构少一份担忧。这是项目的初心，也是最大的社会意义。" />
        </div>

        <Card className="mt-14 grid grid-cols-12 gap-6 border-foreground/15 bg-paper-warm/40 p-10">
          <div className="col-span-12 lg:col-span-8">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-vermillion">
              Mission · 一句话
            </div>
            <p className="mt-4 font-display text-[clamp(22px,2.5vw,32px)] font-medium leading-[1.5] tracking-[-0.01em]">
              让每一通 <span className="font-display-italic text-vermillion">陌生电话</span>，
              先经过 <span className="text-olive font-medium">算法</span>；
              <br className="hidden md:block" />
              让每一段 <span className="font-display-italic text-vermillion">熟悉声音</span>，
              先经过 <span className="text-olive font-medium">验证</span>。
            </p>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:flex lg:items-end lg:justify-end">
            <Button size="lg" asChild>
              <a href="#demo">重看实时演示 <ArrowRight className="ml-1 h-4 w-4" /></a>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}

function Pillar({
  n, tag, title, big, unit, note, body,
}: {
  n: string; tag: string; title: string;
  big: string; unit: string; note: string; body: string;
}) {
  return (
    <Card className="border-border bg-card p-8 lg:p-10">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Value · <span className="text-vermillion">{n}</span>
        </span>
        <Badge variant="outline">{tag}</Badge>
      </div>
      <h3 className="mt-7 font-display text-[26px] font-semibold leading-tight">{title}</h3>
      <div className="mt-6 flex items-baseline gap-2">
        <span className="numplate text-[clamp(64px,7vw,92px)] font-medium leading-none text-vermillion">{big}</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-vermillion/80">{unit}</span>
      </div>
      <div className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">{note}</div>
      <p className="mt-6 text-[13.5px] leading-[1.85] text-foreground/80">{body}</p>
    </Card>
  );
}
