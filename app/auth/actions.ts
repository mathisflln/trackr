"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

function traduireErreur(message: string): string {
  const erreurs: Record<string, string> = {
    "Invalid login credentials": "Email ou mot de passe incorrect.",
    "Email not confirmed": "Veuillez confirmer votre email avant de vous connecter.",
    "User already registered": "Un compte existe déjà avec cet email.",
    "Password should be at least 6 characters": "Le mot de passe doit contenir au moins 6 caractères.",
  }

  return erreurs[message] ?? message
}

export async function login(formData: FormData): Promise<void> {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  })

  if (error) {
    redirect(`/login?error=${encodeURIComponent(traduireErreur(error.message))}`)
  }

  redirect("/dashboard")
}

export async function signup(formData: FormData): Promise<void> {
  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  })

  if (error) {
    redirect(`/login?error=${encodeURIComponent(traduireErreur(error.message))}`)
  }

  redirect("/dashboard")
}

export async function logout(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/login")
}

export async function addCandidature(formData: FormData): Promise<void> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const { error } = await supabase.from("candidatures").insert({
    user_id: user.id,
    entreprise: formData.get("entreprise") as string,
    poste: formData.get("poste") as string,
    description: formData.get("description") as string,
    lieu: formData.get("lieu") as string,
    lien: formData.get("lien") as string,
    statut: "Postulé",
    date: formData.get("date") as string,
  })

  if (error) throw new Error(error.message)

  revalidatePath("/candidatures")
}