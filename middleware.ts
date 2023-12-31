import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { method } = request;
  if (
    !pathname.includes("/api/login") &&
    !(pathname.includes("/api/user") && method === "POST")
  ) {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json(
        { success: false, message: "authentication failed", status: 401 },
        { status: 401 }
      );
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/:function*"],
};
