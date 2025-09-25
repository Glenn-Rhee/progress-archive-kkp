import { cookies } from "next/headers";
import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { ResponsePayload } from "./types";

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const url = req.nextUrl.pathname;
  const tokenCookie = cookieStore.get("token");
  const method = req.method;

  const token = tokenCookie ? tokenCookie.value : null;
  if (url.includes("/api")) {
    if (url.includes("/auth")) {
      if (url.includes("/login") || url.includes("/signup")) {
        if (token) {
          return NextResponse.json<ResponsePayload>({
            status: "failed",
            statusCode: 403,
            message: "You have been loged in!",
          });
        } else {
          return NextResponse.next();
        }
      }

      if (!token) {
        return NextResponse.json<ResponsePayload>({
          status: "failed",
          statusCode: 402,
          message: "Oops you have to login before logout",
        });
      }
    }

    if (url.includes("/link")) {
      if (method !== "GET" && !token) {
        return NextResponse.json<ResponsePayload>({
          status: "failed",
          statusCode: 403,
          message: "Forbidden! Anda belum memiliki akses!",
        });
      }
    }

    if (url.includes("/user")) {
      if (method !== "GET") {
        if (!token) {
          return NextResponse.json<ResponsePayload>({
            status: "failed",
            statusCode: 403,
            message: "Forbidden! Anda belum memiliki akses!",
          });
        }
      }
    }
  } else {
    if (url.includes("/auth") && token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const matcher: MiddlewareConfig = {
  matcher: ["/:path"],
};
