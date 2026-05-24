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
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

const chartConfig = {
  total: {
    label: "Candidatures",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

import { BarChart2Icon } from "lucide-react"

export function ChartCandidatures({
  data,
}: {
  data: { day: string; total: number }[]
}) {
  const isEmpty = data.every((d) => d.total === 0)

  if (isEmpty) {
    return (
        <Card>
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <BarChart2Icon />
                    </EmptyMedia>
                    <EmptyTitle className="text-l">Aucune candidature cette semaine</EmptyTitle>
                    <EmptyDescription>
                        Vous n'avez pas envoyé de candidature ces 7 derniers jours.
                    </EmptyDescription>
                </EmptyHeader>
            </Empty>
        </Card>
    )
  }

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