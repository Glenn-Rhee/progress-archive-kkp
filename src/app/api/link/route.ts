import ResponseError from "@/error/ResponseError";
import LinkService from "@/service/link-service";
import { Link, ResponsePayload } from "@/types";
import DataLinkValidation from "@/validation/dataLink-validation";
import Validation from "@/validation/Validation";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.text();
    const dataBody = JSON.parse(body) as Link;
    Validation.validate(DataLinkValidation.DATALINK, dataBody);

    const response = await LinkService.createDataLink(dataBody);
    return NextResponse.json(response);
  } catch (error) {
    console.log("Error Link Route:", error);
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
