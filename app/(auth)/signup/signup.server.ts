"use server";
import { baseURL } from "@/api/constants";
import { RegisterSchemaType } from "@/types";

async function userRegister(
  data: RegisterSchemaType,
): Promise<string | undefined> {
  const res = await fetch(`${baseURL}/api/v1/auth/signup`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  });
  const result = await res.json();

  if (result.status === "success" || res.ok) {
    return result.token;
  }
}
export default userRegister;
