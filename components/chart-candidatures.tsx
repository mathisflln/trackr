"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const chartConfig = {
  total: {
    label: "Candidatures",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartCandidatures({
  data,
}: {
  data: { day: string; total: number }[]
}) {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Vos candidatures cette semaine</CardTitle>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={data}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Bar dataKey="total" fill="var(--color-total)" radius={8} />
                </BarChart>
            </ChartContainer>
        </CardContent>
    </Card>
  )
}