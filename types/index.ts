import { loginValidationSchema } from "@/app/(auth)/login/loginValidation.schema";
import { registerValidationSchema } from "@/app/(auth)/signup/registerValidation.schema";
import * as zod from "zod";

export type From = "up" | "left" | "right" | "scale";
export type productCounts = Record<string, number>;
export type RegisterSchemaType = zod.infer<typeof registerValidationSchema>;
export type LoginSchemaType = zod.infer<typeof loginValidationSchema>;
