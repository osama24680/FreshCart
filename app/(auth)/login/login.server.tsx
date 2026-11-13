"use server";
import { baseURL } from "@/api/constants";
import { LoginSchemaType } from "@/types";

async function userLogin(data: LoginSchemaType): Promise<string | undefined> {
  const res = await fetch(`${baseURL}/api/v1/auth/signin`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  });
  const result = await res.json();

  if (result.status === "success" || res.ok) {
    return result.token;
  }
}
export default userLogin;
