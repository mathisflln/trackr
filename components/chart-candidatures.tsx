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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Empty,
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
                    <EmptyTitle>Aucune candidature cette semaine</EmptyTitle>
                    <EmptyDescription>
                        Vous n'avez pas envoyé de candidature ces 7 derniers jours.
                    </EmptyDescription>
                </EmptyHeader>
            </Empty>
        </Card>
    )
  }

  return (
    <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
            <CardTitle>Vos candidatures cette semaine</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
            <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={data}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Bar dataKey="total" fill="var(--color-total)" radius={8} />
                </BarChart>
            </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 leading-none font-medium">
            Total
            </div>
            <div className="leading-none text-muted-foreground">
            N'oubliez pas de postuler tous les jours !
            </div>
        </CardFooter>
    </Card>
  )
}