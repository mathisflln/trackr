"use client"

import React from "react"

import { ReadCandidature } from "@/components/read-candidature"
import { UpdateCandidature } from "@/components/update-candidature"
import { deleteCandidature } from "@/app/auth/actions"

import { ColumnDef } from "@tanstack/react-table"
import {
  IconLoader,
  IconMessage,
  IconCircleXFilled,
  IconCircleCheckFilled,
  IconGhost,
} from "@tabler/icons-react"

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
  AlertDialogMedia,
} from "@/components/ui/alert-dialog"

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

const statutConfig = {
  Postulé: {
    label: "Postulé",
    icon: IconLoader,
    iconClass: "",
    variant: "outline",
  },
  Entretien: {
    label: "Entretien",
    icon: IconMessage,
    iconClass: "text-yellow-500 dark:text-yellow-400",
    variant: "outline",
  },
  Refusé: {
    label: "Refusé",
    icon: IconCircleXFilled,
    iconClass: "fill-red-500 dark:fill-red-400",
    variant: "destructive",
  },
  Accepté: {
    label: "Accepté",
    icon: IconCircleCheckFilled,
    iconClass: "fill-green-500 dark:fill-green-400",
    variant: "outline",
  },
  Ghosté: {
    label: "Ghosté",
    icon: IconGhost,
    iconClass: "text-gray-500 dark:text-gray-400",
    variant: "outline",
  },
} as const

function ActionsCell({ row }: { row: { original: Candidatures } }) {
    const candidature = row.original
    const [updateOpen, setUpdateOpen] = React.useState(false)
    const [readOpen, setReadOpen] = React.useState(false)

    return (
    <>
        <ReadCandidature
            candidature={candidature}
            open={readOpen}
            onOpenChange={setReadOpen}
        />
        <UpdateCandidature
            candidature={candidature}
            open={updateOpen}
            onOpenChange={setUpdateOpen}
        />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setReadOpen(true)}>Détails</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setUpdateOpen(true)}>Modifier</DropdownMenuItem>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                className="text-red-600"
                onSelect={(e) => e.preventDefault()}
              >
                Supprimer
              </DropdownMenuItem>
            </AlertDialogTrigger>

            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                  <Trash2Icon />
                </AlertDialogMedia>

                <AlertDialogTitle>
                  Supprimer la candidature ?
                </AlertDialogTitle>

                <AlertDialogDescription>
                  Cette action est irréversible. La candidature chez{" "}
                  <strong>{candidature.entreprise}</strong> sera supprimée.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteCandidature(candidature.id)}
                >
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
    size: 25,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(!!value)
        }
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },

  {
    accessorKey: "entreprise",
    header: "Entreprise",
    size: 130,
  },

  {
    accessorKey: "poste",
    header: "Poste",
    size: 200,
  },

  {
    accessorKey: "statut",
    header: "Statut",
    size: 90,
    cell: ({ row }) => {
    const statut =
        row.getValue("statut") as keyof typeof statutConfig

    const config = statutConfig[statut]
    const Icon = config.icon

    return (
        <Badge
        variant={config.variant}
        className="flex items-center gap-1"
        >
        <Icon className={`h-3.5 w-3.5 ${config.iconClass}`} />
        {config.label}
        </Badge>
    )
    }
  },

  {
    accessorKey: "lieu",
    header: "Lieu",
    size: 140,
  },

  {
    accessorKey: "date",
    header: "Date",
    size: 80,
    cell: ({ row }) => {
      const date = row.getValue("date") as string
      if (!date) return "-"
      return new Date(date).toLocaleDateString("fr-FR")
    },
  },

  {
    id: "actions",
    size: 50,
    header: () => <div className="text-right" />,
    cell: ({ row }) => (
      <div className="flex justify-end">
        <ActionsCell row={row} />
      </div>
    ),
  },
]