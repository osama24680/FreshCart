---
name: add-form
description: Build a validated form in FreshCart using react-hook-form, zod and the shadcn Field components. Use this whenever the user wants to add or create a form, such as login, forgot password, checkout, address, contact or profile, even if they don't mention validation.
---

# Add a validated form

Build every form the way the signup page does, so all forms in FreshCart behave and look the same. Use `app/(auth)/signup/page.tsx` as the reference for styling and layout.

## Steps

1. **Write the schema next to the page**, in `<formName>Validation.schema.ts`:

   ```ts
   import * as zod from "zod";

   export const loginValidationSchema = zod.object({
     email: zod.email("Enter a valid email address"),
     password: zod.string().nonempty("Password is required"),
   });
   ```

   Give every rule a clear message, because the user sees that text under the field. For a rule that compares two fields, use `.refine` with `path` set to the field that should show the error.

2. **Add the type to `types/index.ts`**, inferred from the schema so the two can't drift apart:

   ```ts
   export type LoginSchemaType = zod.infer<typeof loginValidationSchema>;
   ```

3. **Create the form** in a client component, with `"use client"` at the top. Give every field a default value so its input stays controlled:

   ```tsx
   const form = useForm<LoginSchemaType>({
     defaultValues: { email: "", password: "" },
     resolver: zodResolver(loginValidationSchema),
   });
   ```

4. **Render each field with `Controller`**:

   ```tsx
   <Controller
     control={form.control}
     name="email"
     render={({ field, fieldState }) => (
       <Field data-invalid={fieldState.invalid}>
         <FieldLabel htmlFor={field.name}>Email*</FieldLabel>
         <Input
           {...field}
           id={field.name}
           type="email"
           aria-invalid={fieldState.invalid}
           placeholder="ali@example.com"
         />
         {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
       </Field>
     )}
   />
   ```

   `data-invalid` and `aria-invalid` drive the error styling and tell screen readers about the error, so keep both.

## Conventions

- Name the component in PascalCase, such as `LoginPage`. React's hook rules only accept hooks inside components with capitalized names.
- Style with Tailwind and the `primary-*` colors, and reuse the class names from the signup page.
- Add polished hover and focus motion to the submit button, like the lift and shadow on the signup button.
- Set `autoComplete` to the real value for each field, such as `email` or `current-password`, so browsers and password managers can fill it in.

## Before finishing

Run `npx tsc --noEmit` and `npm run lint`, then fix anything they report in the new files.
