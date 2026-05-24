"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Field } from "@/components/ui/field"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog, DialogContent, DialogHeader,
  DialogFooter, DialogTitle, DialogClose,
} from "@/components/ui/dialog"
import {
  Select, SelectContent, SelectGroup,
  SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover"
import { updateCandidature } from "@/app/auth/actions"
import { Candidatures } from "@/app/(app)/candidatures/columns"

export function UpdateCandidature({
  candidature,
  open,
  onOpenChange,
}: {
  candidature: Candidatures
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [popoverOpen, setPopoverOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(
    candidature.date ? new Date(candidature.date) : undefined
  )

  async function handleSubmit(formData: FormData) {
    await updateCandidature(formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier la candidature</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4">
          <input type="hidden" name="id" value={candidature.id} />
          <Field>
            <Label htmlFor="entreprise">Entreprise</Label>
            <Input id="entreprise" name="entreprise" defaultValue={candidature.entreprise} />
          </Field>
          <Field>
            <Label htmlFor="poste">Poste</Label>
            <Input id="poste" name="poste" defaultValue={candidature.poste} />
          </Field>
          <Field>
            <Label htmlFor="description">Description</Label>
            <Input id="description" name="description" defaultValue={candidature.description} />
          </Field>
          <Field>
            <Label htmlFor="lieu">Lieu</Label>
            <Input id="lieu" name="lieu" defaultValue={candidature.lieu} />
          </Field>
          <Field>
            <Label htmlFor="lien">Lien de l'offre</Label>
            <Input id="lien" name="lien" defaultValue={candidature.lien} />
          </Field>
          <div className="flex gap-4">
            <Field className="flex-1">
              <Label htmlFor="date">Date de candidature</Label>
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" id="date" className="justify-start font-normal">
                    {date ? date.toLocaleDateString("fr-FR") : "Sélectionner une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => { setDate(d); setPopoverOpen(false) }}
                  />
                </PopoverContent>
              </Popover>
            </Field>
            <Field className="flex-1">
              <Label htmlFor="statut">Statut</Label>
              <Select name="statut" defaultValue={candidature.statut}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Postulé">Postulé</SelectItem>
                    <SelectItem value="Entretien">Entretien</SelectItem>
                    <SelectItem value="Refusé">Refusé</SelectItem>
                    <SelectItem value="Accepté">Accepté</SelectItem>
                    <SelectItem value="Ghosté">Ghosté</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </div>
          <input type="hidden" name="date" value={date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}` : ""} />
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Retour</Button>
            </DialogClose>
            <Button type="submit" formAction={handleSubmit}>Enregistrer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}