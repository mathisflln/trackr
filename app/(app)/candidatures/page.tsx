import { columns, Candidatures } from "./columns"
import { DataTable } from "./data-table"
import { createClient } from "@/lib/supabase/server"

async function getData(): Promise<Candidatures[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('candidatures')
    .select('*')

  if (error) throw new Error(error.message)

  return (data ?? []) as Candidatures[]
}

export default async function Page() {
    const data = await getData()

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <h1 className="pt-3 text-3xl font-bold tracking-tight">Mes candidatures</h1>
            <div className="min-h-screen flex-1 md:min-h-min">
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    )
}