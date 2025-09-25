import ResponseError from "@/error/ResponseError";
import JWT from "@/lib/jwt";
import UserSevice from "@/service/user-service";
import { DataPutUser, ResponsePayload } from "@/types";
import UserValidation from "@/validation/user-validation";
import Validation from "@/validation/Validation";
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

export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    if (!token) {
      cookieStore.delete("token");
      throw new ResponseError(403, "You have to login!");
    }

    const decoded = JWT.verifyToken(token.value);
    if (!decoded) {
      throw new ResponseError(503, "Invalid or expired token!");
    }

    const body = await req.text();
    const dataBody = JSON.parse(body) as DataPutUser;
    const data = Validation.validate(UserValidation.PUTUSER, dataBody);

    const response = await UserSevice.putUserData(data, decoded.username);
    return NextResponse.json<ResponsePayload>(response);
  } catch (error) {
    console.log("Error User Route method PUT:", error);
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
