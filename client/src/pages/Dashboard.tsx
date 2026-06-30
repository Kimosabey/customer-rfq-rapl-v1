import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactECharts from "echarts-for-react";
import { api, type DashboardSummary } from "../lib/api";
import { Card, Skeleton } from "../components/ui";
import { useTheme } from "../lib/theme";

const cssVar = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "#888";

const STAGE_ORDER: { key: string; short: string; varName: string }[] = [
  { key: "In Engineering Review", short: "Eng", varName: "--st-engineering" },
  { key: "In CFT Review", short: "CFT", varName: "--st-cft" },
  { key: "In SCM Sourcing", short: "SCM", varName: "--st-scm" },
  { key: "In Estimation", short: "Est", varName: "--st-estimation" },
  { key: "Pending Approval", short: "Appr", varName: "--st-pending" },
  { key: "Order Received", short: "Won", varName: "--st-won" },
];

function HeroTile({ label, value, suffix, alt }: { label: string; value: number | string; suffix?: string; alt?: boolean }) {
  return (
    <div
      className="rounded-2xl p-4 text-white"
      style={{
        background: alt ? "linear-gradient(135deg,#0E7490,#0891B2)" : "var(--grad-sky)",
        boxShadow: "var(--glow)",
      }}
    >
      <div className="text-[11px] font-semibold opacity-85">{label}</div>
      <div className="mt-1 text-2xl font-extrabold">
        {value}
        {suffix && <span className="text-sm font-bold">{suffix}</span>}
      </div>
    </div>
  );
}

export function Dashboard() {
  const { theme } = useTheme();
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => api<DashboardSummary>("/dashboard/summary"),
  });

  const { barOption, donutOption, insight } = useMemo(() => {
    const fg = cssVar("--muted-foreground");
    const border = cssVar("--border");
    const byStage = data?.byStage ?? {};
    const cats = STAGE_ORDER.map((s) => s.short);
    const vals = STAGE_ORDER.map((s) => byStage[s.key] ?? 0);
    const colors = STAGE_ORDER.map((s) => cssVar(s.varName));
    const total = vals.reduce((a, b) => a + b, 0) || 1;
    const maxIdx = vals.indexOf(Math.max(...vals));
    const insight = vals.length
      ? `${STAGE_ORDER[maxIdx].key} holds the most — ${vals[maxIdx]} of ${total} (${Math.round((vals[maxIdx] / total) * 100)}%).`
      : "No active RFQs yet.";

    const barOption = {
      grid: { left: 8, right: 12, top: 24, bottom: 24, containLabel: true },
      tooltip: { trigger: "axis" },
      xAxis: { type: "category", data: cats, axisLine: { lineStyle: { color: border } }, axisLabel: { color: fg } },
      yAxis: { type: "value", splitLine: { lineStyle: { color: border } }, axisLabel: { color: fg } },
      series: [
        {
          type: "bar",
          data: vals.map((v, i) => ({ value: v, itemStyle: { color: colors[i], borderRadius: [4, 4, 0, 0] } })),
          barWidth: "52%",
          label: { show: true, position: "top", color: cssVar("--foreground"), fontWeight: 700, fontSize: 11 },
        },
      ],
    };

    const won = data?.won ?? 0;
    const lost = data?.lost ?? 0;
    const open = Math.max(0, (data?.active ?? 0) - won - lost);
    const donutOption = {
      tooltip: { trigger: "item" },
      legend: { bottom: 0, textStyle: { color: fg } },
      series: [
        {
          type: "pie",
          radius: ["55%", "78%"],
          avoidLabelOverlap: false,
          label: { show: true, formatter: "{b}\n{c}", color: cssVar("--foreground"), fontSize: 11 },
          data: [
            { value: won, name: "Won", itemStyle: { color: cssVar("--st-won") } },
            { value: lost, name: "Lost", itemStyle: { color: cssVar("--st-lost") } },
            { value: open, name: "In progress", itemStyle: { color: cssVar("--muted-foreground") } },
          ],
        },
      ],
    };
    return { barOption, donutOption, insight };
    // theme is a dep so colors recompute on toggle
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, theme]);

  return (
    <div className="mx-auto max-w-[1200px]">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>

      {/* bento KPI tiles */}
      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[88px] rounded-2xl" />)
        ) : (
          <>
            <HeroTile label="Active RFQs" value={data?.active ?? 0} />
            <HeroTile label="Pending approval" value={data?.pendingApproval ?? 0} alt />
            <HeroTile label="Won" value={data?.won ?? 0} />
            <HeroTile label="Win rate" value={data?.winRate ?? 0} suffix="%" alt />
          </>
        )}
      </div>

      {/* charts */}
      <div className="mt-3 grid gap-3 lg:grid-cols-[1.5fr_1fr]">
        <Card>
          <div className="text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>RFQs by stage</div>
          {!isLoading && (
            <div className="mt-0.5 text-[11px] font-semibold" style={{ color: "var(--st-scm)" }}>↳ {insight}</div>
          )}
          {isLoading ? <Skeleton className="mt-3 h-56" /> : <ReactECharts option={barOption} style={{ height: 230 }} notMerge />}
        </Card>
        <Card>
          <div className="text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>Outcomes</div>
          {isLoading ? <Skeleton className="mt-3 h-56" /> : <ReactECharts option={donutOption} style={{ height: 230 }} notMerge />}
        </Card>
      </div>
    </div>
  );
}
