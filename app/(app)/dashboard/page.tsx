import { columns, Candidatures } from "../candidatures/columns"
import { DataTable } from "../candidatures/data-table"
import { createClient } from "@/lib/supabase/server"

import { Card } from "@/components/ui/card"

import { ChartCandidatures } from "@/components/chart-candidatures"

async function getRecentData(): Promise<Candidatures[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('candidatures')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)
  if (error) throw new Error(error.message)
  return (data ?? []) as Candidatures[]
}

export default async function Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profil } = await supabase
    .from("profils").select("prenom").eq("id", user!.id).single()

  const name = profil?.prenom ?? user?.email ?? "vous"

  const { count: totalCandidatures } = await supabase
    .from("candidatures").select("*", { count: "exact", head: true }).eq("user_id", user!.id)

  const { count: reponses } = await supabase
    .from("candidatures").select("*", { count: "exact", head: true })
    .eq("user_id", user!.id).not("statut", "eq", "Postulé")

  const data = await getRecentData()

  const { data: candidaturesParDate } = await supabase
    .from("candidatures")
    .select("date")
    .eq("user_id", user!.id)
    .not("date", "is", null)
    .gte("date", new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split("T")[0])

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return d.toISOString().split("T")[0]
  })

  const chartData = last7Days.map((day) => ({
    day: new Date(day).toLocaleDateString("fr-FR", { weekday: "short", day: "numeric" }),
    total: (candidaturesParDate ?? []).filter((c) => c.date === day).length,
  }))

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1 className="pt-3 text-2xl font-bold tracking-tight">Bonjour {name}</h1>
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <Card className="rounded-xl bg-muted/50 p-4 gap-0">
          <h2 className="text-5xl font-bold tracking-tighter">{totalCandidatures ?? 0}</h2>
          <p className="text-sm text-muted-foreground mt-1">candidatures</p>
        </Card>
        <Card className="rounded-xl bg-muted/50 p-4 gap-0">
        <h2 className="text-5xl font-bold tracking-tighter">
          {totalCandidatures ? Math.round(((reponses ?? 0) / totalCandidatures) * 100) : 0}%
        </h2>
          <p className="text-sm text-muted-foreground mt-1">de réponses</p>
        </Card>
        <Card className="rounded-xl bg-muted/50 gap-0" />
        <Card className="rounded-xl bg-muted/50 gap-0" />
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-2">
        <ChartCandidatures data={chartData} />
        <Card className="rounded-xl bg-muted/50 p-4"></Card>
      </div>
      <h2 className="text-lg font-medium">Candidatures récentes</h2>
      <DataTable columns={columns} data={data} showToolbar={false} />
    </div>
  )
}