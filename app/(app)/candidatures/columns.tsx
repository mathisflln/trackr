"use client"

import React from "react"

import { deleteCandidature } from "@/app/auth/actions"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Trash2Icon } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogMedia
} from "@/components/ui/alert-dialog"
import { UpdateCandidature } from "@/components/update-candidature"

export type Candidatures = {
  id: string
  user_id: string
  entreprise: string
  poste: string
  statut: "Postulé" | "Entretien" | "Refusé" | "Accepté" | "Ghosté"
  lieu: string
  contact: string
  lien: string
  date: string
  description: string
  created_at: string
}

function ActionsCell({ row }: { row: { original: Candidatures } }) {
  const candidature = row.original
  const [updateOpen, setUpdateOpen] = React.useState(false)

  return (
    <>
      <UpdateCandidature
        candidature={candidature}
        open={updateOpen}
        onOpenChange={setUpdateOpen}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Détails</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setUpdateOpen(true)}>
            Modifier
          </DropdownMenuItem>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem variant="destructive" onSelect={(e) => e.preventDefault()}>
                Supprimer
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Supprimer la candidature ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est irréversible. La candidature chez{" "}
                  <strong>{candidature.entreprise}</strong> sera définitivement supprimée.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteCandidature(candidature.id)}>
                  Supprimer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export const columns: ColumnDef<Candidatures>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
        cell: ({ row }) => (
        <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
        />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    { accessorKey: "entreprise", header: "Entreprise" },
    { accessorKey: "poste", header: "Poste" },
    {
        accessorKey: "statut",
        header: "Statut",
        cell: ({ row }) => {
            const statut = row.getValue("statut") as string

            const colors: Record<string, string> = {
                "Postulé": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
                "Entretien": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
                "Refusé": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
                "Accepté": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                "Ghosté": "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
            }

            return (
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${colors[statut] ?? ""}`}>
                    {statut}
                </span>
            )
        },
    },
  { accessorKey: "lieu", header: "Lieu" },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = row.getValue("date") as string
      if (!date) return "-"
      return new Date(date).toLocaleDateString("fr-FR")
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell row={row} />,
  },
]