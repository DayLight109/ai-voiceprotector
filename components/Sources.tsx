const SOURCES = [
  {
    cat: "公安部 · 官方数据",
    items: [
      ["2025 年度发布会数据 · 新华社", "新华社官方报道 · 2026/01/08", "https://www.news.cn"],
      ["十四五总结 · 公安部 + 人民日报", "人民日报客户端", "https://www.peopleapp.com"],
      ["2024 公安部官网 · 人民公安报专题", "公安部 mps.gov.cn", "https://www.mps.gov.cn"],
      ["《电信网络诈骗犯罪白皮书》", "公安部刑侦局", "https://finance.sina.com.cn"],
    ],
  },
  {
    cat: "司法 · 检察",
    items: [
      ["最高检 2024 年工作报告", "最高人民检察院", "https://www.spp.gov.cn"],
      ["最高法：AI 变声 / 深度伪造已成主流", "中国新闻网", "https://www.chinanews.com.cn"],
      ["2024 年电诈起诉同比 ↑ 53.9%", "最高人民检察院", "https://www.spp.gov.cn"],
    ],
  },
  {
    cat: "法律 · 政策",
    items: [
      ["《反电信网络诈骗法》全文", "最高人民法院公报", "http://gongbao.court.gov.cn"],
      ["《十五五规划纲要》", "国家发改委", "https://www.ndrc.gov.cn"],
      ["上海 · 2026 反诈工作部署会议", "工信部地方动态", "https://wap.miit.gov.cn"],
    ],
  },
  {
    cat: "国际 · 案例 · 调研",
    items: [
      ["《中方倡议建立国际反诈联盟》", "人民公安报", "https://www.mps.gov.cn"],
      ["澎湃新闻 · 70% 分不清 AI 克隆", "thepaper.cn", "https://m.thepaper.cn"],
      ["新京报 · 10 分钟被骗 430 万", "bjnews.com.cn", "https://m.bjnews.com.cn"],
      ["国家反诈 APP「AI 智能通话守护」", "orient-minerva", "https://old.orient-minerva.com"],
      ["黄石 AI 克隆声音案 · 央视《今日说法》", "守护银发族特别策划", "—"],
    ],
  },
];

export default function Sources() {
  return (
    <section className="relative border-b border-border bg-paper-warm/30">
      <div className="mx-auto max-w-[1400px] px-6 py-20">
        <div className="grid grid-cols-12 items-end gap-6 border-b border-border pb-6">
          <div className="col-span-12 lg:col-span-8">
            <div className="rubric">CHAPTER XI · 来&nbsp;·&nbsp;源</div>
            <h2 className="mt-4 font-display text-[clamp(34px,4vw,60px)] font-medium leading-[0.98] tracking-[-0.02em]">
              数据与引用 · <span className="font-display-italic text-muted-foreground">Bibliography</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <p className="font-mono text-[11.5px] leading-[1.85] tracking-[0.04em] text-muted-foreground">
              本页所有数据均引自<span className="text-foreground">官方公开来源</span>，并注明发布机构与时间。如发现引用错误，欢迎指正。
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {SOURCES.map((g, gi) => (
            <div key={gi}>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-vermillion">
                / {String(gi + 1).padStart(2, "0")} · {g.cat}
              </div>
              <ul className="mt-5 space-y-5">
                {g.items.map((it, i) => (
                  <li key={i} className="border-l border-border pl-4 transition-colors hover:border-vermillion">
                    <div className="font-display text-[14.5px] font-semibold leading-snug">{it[0]}</div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{it[1]}</div>
                    <div className="mt-1 truncate font-mono text-[10px] tracking-[0.02em] text-muted-foreground/70">{it[2]}</div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
