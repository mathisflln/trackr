"use client"

import { Pie, PieChart } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent,
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
import {
  Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription,
} from "@/components/ui/empty"
import { PieChartIcon } from "lucide-react"

const chartConfig = {
  total: { label: "Candidatures" },
  Postulé:  { label: "Postulé",  color: "var(--chart-1)" },
  Entretien:{ label: "Entretien",color: "var(--chart-2)" },
  Refusé:   { label: "Refusé",   color: "var(--chart-3)" },
  Accepté:  { label: "Accepté",  color: "var(--chart-4)" },
  Ghosté:   { label: "Ghosté",   color: "var(--chart-5)" },
} satisfies ChartConfig

export function ChartStatuts({
  data,
}: {
  data: { statut: string; total: number }[]
}) {
  const isEmpty = data.every((d) => d.total === 0)

  if (isEmpty) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <PieChartIcon />
          </EmptyMedia>
          <EmptyTitle>Aucune donnée</EmptyTitle>
          <EmptyDescription>Ajoutez des candidatures pour voir la répartition.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  const chartData = data.map((d) => ({
    statut: d.statut,
    total: d.total,
    fill: `var(--color-${d.statut})`,
  }))

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Répartition des statuts</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="total" nameKey="statut" startAngle={90} endAngle={-270}/>
            <ChartLegend
              content={<ChartLegendContent nameKey="statut" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}