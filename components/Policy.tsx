import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Policy() {
  return (
    <section id="policy" className="relative border-b border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-24">
        <div className="grid grid-cols-12 items-end gap-6 border-b border-border pb-6">
          <div className="col-span-12 lg:col-span-7">
            <div className="rubric">CHAPTER VIII · 法&nbsp;·&nbsp;政</div>
            <h2 className="mt-4 font-display text-[clamp(40px,5vw,76px)] font-medium leading-[0.98] tracking-[-0.025em]">
              法律已经
              <br />
              <span className="font-display-italic text-vermillion">把要求</span>写在那里。
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <p className="font-display text-[15.5px] leading-[1.85] text-foreground/85">
              反电信诈骗已从专项整治上升为国家系统性法治部署。
              本项目正是对《反电信网络诈骗法》法定要求与「十五五」政策导向的<span className="text-vermillion font-medium">直接技术落地</span>。
            </p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-7">
            <div className="relative border-l-2 border-vermillion pl-8">
              <span className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full bg-vermillion" />
              <span className="absolute -left-[5px] bottom-0 h-2.5 w-2.5 rounded-full bg-vermillion" />
              <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-vermillion">
                《反电信网络诈骗法》§ 25
              </div>
              <blockquote className="mt-4 font-display text-[clamp(24px,2.6vw,36px)] font-medium leading-[1.45] tracking-[-0.01em]">
                <span className="font-display-italic text-vermillion text-[1.4em] leading-none mr-1">"</span>
                基础电信企业和互联网企业应当
                <span className="font-display-italic text-vermillion">建立涉诈信息实时监测与处置机制，</span>
                对涉诈电话、短信及相关应用程序依法采取拦截、关停等措施。
                <span className="font-display-italic text-vermillion text-[1.4em] leading-none ml-1">"</span>
              </blockquote>
              <div className="mt-5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
                2022.12.01 起施行 · 国家层面首次将「实时识别与处置」写入法律
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <Card className="border-foreground/15 bg-paper-warm/40 p-7">
              <Badge variant="destructive">十五五规划 · 2026 开局</Badge>
              <div className="mt-3 font-display text-[20px] font-medium leading-snug">
                《国民经济和社会发展第十五个五年规划纲要》明确要求：
                <span className="text-vermillion">「加大预防和打击电信网络诈骗力度」</span>，
                纳入数字安全与平安中国整体部署。
              </div>
              <Separator className="my-6" />
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                上海 · 2026.04.14 部署会议
              </div>
              <p className="mt-2 font-display text-[14.5px] leading-[1.85] text-foreground/85">
                将「以科技赋能为核，推进 <span className="text-vermillion font-medium">AI 技术反制</span>
                和反诈联合实验室建设」列为 2026 年核心任务。
              </p>
            </Card>
          </div>
        </div>

        <div className="mt-16">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Policy · Timeline
          </div>
          <div className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-4">
            {[
              { d: "2022 / 12", t: "《反电信网络诈骗法》施行", b: "首次以法律形式确立运营商与平台的实时监测义务。" },
              { d: "2024 / 03", t: "最高检：电诈起诉同比 ↑ 53.9%", b: "AI 变声、深度伪造、跨境团伙成为主要攻击形态。" },
              { d: "2026 / 01", t: "公安部 2025 数据公布", b: "全年拦截诈骗电话 36 亿次，紧急止付 2170.7 万元。" },
              { d: "2026 / 04", t: "上海：AI 反制为核心任务", b: "推动从「单点处置」向「全域预警」升级。" },
            ].map((m, i) => (
              <div key={i} className="bg-card p-7">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-vermillion">{m.d}</div>
                <div className="mt-3 font-display text-[17px] font-semibold leading-tight">{m.t}</div>
                <div className="mt-2 text-[12.5px] leading-[1.75] text-muted-foreground">{m.b}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
