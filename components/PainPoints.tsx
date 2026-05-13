import { Fingerprint, MessageSquareWarning, PhoneOff, Boxes } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const PAINS = [
  {
    n: "01",
    icon: PhoneOff,
    head: "号码显示是「真」的吗？",
    title: "来电号码真实性\n存在系统性盲区",
    body: "诈骗分子通过号码伪装、境外中转，让「孙子手机号」实际拨自异国服务器。普通人仅凭来电显示，无从分辨——这成为电信诈骗最常见的突破口。",
    tag: "TRACE",
  },
  {
    n: "02",
    icon: Fingerprint,
    head: "听上去就是他啊。",
    title: "声音真伪\n完全依赖人耳",
    body: "AI 语音合成门槛已大幅降低，3 秒样本即可合成 85% 相似度。在情绪紧张的当下，哪怕受过训练的人也难以分辨，更何况 70 多岁的老人。",
    tag: "VOICEPRINT",
  },
  {
    n: "03",
    icon: MessageSquareWarning,
    head: "「这事不能告诉家人。」",
    title: "通话进行中\n话术无法实时识别",
    body: "现有反诈工具多停留在号码标记，无法对「今天必须转账」「不能告诉家人」「这是安全账户」等高频话术做实时拦截。等用户挂断电话，钱已经汇出。",
    tag: "SCRIPT",
  },
  {
    n: "04",
    icon: Boxes,
    head: "工具很多，却没有合力。",
    title: "防护信息分散\n无法形成协同",
    body: "号码判断、声纹分析、话术识别分散在不同应用、不同环节。家庭用户尤其缺一个「一处部署、全程守护」的整合方案。",
    tag: "FRAGMENT",
  },
];

export default function PainPoints() {
  return (
    <section className="relative border-b border-border bg-paper-warm/30">
      <div className="mx-auto max-w-[1400px] px-6 py-24">
        <div className="grid grid-cols-12 items-end gap-6 border-b border-border pb-6">
          <div className="col-span-12 lg:col-span-7">
            <div className="rubric">CHAPTER III · 痛&nbsp;·&nbsp;点</div>
            <h2 className="mt-4 font-display text-[clamp(40px,5vw,76px)] font-medium leading-[0.98] tracking-[-0.025em]">
              防得住<span className="font-display-italic text-vermillion">过去</span>，
              <br className="hidden md:block" />
              防不住<span className="font-display-italic text-vermillion">未来</span>。
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <p className="font-display text-[16px] leading-[1.85] text-foreground/85">
              传统反诈范式建立在「号码黑名单 + 关键词匹配 + 事后追溯」之上。
              当骗子以 AI 克隆声音、合规话术、清白号码出现时——
              <span className="font-medium text-foreground">每一个环节都失效</span>。
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2">
          {PAINS.map((p) => {
            const Icon = p.icon;
            return (
              <article key={p.n} className="group relative bg-card p-8 transition-colors hover:bg-paper-warm/40 lg:p-10">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-paper-warm/60">
                      <Icon className="h-4 w-4 text-vermillion" />
                    </span>
                    <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
                      Pain Point · <span className="text-vermillion">{p.n}</span>
                    </div>
                  </div>
                  <Badge variant="outline">{p.tag}</Badge>
                </div>

                <h3 className="mt-8 font-display text-[clamp(28px,2.7vw,42px)] font-medium leading-[1.1] tracking-[-0.015em]">
                  {p.head}
                </h3>

                <div className="my-6 h-px w-full bg-border" />

                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 sm:col-span-4">
                    <div className="font-display-italic text-[16px] leading-snug text-vermillion whitespace-pre-line">
                      {p.title}
                    </div>
                  </div>
                  <div className="col-span-12 sm:col-span-8">
                    <p className="text-[13.5px] leading-[1.85] text-foreground/80">{p.body}</p>
                  </div>
                </div>

                {/* hover accent */}
                <div className="absolute inset-x-10 bottom-0 h-px origin-left scale-x-0 bg-vermillion transition-transform duration-700 group-hover:scale-x-100" />
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          <span>Src · 最高人民法院 · AI 变声 / 深度伪造已成主流诈骗手段</span>
          <span>Src · 最高人民检察院 · 2024 电诈起诉同比 ↑ 53.9%</span>
        </div>
      </div>
    </section>
  );
}
