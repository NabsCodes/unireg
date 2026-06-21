import { LoginBrandPanel } from "@/features/auth/components/login-brand-panel";
import { LoginForm } from "@/features/auth/components/login-form";
import { pageSeo } from "@/content/data/seo";
import { createAuthMetadata } from "@/lib/metadata";

export const metadata = createAuthMetadata(pageSeo.auth.login);

export default function LoginPage() {
  return (
    <main className="bg-unireg-page grid min-h-screen overflow-x-hidden lg:grid-cols-[minmax(0,1fr)_minmax(420px,520px)]">
      <LoginBrandPanel />
      <LoginForm />
    </main>
  );
}
