import ResponseError from "@/error/ResponseError";
import JWT from "@/lib/jwt";
import UserSevice from "@/service/user-service";
import { ResponsePayload } from "@/types";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_req: NextRequest): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    let username: string | null = null;
    if (token) {
      const decoded = JWT.verifyToken(token.value);
      if (decoded) {
        username = decoded.username;
      }
    }

    const response = await UserSevice.getUserData(username);

    return NextResponse.json<ResponsePayload>(response);
  } catch (error) {
    console.log("Error User Route:", error);
    if (error instanceof ResponseError) {
      return NextResponse.json<ResponsePayload>({
        status: "failed",
        message: error.message,
        statusCode: error.status,
      });
    } else {
      return NextResponse.json<ResponsePayload>({
        status: "failed",
        message: "An error occured",
        statusCode: 500,
      });
    }
  }
}
