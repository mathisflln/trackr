"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { MegaphoneIcon, CalendarIcon, TargetIcon, BriefcaseIcon, TrendingUpIcon } from "lucide-react"

const campagnes = [
  {
    icon: MegaphoneIcon,
    titre: "Startups Paris — Tech",
    description: "3 candidatures envoyées sur 8 offres ciblées.",
    statut: "En cours",
    couleur: "text-blue-500",
  },
  {
    icon: BriefcaseIcon,
    titre: "Grands groupes — Data",
    description: "Campagne démarrée le 01/05. 5 offres identifiées.",
    statut: "En cours",
    couleur: "text-yellow-500",
  },
  {
    icon: TargetIcon,
    titre: "Scale-ups — FullStack",
    description: "0 candidature envoyée. 6 offres en attente.",
    statut: "À démarrer",
    couleur: "text-gray-400",
  },
  {
    icon: TrendingUpIcon,
    titre: "Fintech — Backend",
    description: "Campagne terminée. 4/6 offres contactées.",
    statut: "Terminée",
    couleur: "text-green-500",
  },
  {
    icon: CalendarIcon,
    titre: "Alternance — Lyon",
    description: "Planifiée pour juin 2026. 10 offres pré-sélectionnées.",
    statut: "Planifiée",
    couleur: "text-purple-500",
  },
]

const statutColors: Record<string, string> = {
  "En cours":   "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "À démarrer": "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  "Terminée":   "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "Planifiée":  "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
}

export function AlertCampagnes() {
  return (
    <div className="relative flex items-center w-full px-14">
      <Carousel className="w-full">
        <CarouselContent>
          {campagnes.map((campagne, index) => {
            const Icon = campagne.icon
            return (
              <CarouselItem key={index}>
                <div className="flex items-center gap-3 py-4">
                  <Icon className={`size-4 shrink-0 ${campagne.couleur}`} />
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium truncate">{campagne.titre}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statutColors[campagne.statut]}`}>
                        {campagne.statut}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{campagne.description}</p>
                  </div>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious className="shadow-none border-none -left-8" />
        <CarouselNext className="shadow-none border-none -right-8" />
      </Carousel>
    </div>
  )
}