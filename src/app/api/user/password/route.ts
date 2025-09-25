import ResponseError from "@/error/ResponseError";
import JWT from "@/lib/jwt";
import UserSevice from "@/service/user-service";
import { PasswordPutData, ResponsePayload } from "@/types";
import UserValidation from "@/validation/user-validation";
import Validation from "@/validation/Validation";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

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
    const dataBody = JSON.parse(body) as PasswordPutData;
    const data = Validation.validate(UserValidation.PUTPASSWORD, dataBody);

    const response = await UserSevice.putPassword(data, decoded.username);
    return NextResponse.json(response);
  } catch (error) {
    console.log("Error /user/password Route method PUT:", error);
    if (error instanceof ResponseError) {
      return NextResponse.json<ResponsePayload>({
        status: "failed",
        message: error.message,
        statusCode: error.status,
      });
    } else if (error instanceof ZodError) {
      return NextResponse.json<ResponsePayload>({
        status: "failed",
        message: error.issues[0].message,
        statusCode: 402,
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
