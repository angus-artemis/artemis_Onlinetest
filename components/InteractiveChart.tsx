import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import type { AnalyticsData } from "../types/dashboard"

interface InteractiveChartProps {
  data: AnalyticsData[]
  dataKey: keyof AnalyticsData
  color: string
  title: string
}

export function InteractiveChart({ data, dataKey, color, title }: InteractiveChartProps) {
  const formatValue = (value: number) => {
    if (dataKey === "followers") return value.toLocaleString()
    if (dataKey === "engagement") return `${value}%`
    return value.toLocaleString()
  }

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data.slice(-14)}>
          <XAxis
            dataKey="date"
            tickFormatter={(value) => new Date(value).getDate().toString()}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6B7280" }}
          />
          <YAxis hide />
          <Tooltip
            labelFormatter={(value) => new Date(value).toLocaleDateString()}
            formatter={(value: number) => [formatValue(value), title]}
            contentStyle={{
              backgroundColor: "white",
              border: "none",
              borderRadius: "12px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            }}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: color }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
