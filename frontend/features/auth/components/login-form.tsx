"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import {
  Eye,
  EyeOff,
  GraduationCap,
  Loader2,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/api/auth";
import { usesMockData } from "@/lib/api/config";
import { roleToDashboardRoute } from "@/lib/auth/portal-user";
import { resolveLoginRoute } from "@/lib/auth/login-routing";
import { setAuth } from "@/lib/auth/session";
import {
  loginFormDefaultValues,
  loginFormSchema,
  type LoginFormValues,
} from "@/schemas/login";

const sampleAccounts: Array<{
  role: string;
  identifier: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    role: "Admin",
    identifier: "admin@unireg.test",
    description: "Academic setup and oversight",
    icon: ShieldCheck,
  },
  {
    role: "Lecturer",
    identifier: "gabriel.ayem@unireg.test",
    description: "Assigned courses and result upload",
    icon: UsersRound,
  },
  {
    role: "Student",
    identifier: "A00025332",
    description: "Registration, results, transcript",
    icon: UserRound,
  },
];

export function LoginForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: loginFormDefaultValues,
    mode: "onBlur",
  });

  async function onSubmit(values: LoginFormValues) {
    setFormError(null);

    if (usesMockData()) {
      const route = resolveLoginRoute(values.identifier);
      if (!route) {
        setFormError(
          "We could not match that identifier. Use a registered email, matric number, or staff number.",
        );
        return;
      }

      queryClient.clear();
      router.push(route);
      return;
    }

    try {
      const response = await login(values.identifier, values.password);
      queryClient.clear();
      setAuth(response.access_token, response.user);
      router.push(roleToDashboardRoute(response.user.role));
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Sign in failed. Check your credentials and try again.",
      );
    }
  }

  function fillSampleAccount(identifier: string) {
    form.setValue("identifier", identifier, { shouldValidate: true });
    form.setValue("password", "demo1234", { shouldValidate: true });
    setFormError(null);
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="flex min-h-screen w-full min-w-0 flex-col justify-center overflow-x-hidden px-4 py-8 sm:px-8 lg:px-10 xl:px-12">
      <div className="mx-auto w-full max-w-full min-w-0 sm:max-w-[440px]">
        <div className="mb-7 lg:hidden">
          <div className="bg-primary text-primary-foreground mb-4 flex size-11 items-center justify-center rounded-lg">
            <GraduationCap className="size-6" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">UniReg</h1>
          <p className="text-muted-foreground mt-2 max-w-sm text-sm leading-6">
            University course registration and results management.
          </p>
        </div>

        <section className="border-border bg-card w-full max-w-full rounded-lg border p-6 sm:p-8">
          <div className="mb-6">
            <p className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">
              Portal access
            </p>
            <h2 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h2>
            <p className="text-muted-foreground mt-1 text-sm leading-6">
              Sign in with a registered email, matric number, or staff number.
            </p>
          </div>

          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email, matric number, or staff number</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="username"
                        className="h-10"
                        placeholder="A00025332"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          autoComplete="current-password"
                          className="h-10 pr-10"
                          placeholder="Enter password"
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />
                        <button
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md transition"
                          onClick={() => setShowPassword((current) => !current)}
                          type="button"
                        >
                          {showPassword ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {formError ? (
                <p className="text-destructive text-sm" role="alert">
                  {formError}
                </p>
              ) : null}

              <Button
                className="mt-2 h-10 w-full"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Signing in
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
          </Form>
        </section>

        <section className="border-border bg-card mt-4 w-full max-w-full rounded-lg border p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold">Demo accounts</p>
              <p className="text-muted-foreground mt-1 text-xs">
                Select a role to fill the form. Password is{" "}
                <span className="text-foreground font-medium">demo1234</span>.
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-2">
            {sampleAccounts.map((account) => (
              <button
                aria-label={`Use ${account.role} demo account`}
                className="border-border hover:border-primary/35 hover:bg-primary/5 flex w-full min-w-0 items-center gap-3 rounded-lg border bg-transparent px-3 py-3 text-left transition"
                key={account.role}
                onClick={() => fillSampleAccount(account.identifier)}
                type="button"
              >
                <span className="bg-primary/8 text-primary flex size-9 shrink-0 items-center justify-center rounded-lg">
                  <account.icon className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">
                    {account.role}
                  </span>
                  <span className="text-muted-foreground block truncate text-xs">
                    {account.description}
                  </span>
                </span>
                <span className="text-muted-foreground hidden max-w-[132px] truncate text-xs tabular-nums sm:block">
                  {account.identifier}
                </span>
              </button>
            ))}
          </div>
        </section>

        <p className="text-muted-foreground mt-5 text-center text-xs">
          CSC 384 Capstone · University course registration system
        </p>
      </div>
    </div>
  );
}
