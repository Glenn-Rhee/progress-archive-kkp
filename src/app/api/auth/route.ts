import ResponseError from "@/error/ResponseError";
import { ResponsePayload } from "@/types";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function DELETE(_req: NextRequest): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      throw new ResponseError(402, "Oops you have to login before logout");
    }

    cookieStore.delete("token");
    return NextResponse.json<ResponsePayload>({
      status: "success",
      message: "Successfully logout",
      statusCode: 200,
    });
  } catch (error) {
    console.log("Error Auth Route:", error);
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
