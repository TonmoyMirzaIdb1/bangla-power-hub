import { Line, Bar, Pie } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, BarChart, PieChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts";

interface ChartData {
  [key: string]: string | number;
}

interface BaseChartProps {
  data: ChartData[];
  title?: string;
  description?: string;
  className?: string;
}

interface LineChartProps extends BaseChartProps {
  xKey: string;
  lines: { dataKey: string; stroke: string; name: string }[];
}

export const RealtimeLineChart = ({ data, title, description, xKey, lines, className }: LineChartProps) => {
  const chartConfig = lines.reduce((acc, line) => {
    acc[line.dataKey] = { label: line.name, color: line.stroke };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

  return (
    <Card className={className}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              {lines.map((line) => (
                <Line
                  key={line.dataKey}
                  type="monotone"
                  dataKey={line.dataKey}
                  stroke={line.stroke}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

interface BarChartProps extends BaseChartProps {
  xKey: string;
  bars: { dataKey: string; fill: string; name: string }[];
}

export const RealtimeBarChart = ({ data, title, description, xKey, bars, className }: BarChartProps) => {
  const chartConfig = bars.reduce((acc, bar) => {
    acc[bar.dataKey] = { label: bar.name, color: bar.fill };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

  return (
    <Card className={className}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              {bars.map((bar) => (
                <Bar key={bar.dataKey} dataKey={bar.dataKey} fill={bar.fill} radius={[4, 4, 0, 0]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

interface PieChartProps extends BaseChartProps {
  dataKey: string;
  nameKey: string;
  colors: string[];
}

export const RealtimePieChart = ({ data, title, description, dataKey, nameKey, colors, className }: PieChartProps) => {
  const chartConfig = data.reduce((acc, item, index) => {
    const key = String(item[nameKey]);
    acc[key] = { label: key, color: colors[index % colors.length] };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

  return (
    <Card className={className}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                data={data}
                dataKey={dataKey}
                nameKey={nameKey}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
