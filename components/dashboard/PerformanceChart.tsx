"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PerformanceDataPoint } from "@/types";
import { Card } from "@/components/ui/Card";

interface PerformanceChartProps {
  data: PerformanceDataPoint[];
  campaignName: string;
}

export function PerformanceChart({ data, campaignName }: PerformanceChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <p className="text-center text-gray-600 dark:text-gray-300 py-8">
          No performance data available
        </p>
      </Card>
    );
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            Performance Trends
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{campaignName}</p>
        </div>
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center" aria-hidden="true">
          <span className="text-white text-lg" role="img" aria-label="Chart icon">📈</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          aria-label={`Performance chart for ${campaignName}`}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="currentColor" 
            className="text-gray-200 dark:text-gray-700" 
          />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            stroke="currentColor"
            className="text-gray-600 dark:text-gray-400"
            style={{ fontSize: "12px" }}
          />
          <YAxis 
            stroke="currentColor"
            className="text-gray-600 dark:text-gray-400"
            style={{ fontSize: "12px" }} 
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--background)",
              border: "1px solid var(--foreground)",
              borderRadius: "8px",
              color: "var(--foreground)",
            }}
            labelFormatter={(value) => formatDate(value)}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="impressions"
            stroke="#3b82f6"
            strokeWidth={2}
            name="Impressions"
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="clicks"
            stroke="#10b981"
            strokeWidth={2}
            name="Clicks"
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="conversions"
            stroke="#f59e0b"
            strokeWidth={2}
            name="Conversions"
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

