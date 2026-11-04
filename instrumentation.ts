export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Covers next/image, which fetches remote images without using our services
    await import("./api/setupNetwork");
  }
}
