import * as React from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Field } from "@/components/ui/field"
import { Calendar } from "@/components/ui/calendar"
import { PlusIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { addCandidature } from "@/app/auth/actions"


export function AddCandidature() {
    const [open, setOpen] = React.useState(false)
    const [dialogOpen, setDialogOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)

    async function handleSubmit(formData: FormData) {
        await addCandidature(formData)
        setDialogOpen(false)
        setDate(undefined)
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
            <Button><PlusIcon />Ajouter</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Ajouter une candidature</DialogTitle>
            <DialogDescription>Remplissez les champs pour ajouter une candidature.</DialogDescription>
            </DialogHeader>
            <form className="flex flex-col gap-4">
            <Field>
                <Label htmlFor="entreprise">Entreprise</Label>
                <Input id="entreprise" name="entreprise" />
            </Field>
            <Field>
                <Label htmlFor="poste">Poste</Label>
                <Input id="poste" name="poste" />
            </Field>
            <Field>
                <Label htmlFor="description">Description</Label>
                <Input id="description" name="description" />
            </Field>
            <Field>
                <Label htmlFor="lieu">Lieu</Label>
                <Input id="lieu" name="lieu" />
            </Field>
            <Field>
                <Label htmlFor="lien">Lien de l'offre</Label>
                <Input id="lien" name="lien" />
            </Field>
            <div className="flex gap-4">
                <Field className="flex-1">
                    <Label htmlFor="date">Date de candidature</Label>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" id="date" className="justify-start font-normal">{date ? date.toLocaleDateString() : "Sélectionner une date"}</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(date) => {
                                setDate(date)
                                setOpen(false)
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                </Field>
                <Field className="flex-1">
                    <Label htmlFor="statut">Statut</Label>
                    <Select name="statut" defaultValue="Postulé">
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
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
            <input type="hidden" name="date" value={date ? date.toISOString().split("T")[0] : ""} />
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