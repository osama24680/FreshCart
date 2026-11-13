"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Clock,
  Eye,
  EyeOff,
  LoaderCircle,
  Lock,
  LogIn,
  Mail,
  ShieldHalf,
  Star,
  Truck,
  Users,
} from "lucide-react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoginSchemaType } from "@/types";
import { loginValidationSchema } from "./loginValidation.schema";
import userLogin from "./login.server";
import { FacebookLogo, GoogleLogo } from "../AuthLogos";

const highlights = [
  { Icon: Truck, label: "Free Delivery" },
  { Icon: ShieldHalf, label: "Secure Payment" },
  { Icon: Clock, label: "24/7 Support" },
];

const trust = [
  { Icon: Lock, label: "SSL Secured" },
  { Icon: Users, label: "50K+ Users" },
  { Icon: Star, label: "4.9 Rating" },
];

const labelClass = "text-sm font-semibold text-gray-700";
// pl-11 leaves room for the icon inside the input
const inputClass =
  "h-12 rounded-xl border-2 border-gray-200 bg-white pl-11 text-base placeholder:text-gray-400 focus-visible:border-primary-500 focus-visible:ring-primary-500/20 md:text-base";
const inputIconClass =
  "pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-gray-400";
const socialClass =
  "flex h-12 w-full items-center justify-center gap-3 rounded-xl border-2 border-gray-200 font-medium text-gray-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-300 hover:bg-primary-50";

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginValidationSchema),
  });
  const { handleSubmit, control, setError, formState } = form;

  async function mySubmit(data: LoginSchemaType) {
    try {
      const token = await userLogin(data);
      if (!token) {
        setError("root", { message: "Incorrect email or password" });
        return;
      }
      // TODO: save the token (NextAuth) before sending the user on
      router.push("/");
    } catch {
      setError("root", {
        message: "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <main className="py-4">
      {/* Fills the screen under the header: 113px = announcement bar + navbar, 2rem = main padding */}
      <div className="container mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 lg:min-h-[calc(100dvh-113px-2rem)] lg:grid-cols-2">
        <div className="hidden space-y-6 text-center lg:block">
          <Image
            src="/images/login-hero.png"
            alt=""
            width={1024}
            height={1024}
            sizes="(min-width: 1280px) 600px, 50vw"
            className="h-96 w-full rounded-2xl object-cover shadow-lg transition-transform duration-500 hover:scale-[1.02]"
          />
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">
              FreshCart - Your One-Stop Shop for Fresh Products
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of happy customers who trust FreshCart for their
              daily grocery needs
            </p>
            <ul className="flex items-center justify-center gap-8 text-sm text-gray-500">
              {highlights.map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-2">
                  <Icon
                    className="size-4 text-primary-600"
                    aria-hidden="true"
                  />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-xl lg:p-12">
          <div className="mb-8 text-center">
            <p className="mb-4 text-3xl font-bold text-primary-600">
              Fresh<span className="text-gray-800">Cart</span>
            </p>
            <h1 className="mb-2 text-2xl font-bold text-gray-800">
              Welcome Back!
            </h1>
            <p className="text-gray-600">
              Sign in to continue your fresh shopping experience
            </p>
          </div>

          <div className="mb-6 space-y-3">
            <button type="button" className={socialClass}>
              <GoogleLogo />
              Continue with Google
            </button>
            <button type="button" className={socialClass}>
              <FacebookLogo />
              Continue with Facebook
            </button>
          </div>

          <div className="my-6 flex items-center gap-4 text-sm font-medium text-gray-500">
            <span className="h-px flex-1 bg-gray-200" />
            OR CONTINUE WITH EMAIL
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          {/* method="post": if JS hasn't loaded yet, the browser must not put the password in the URL */}
          <form
            method="post"
            onSubmit={handleSubmit(mySubmit)}
            className="space-y-6"
          >
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-2">
                  <FieldLabel htmlFor={field.name} className={labelClass}>
                    Email Address
                  </FieldLabel>
                  <div className="relative">
                    <Mail className={inputIconClass} aria-hidden="true" />
                    <Input
                      {...field}
                      id={field.name}
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your email"
                      autoComplete="email"
                      className={inputClass}
                    />
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-2">
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor={field.name} className={labelClass}>
                      Password
                    </FieldLabel>
                    <Link
                      href="/forgot-password"
                      className="text-sm font-medium text-primary-600 hover:text-primary-700"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className={inputIconClass} aria-hidden="true" />
                    <Input
                      {...field}
                      id={field.name}
                      type={showPassword ? "text" : "password"}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className={`${inputClass} pr-12`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      aria-pressed={showPassword}
                      className="absolute top-1/2 right-3 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Design only: "remember me" needs the auth setup (NextAuth) first */}
            <label className="flex items-center gap-3 text-sm text-gray-700">
              <input
                type="checkbox"
                name="rememberMe"
                className="size-4 accent-primary-600"
              />
              Keep me signed in
            </label>

            {formState.errors.root && (
              <p
                role="alert"
                className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {formState.errors.root.message}
              </p>
            )}

            <button
              type="submit"
              disabled={formState.isSubmitting}
              className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary-600 text-lg font-semibold text-white shadow-lg shadow-primary-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-600/30 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {formState.isSubmitting ? (
                <>
                  <LoaderCircle
                    className="size-5 animate-spin"
                    aria-hidden="true"
                  />
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn
                    className="size-5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                  Sign In
                </>
              )}
            </button>
          </form>

          <p className="mt-8 border-t border-gray-100 pt-6 text-center text-gray-600">
            New to FreshCart?
            <Link
              href="/signup"
              className="ms-2 font-semibold text-primary-600 hover:text-primary-700"
            >
              Create an account
            </Link>
          </p>

          <ul className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-500">
            {trust.map(({ Icon, label }) => (
              <li key={label} className="flex items-center gap-1">
                <Icon className="size-3" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
