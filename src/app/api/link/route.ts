import ResponseError from "@/error/ResponseError";
import JWT from "@/lib/jwt";
import LinkService from "@/service/link-service";
import { Link, ResponsePayload } from "@/types";
import DataLinkValidation from "@/validation/dataLink-validation";
import Validation from "@/validation/Validation";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest): Promise<NextResponse> {
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
    const dataBody = JSON.parse(body) as Link;
    Validation.validate(DataLinkValidation.DATALINK, dataBody);

    const response = await LinkService.createDataLink(
      dataBody,
      decoded.username
    );
    return NextResponse.json<ResponsePayload>(response);
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

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const query = req.nextUrl.searchParams;
    const response = await LinkService.getDataLink(query);

    return NextResponse.json<ResponsePayload>(response);
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

export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) throw new ResponseError(404, "Id of link is required!");
    const body = await req.text();
    const dataBody = JSON.parse(body) as Link;
    Validation.validate(DataLinkValidation.DATALINK, dataBody);

    const response = await LinkService.updateDataLink(id, dataBody);

    return NextResponse.json<ResponsePayload>(response);
  } catch (error) {
    console.log("Error PUT link route:", error);
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

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      throw new ResponseError(402, "Id is required for this method!");
    }

    const response = await LinkService.deleteDataLink(id);
    return NextResponse.json<ResponsePayload>(response);
  } catch (error) {
    console.log("Error DELETE link route:", error);
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
