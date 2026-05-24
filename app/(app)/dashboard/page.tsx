import { columns, Candidatures } from "../candidatures/columns"
import { DataTable } from "../candidatures/data-table"
import { createClient } from "@/lib/supabase/server"

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

  const { count: total } = await supabase
    .from("candidatures").select("*", { count: "exact", head: true }).eq("user_id", user!.id)

  const { count: reponses } = await supabase
    .from("candidatures").select("*", { count: "exact", head: true })
    .eq("user_id", user!.id).not("statut", "eq", "Postulé")

  const data = await getRecentData()

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1 className="pt-3 text-2xl font-bold tracking-tight">Bonjour {name}</h1>
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <div className="aspect-video rounded-xl bg-muted/50 p-4">
          <h2 className="text-5xl font-bold tracking-tighter">{total ?? 0}</h2>
          <p className="text-sm text-muted-foreground mt-1">candidatures</p>
        </div>
        <div className="aspect-video rounded-xl bg-muted/50 p-4">
          <h2 className="text-5xl font-bold tracking-tighter">
            {total ? Math.round(((reponses ?? 0) / total) * 100) : 0}%
          </h2>
          <p className="text-sm text-muted-foreground mt-1">ont eu une réponse</p>
        </div>
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <h2 className="text-lg font-medium">Candidatures récentes</h2>
      <DataTable columns={columns} data={data} showToolbar={false} />
    </div>
  )
}