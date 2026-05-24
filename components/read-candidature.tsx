"use client"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { UpdateCandidature } from "./update-candidature"
import { Candidatures } from "@/app/(app)/candidatures/columns"
import { BuildingIcon, MapPinIcon, CalendarIcon, LinkIcon, UserIcon } from "lucide-react"
import React from "react"

const statutColors: Record<string, { bg: string; text: string }> = {
  "Postulé":  { bg: "#E6F1FB", text: "#0C447C" },
  "Entretien":{ bg: "#FAEEDA", text: "#633806" },
  "Refusé":   { bg: "#FCEBEB", text: "#791F1F" },
  "Accepté":  { bg: "#EAF3DE", text: "#27500A" },
  "Ghosté":   { bg: "#F0F0EF", text: "#555" },
}

export function ReadCandidature({
  candidature,
  open,
  onOpenChange,
}: {
  candidature: Candidatures
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [updateOpen, setUpdateOpen] = React.useState(false)
  const colors = statutColors[candidature.statut] ?? { bg: "#F0F0EF", text: "#555" }

  return (
    <>
      <UpdateCandidature
        candidature={candidature}
        open={updateOpen}
        onOpenChange={setUpdateOpen}
      />

      <Drawer open={open} onOpenChange={onOpenChange} direction="right">
        <DrawerContent className="flex flex-col gap-0 p-0 max-w-md ml-auto h-full">
          
          <DrawerHeader className="px-6 pt-6 pb-4 border-b">
            <div className="flex items-start justify-between gap-3">
              <div>
                <DrawerTitle className="text-lg">{candidature.poste}</DrawerTitle>
                <div className="flex items-center gap-2 mt-1">
                  <BuildingIcon className="size-3.5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{candidature.entreprise}</span>
                </div>
              </div>
              <span style={{ background: colors.bg, color: colors.text }}
                className="text-xs font-medium px-2.5 py-1 rounded-full shrink-0 mt-1">
                {candidature.statut}
              </span>
            </div>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-6">

            <div className="grid grid-cols-2 gap-4">
              {candidature.lieu && (
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">Lieu</span>
                  <div className="flex items-center gap-1.5">
                    <MapPinIcon className="size-3.5 text-muted-foreground" />
                    <span className="text-sm">{candidature.lieu}</span>
                  </div>
                </div>
              )}
              {candidature.date && (
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">Date</span>
                  <div className="flex items-center gap-1.5">
                    <CalendarIcon className="size-3.5 text-muted-foreground" />
                    <span className="text-sm">{new Date(candidature.date).toLocaleDateString("fr-FR")}</span>
                  </div>
                </div>
              )}
              {candidature.contact && (
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">Contact</span>
                  <div className="flex items-center gap-1.5">
                    <UserIcon className="size-3.5 text-muted-foreground" />
                    <span className="text-sm">{candidature.contact}</span>
                  </div>
                </div>
              )}
              {candidature.lien && (
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">Lien</span>
                  <div className="flex items-center gap-1.5">
                    <LinkIcon className="size-3.5 text-muted-foreground" />
                    <a href={candidature.lien} target="_blank" rel="noopener noreferrer"
                      className="text-sm text-blue-600 underline underline-offset-2 truncate max-w-[140px]">
                      Voir l'offre
                    </a>
                  </div>
                </div>
              )}
            </div>

            {candidature.description && (
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-wide text-muted-foreground">Description</span>
                <p className="text-sm text-muted-foreground leading-relaxed">{candidature.description}</p>
              </div>
            )}

          </div>

          <DrawerFooter className="px-6 py-4 border-t justify-between">
            <Button onClick={() => { onOpenChange(false); setUpdateOpen(true) }}>
              Modifier
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Fermer</Button>
            </DrawerClose>
          </DrawerFooter>

        </DrawerContent>
      </Drawer>
    </>
  )
}