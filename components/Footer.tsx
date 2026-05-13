import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="relative bg-background">
      <div className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 pb-12 pt-20">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-7">
              <div className="font-display text-[clamp(72px,11vw,184px)] font-medium leading-[0.86] tracking-[-0.04em]">
                L<span className="font-display-italic text-vermillion">'</span>Affaire
                <span className="font-display-italic text-vermillion">.</span>
              </div>
              <div className="mt-6 max-w-xl font-display text-[16.5px] leading-[1.8] text-foreground/85">
                让一通陌生电话，先经过算法。<br />
                让一段熟悉声音，先经过验证。
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Badge variant="olive"><span className="signal-dot text-olive" /> 系统正常</Badge>
                <Badge variant="outline">EDGE · ON-DEVICE</Badge>
                <Badge variant="outline">GDPR · GB/T 35273</Badge>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Product</div>
                  <ul className="mt-3.5 space-y-2.5 text-[13.5px]">
                    {["家用防护盒", "学生 / 家庭版", "机构 1U 部署", "企业接入 API"].map((t) => (
                      <li key={t}><a className="transition-colors hover:text-vermillion" href="#">{t}</a></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Resources</div>
                  <ul className="mt-3.5 space-y-2.5 text-[13.5px]">
                    {[["现状数据", "#crisis"], ["防护机制", "#defense"], ["实时演示", "#demo"], ["政策文件", "#policy"]].map(([t, h]) => (
                      <li key={t}><a className="transition-colors hover:text-vermillion" href={h}>{t}</a></li>
                    ))}
                  </ul>
                </div>
              </div>

              <Card className="mt-10 border-foreground/15 bg-paper-warm/60 p-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-vermillion">
                  Early Access · 早鸟计划
                </div>
                <div className="mt-2.5 font-display text-[19px] font-semibold leading-snug">
                  让你身边的老人，先用上。
                </div>
                <div className="mt-5 flex gap-2">
                  <Input type="email" placeholder="留下邮箱 / 优先体验" className="flex-1 font-mono text-[12px]" />
                  <Button>申请 <ArrowRight className="h-3.5 w-3.5" /></Button>
                </div>
              </Card>
            </div>
          </div>

          <Separator className="my-12" />

          <div className="grid grid-cols-12 gap-6 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
            <div className="col-span-12 lg:col-span-5">
              © 2026 L'AFFAIRE / Voice Guardian Initiative · 本页面为概念展示页
            </div>
            <div className="col-span-12 lg:col-span-7 lg:text-right">
              项目响应《反电信网络诈骗法》§ 25 · 涉诈信息实时识别与处置义务
            </div>
          </div>
          <div className="mt-3 grid grid-cols-12 gap-6 font-mono text-[9.5px] uppercase tracking-[0.22em] text-muted-foreground/70">
            <div className="col-span-12 lg:col-span-5">
              No.2026/05 · v2.6 · BUILD-2026.05 · BACKEND go1.22
            </div>
            <div className="col-span-12 lg:col-span-7 lg:text-right">
              数据截止 2026 年 5 月 · 持续更新
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-px overflow-hidden bg-border">
        <div className="absolute inset-y-0 left-0 w-1/3"
          style={{
            background: "linear-gradient(to right, transparent, var(--vermillion), transparent)",
            animation: "marquee 3s linear infinite",
          }} />
      </div>
    </footer>
  );
}
