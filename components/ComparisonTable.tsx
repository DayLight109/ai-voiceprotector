import { Check, Minus, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Cell = "yes" | "partial" | "no" | "keyword";

const HEADERS = [
  "国家反诈中心",
  "Truecaller",
  "运营商防骚扰",
  "手机厂商安全",
  "手机管家类",
  "L'Affaire",
];

const ROWS: Array<{ feature: string; detail: string; cells: Cell[] }> = [
  { feature: "已知号码黑名单拦截", detail: "针对已被标记号码的事前拦截", cells: ["yes", "yes", "yes", "yes", "yes", "yes"] },
  { feature: "识破「号码显示正常」骗局", detail: "境外伪装、PBX 中转下的来电真伪判断", cells: ["partial", "partial", "partial", "partial", "partial", "yes"] },
  { feature: "识别境外诈骗来源", detail: "信令路径与号码归属地一致性", cells: ["yes", "yes", "yes", "partial", "partial", "yes"] },
  { feature: "识破 AI 伪造 / 克隆声音", detail: "实时声纹真伪判断 · 端侧推理", cells: ["partial", "no", "no", "partial", "partial", "yes"] },
  { feature: "识别诈骗话术", detail: "通话进行中的语义级风险识别", cells: ["yes", "no", "partial", "partial", "keyword", "yes"] },
  { feature: "全网联防联控", detail: "与国家反诈系统数据互通", cells: ["yes", "yes", "yes", "yes", "yes", "yes"] },
  { feature: "自动取证 · 一键上报", detail: "高风险通话证据加密留存与上报", cells: ["no", "no", "no", "no", "partial", "yes"] },
  { feature: "反诈知识学习", detail: "面向家庭场景的科普与提醒", cells: ["yes", "no", "no", "yes", "yes", "yes"] },
];

function CellMark({ v, last }: { v: Cell; last?: boolean }) {
  if (v === "yes")
    return (
      <span className={`inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] ${last ? "text-vermillion font-medium" : "text-olive"}`}>
        <Check className="h-3.5 w-3.5" /> 支持
      </span>
    );
  if (v === "partial")
    return (
      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-caramel">
        <span className="h-1.5 w-1.5 rounded-full bg-caramel" /> 部分
      </span>
    );
  if (v === "keyword")
    return (
      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" /> 仅关键词
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground/60">
      <Minus className="h-3 w-3" /> 不支持
    </span>
  );
}

export default function ComparisonTable() {
  return (
    <section id="compare" className="relative border-b border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-24">
        <div className="grid grid-cols-12 items-end gap-6 border-b border-border pb-6">
          <div className="col-span-12 lg:col-span-7">
            <div className="rubric">CHAPTER VI · 对&nbsp;·&nbsp;比</div>
            <h2 className="mt-4 font-display text-[clamp(40px,5vw,76px)] font-medium leading-[0.98] tracking-[-0.025em]">
              市面上的反诈工具，
              <br className="hidden md:block" />
              <span className="font-display-italic text-vermillion">没有一个能听出</span>
              「声音真伪」。
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <p className="font-display text-[15.5px] leading-[1.85] text-foreground/85">
              下表横向对比六款主流反诈方案，在「AI 合成识别」这一核心维度上，已知所有产品仍是空白；
              <span className="text-vermillion font-medium">L&apos;Affaire</span> 是面向终端的首选填补方案。
            </p>
          </div>
        </div>

        <Card className="mt-10 overflow-hidden border-foreground/15">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[28%]">能力维度</TableHead>
                {HEADERS.map((h, i) => (
                  <TableHead
                    key={h}
                    className={i === HEADERS.length - 1 ? "border-l border-vermillion/30 bg-vermillion/5 text-vermillion font-medium" : ""}
                  >
                    {h}
                    {i === HEADERS.length - 1 && <Star className="ml-1.5 inline h-3 w-3" />}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROWS.map((r) => (
                <TableRow key={r.feature}>
                  <TableCell className="align-top">
                    <div className="font-display text-[15px] font-semibold leading-snug">{r.feature}</div>
                    <div className="mt-1 text-[12px] text-muted-foreground">{r.detail}</div>
                  </TableCell>
                  {r.cells.map((c, i) => (
                    <TableCell key={i} className={i === r.cells.length - 1 ? "border-l border-vermillion/30 bg-vermillion/5 align-top" : "align-top"}>
                      <CellMark v={c} last={i === r.cells.length - 1} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <div className="mt-8 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-7">
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Source · 公安部 / Truecaller / 中国电信 / 华为 / ColorOS / 腾讯手机管家
            </div>
          </div>
          <div className="col-span-12 flex flex-wrap items-center gap-3 md:col-span-5 md:justify-end">
            <Badge variant="olive"><Check className="h-3 w-3" /> 支持</Badge>
            <Badge variant="caramel">部分</Badge>
            <Badge variant="muted">仅关键词</Badge>
            <Badge variant="outline">不支持</Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
