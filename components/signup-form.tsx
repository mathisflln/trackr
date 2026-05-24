import { signup } from "@/app/auth/actions"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

interface SignupFormProps extends React.ComponentProps<"div"> {
  searchParams?: { error?: string }
}

export function SignupForm({ className, searchParams, ...props }: SignupFormProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Créer votre compte</CardTitle>
          <CardDescription>
            Entrez vos informations pour créer votre espace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {searchParams?.error && (
            <p className="mb-4 text-sm text-red-500">{searchParams.error}</p>
          )}
          <form>
            <FieldGroup>
              <Field className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="firstname">Prénom</FieldLabel>
                  <Input id="firstname" name="firstname" type="text" placeholder="Jean" required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="lastname">Nom</FieldLabel>
                  <Input id="lastname" name="lastname" type="text" placeholder="Dupont" required />
                </Field>
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" name="email" type="email" placeholder="m@exemple.fr" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                <Input id="password" name="password" type="password" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="confirm-password">Confirmer le mot de passe</FieldLabel>
                <Input id="confirm-password" name="confirm-password" type="password" required />
              </Field>
              <FieldDescription>
                Doit contenir au moins 8 caractères.
              </FieldDescription>
              <Field>
                <Button type="submit" formAction={signup}>Créer votre compte</Button>
                <FieldDescription className="text-center">
                  Vous avez déjà un compte ? <a href="/login">Se connecter</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        En cliquant sur continuer, vous acceptez les <a href="#">CGU</a>{" "}
        et la <a href="#">Politique de confidentialité</a>.
      </FieldDescription>
    </div>
  )
}