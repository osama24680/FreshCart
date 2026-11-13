"use client";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { ShieldHalf, Star, Truck, UserPlus } from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Rating from "@/app/_components/Rating/Rating";
import { RegisterSchemaType } from "@/types";
import { registerValidationSchema } from "./registerValidation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getPasswordStrength } from "./passwordStrength";
import { useRouter } from "next/navigation";
import { FacebookLogo, GoogleLogo } from "../AuthLogos";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
const features = [
  {
    Icon: Star,
    title: "Premium Quality",
    text: "Premium quality products sourced from trusted suppliers.",
  },
  {
    Icon: Truck,
    title: "Fast Delivery",
    text: "Same-day delivery available in most areas",
  },
  {
    Icon: ShieldHalf,
    title: "Secure Shopping",
    text: "Your data and payments are completely secure",
  },
];

const controlHeight = "h-10 lg:h-[clamp(1.75rem,4.6dvh,3rem)]";
const fieldClass = "gap-1 lg:[@media(min-height:850px)]:gap-1.5";
const labelClass =
  "text-sm font-normal text-gray-800 lg:[@media(max-height:720px)]:text-xs lg:[@media(min-height:850px)]:text-base";
const inputClass = `${controlHeight} border-gray-300 bg-white px-3 text-sm placeholder:text-gray-400 focus-visible:border-primary-500 focus-visible:ring-primary-500/20 md:text-sm lg:[@media(min-height:850px)]:text-base`;
const socialClass = `${controlHeight} flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-800 lg:[@media(min-height:850px)]:text-base transition-all hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-sm`;

const SignupPage = () => {
  const router = useRouter();
  const form = useForm<RegisterSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(registerValidationSchema),
  });

  const { handleSubmit, control, formState } = form;

  async function mySubmit(data: RegisterSchemaType) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { acceptTerms, ...body } = data; 
      const response = await signIn("register", {
        ...body,
        redirect: false,
      });

      // id: clicking again replaces the toast instead of stacking a new one
      if (!response?.ok) {
        toast.error(
          response?.error ?? "Email already exists or invalid data provided",
          { id: "auth" },
        );
        return;
      }

      toast.success("Account created! Welcome to FreshCart 🎉", { id: "auth" });
      router.replace("/");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.", { id: "auth" });
    }
  }

  return (
    <main className="py-4">
      <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 lg:min-h-[calc(100dvh-113px-2rem)] lg:grid-cols-2 lg:gap-12">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Welcome to <span className="text-primary-600">FreshCart</span>
            </h1>
            <p className="mt-2 mb-4 text-xl text-gray-700">
              Join thousands of happy customers who enjoy fresh groceries
              delivered right to their doorstep.
            </p>
          </div>

          <ul className="my-8 space-y-6">
            {features.map(({ Icon, title, text }) => (
              <li key={title} className="group flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-200 text-primary-600 transition-all duration-300 group-hover:rotate-6 group-hover:bg-primary-600 group-hover:text-white">
                  <Icon className="size-5 fill-current" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {title}
                  </h2>
                  <p className="text-gray-600">{text}</p>
                </div>
              </li>
            ))}
          </ul>

          <figure className="rounded-md bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-lg lg:[@media(max-height:720px)]:hidden">
            <figcaption className="mb-4 flex items-center gap-4">
              <Image
                src="/images/review-author.png"
                alt=""
                width={48}
                height={48}
                className="size-12 rounded-full"
              />
              <div>
                <p className="text-gray-800">Sarah Johnson</p>
                <Rating value={5} starClassName="size-4" />
              </div>
            </figcaption>
            <blockquote className="text-gray-600 italic">
              &quot;FreshCart has transformed my shopping experience. The
              quality of the products is outstanding, and the delivery is always
              on time. Highly recommend!&quot;
            </blockquote>
          </figure>
        </div>

        <div className="flex flex-col rounded-2xl bg-white px-6 py-4 shadow-lg lg:[@media(max-height:720px)]:py-2.5">
          <h2 className="text-center text-2xl font-semibold text-gray-800 lg:[@media(min-height:850px)]:text-3xl">
            Create Your Account
          </h2>
          <p className="text-center text-sm text-gray-700 lg:[@media(min-height:850px)]:text-base">
            Start your fresh journey with us today
          </p>

          <div className="mt-3 flex gap-2 lg:[@media(max-height:720px)]:mt-1.5">
            <button type="button" className={socialClass}>
              <GoogleLogo />
              Google
            </button>
            <button type="button" className={socialClass}>
              <FacebookLogo />
              Facebook
            </button>
          </div>

          <div className="my-2 flex items-center gap-4 text-sm text-gray-600 lg:[@media(min-height:850px)]:text-base lg:[@media(max-height:720px)]:hidden">
            <span className="h-px flex-1 bg-gray-200" />
            or
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          {/* method="post": if JS hasn't loaded yet, the browser must not put the password in the URL */}
          <form
            method="post"
            onSubmit={handleSubmit(mySubmit)}
            className="mt-2 flex flex-1 flex-col justify-between gap-1"
          >
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className={fieldClass}>
                  <FieldLabel htmlFor={field.name} className={labelClass}>
                    Name*
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="text"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ali"
                    autoComplete="off"
                    className={inputClass}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className={fieldClass}>
                  <FieldLabel htmlFor={field.name} className={labelClass}>
                    Email*
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="ali@example.com"
                    autoComplete="off"
                    className={inputClass}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState }) => {
                const strength = getPasswordStrength(field.value);
                return (
                  <Field
                    data-invalid={fieldState.invalid}
                    className={fieldClass}
                  >
                    <FieldLabel htmlFor={field.name} className={labelClass}>
                      Password*
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="create a strong password"
                      autoComplete="off"
                      className={inputClass}
                    />
                    <span
                      role="progressbar"
                      aria-label={`Password strength: ${strength.label}`}
                      aria-valuenow={strength.score}
                      aria-valuemin={0}
                      aria-valuemax={5}
                      className="mt-1 h-1 overflow-hidden rounded-md bg-gray-200"
                    >
                      <span
                        style={{ width: `${strength.percent}%` }}
                        className={`block h-full rounded-md transition-all duration-300 ${strength.bar}`}
                      />
                    </span>
                    <div className="flex items-center justify-between gap-3 lg:[@media(max-height:720px)]:hidden">
                      <FieldDescription className="text-xs text-gray-500 lg:[@media(min-height:850px)]:text-sm">
                        Must be at least 8 characters with numbers and symbols
                      </FieldDescription>
                      <span
                        aria-live="polite"
                        className={`text-xs font-medium lg:[@media(min-height:850px)]:text-sm ${field.value ? strength.text : "text-gray-700"}`}
                      >
                        {strength.label}
                      </span>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                );
              }}
            />
            <Controller
              control={control}
              name="rePassword"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className={fieldClass}>
                  <FieldLabel htmlFor={field.name} className={labelClass}>
                    Confirm Password*
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="confirm your password"
                    autoComplete="off"
                    className={inputClass}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="phone"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className={fieldClass}>
                  <FieldLabel htmlFor={field.name} className={labelClass}>
                    Phone Number*
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="tel"
                    aria-invalid={fieldState.invalid}
                    placeholder="+1 234 567 8900"
                    autoComplete="off"
                    className={inputClass}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={control}
              name="acceptTerms"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className={fieldClass}>
                  <div className="flex items-center gap-2">
                    {/* A checkbox stores true/false in "checked", not in "value" */}
                    <input
                      type="checkbox"
                      id={field.name}
                      name={field.name}
                      ref={field.ref}
                      checked={field.value ?? false}
                      onChange={(e) => field.onChange(e.target.checked)}
                      onBlur={field.onBlur}
                      aria-invalid={fieldState.invalid}
                      className="size-4 shrink-0 accent-primary-600"
                    />
                    <label
                      htmlFor={field.name}
                      className="text-sm text-gray-800 lg:[@media(min-height:850px)]:text-base"
                    >
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-primary-600 hover:underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-primary-600 hover:underline"
                      >
                        Privacy Policy
                      </Link>{" "}
                      *
                    </label>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <button
              type="submit"
              disabled={formState.isSubmitting}
              className={`disabled:cursor-not-allowed disabled:opacity-60 group flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-primary-600 ${controlHeight} text-sm font-medium text-white lg:[@media(min-height:850px)]:text-base transition-all hover:-translate-y-0.5 hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/30`}
            >
              <UserPlus
                className="size-4 transition-transform group-hover:scale-110"
                aria-hidden="true"
              />
              Create My Account
            </button>
          </form>

          <p className="mt-2 text-center text-sm text-gray-800 lg:[@media(min-height:850px)]:text-base">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary-600 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignupPage;
