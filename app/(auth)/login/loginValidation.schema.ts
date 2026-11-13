import * as zod from "zod";
export const loginValidationSchema = zod.object({
  email: zod.email("Enter a valid email address").nonempty("Email is required"),
  password: zod.string().nonempty("Password is required"),
});
