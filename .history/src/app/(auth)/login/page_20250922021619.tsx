import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/SubmitButton";
import { signIn } from "@/lib/auth";

export default function LoginPage() {
  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to sign in to your account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          className="grid gap-6"
          action={async (formData) => {
            "use server";
            await signIn("nodemailer", formData);
          }}
        >
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="hello@example.com"
              required
            />
          </div>

          <SubmitButton title="Login" />
        </form>
      </CardContent>
    </Card>
  );
}
