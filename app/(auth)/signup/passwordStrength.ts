// The same 5 rules as the password regex in registerValidation.schema.ts
const rules = [
  (password: string) => password.length >= 8,
  (password: string) => /[a-z]/.test(password),
  (password: string) => /[A-Z]/.test(password),
  (password: string) => /\d/.test(password),
  (password: string) => /[@$!%*?&]/.test(password),
];

const levels = [
  { label: "Weak", bar: "bg-red-500", text: "text-red-600" },
  { label: "Fair", bar: "bg-orange-500", text: "text-orange-600" },
  { label: "Good", bar: "bg-yellow-400", text: "text-yellow-700" },
  { label: "Strong", bar: "bg-primary-600", text: "text-primary-700" },
];

export function getPasswordStrength(password: string) {
  const passed = rules.filter((rule) => rule(password)).length;
  const score = password.length >= 8 ? passed : Math.min(passed, 2);
  const level = levels[Math.max(score - 2, 0)];
  return { ...level, score, percent: (score / rules.length) * 100 };
}
