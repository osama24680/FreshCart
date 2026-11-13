import * as zod from "zod";
export const loginValidationSchema = zod.object({
  email: zod.email("Enter a valid email address").nonempty("Email is required"),
  // Only required here: the strength rules belong to signup, and an account
  // made before those rules existed must still be able to sign in
  password: zod.string().nonempty("Password is required"),
});
