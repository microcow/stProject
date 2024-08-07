import { Button } from "@/components/ui/button";
import { LoginForm } from "./UI/login-form";
import { Link } from "lucide-react";

export default function Home() {
  return (
    <main className="container mx-auto py-6 space-y-10">
      <a href="/signin">
        <Button>Sign in</Button>
      </a>

    </main>
  );
}