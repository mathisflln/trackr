"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  BriefcaseIcon, LayoutDashboardIcon, ListIcon, CalendarIcon,
  BellDotIcon, FileTextIcon, BarChart2Icon, MegaphoneIcon,
  SparklesIcon, BookOpenIcon, LifeBuoyIcon, SendIcon, Settings2Icon,
} from "lucide-react"

const navMain = [
  { title: "Tableau de bord", url: "/dashboard", icon: <LayoutDashboardIcon />, isActive: true, items: [] },
  {
    title: "Mes candidatures", url: "/candidatures", icon: <ListIcon />,
    items: [
      { title: "Toutes", url: "/candidatures" },
      { title: "En cours", url: "/candidatures?statut=en-cours" },
      { title: "Entretiens", url: "/candidatures?statut=entretien" },
      { title: "Refusées", url: "/candidatures?statut=refuse" },
    ],
  },
  {
    title: "Entretiens", url: "/entretiens", icon: <CalendarIcon />,
    items: [
      { title: "À venir", url: "/entretiens?filter=upcoming" },
      { title: "Passés", url: "/entretiens?filter=past" },
      { title: "Mes notes", url: "/entretiens/notes" },
    ],
  },
  {
    title: "Relances", url: "/relances", icon: <BellDotIcon />,
    items: [
      { title: "À relancer", url: "/relances?filter=todo" },
      { title: "Modèles de mail", url: "/relances/modeles" },
    ],
  },
  {
    title: "Documents", url: "/documents", icon: <FileTextIcon />,
    items: [
      { title: "CV", url: "/documents?type=cv" },
      { title: "Lettres de motivation", url: "/documents?type=ldm" },
      { title: "Autres pièces", url: "/documents?type=autres" },
    ],
  },
  {
    title: "Statistiques", url: "/statistiques", icon: <BarChart2Icon />,
    items: [
      { title: "Vue globale", url: "/statistiques" },
      { title: "Par secteur", url: "/statistiques?group=secteur" },
      { title: "Par ville", url: "/statistiques?group=ville" },
    ],
  },
  {
    title: "Campagnes", url: "/campagnes", icon: <MegaphoneIcon />,
    items: [
      { title: "En cours", url: "/campagnes?filter=active" },
      { title: "À venir", url: "/campagnes?filter=upcoming" },
      { title: "Toutes", url: "/campagnes" },
    ],
  },
  { title: "Offres à la une", url: "/offres", icon: <SparklesIcon />, items: [] },
  {
    title: "Se préparer", url: "/conseils", icon: <BookOpenIcon />,
    items: [
      { title: "Guide entretien", url: "/conseils/entretien" },
      { title: "Rédiger sa candidature", url: "/conseils/redaction" },
      { title: "Lexique alternance", url: "/conseils/lexique" },
      { title: "Actualités RH", url: "/conseils/actu" },
    ],
  },
  {
    title: "Paramètres", url: "/parametres", icon: <Settings2Icon />,
    items: [
      { title: "Mon profil", url: "/parametres/profil" },
      { title: "Notifications", url: "/parametres/notifications" },
    ],
  },
]

const navSecondary = [
  { title: "Support", url: "/support", icon: <LifeBuoyIcon /> },
  { title: "Feedback", url: "/feedback", icon: <SendIcon /> },
]

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: { name: string; email: string; avatar: string }
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar className="top-(--header-height) h-[calc(100svh-var(--header-height))]!" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <BriefcaseIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">trackr <Badge className="text-xs px-1" variant="outline">Alpha</Badge></span>
                  <span className="truncate text-xs">Recherche alternance</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}