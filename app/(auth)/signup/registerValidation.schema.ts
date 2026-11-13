import * as zod from "zod";
export const registerValidationSchema = zod
  .object({
    name: zod
      .string("Name must be a string")
      .nonempty("Name is required")
      .min(3, "Enter a valid name")
      .max(50, "Name must be less than 50 characters"),
    email: zod
      .email("Enter a valid email address")
      .nonempty("Email is required"),
    phone: zod
      .string()
      .nonempty("Phone number is required")
      .regex(/^(\+?\d{1,3}[- ]?)?\d{10}$/, "Enter a valid phone number"),
    password: zod
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),
    rePassword: zod.string().nonempty("Please confirm your password"),
    acceptTerms: zod.literal(true, {
      error: "You must accept the terms and conditions",
    }),
  })
  .refine(
    (validationObject) => {
      return validationObject.password === validationObject.rePassword;
    },
    {
      error: "Passwords do not match",
      path: ["rePassword"],
    },
  );
