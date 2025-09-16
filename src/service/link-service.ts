import ResponseError from "@/error/ResponseError";
import { Link, ResponsePayload } from "@/types";
import { supabase } from "@/utils/supabase/server";

export default class LinkService {
  static async createDataLink(dataUser: Link): Promise<ResponsePayload> {
    const createdDataLink = await supabase.from("link").insert<Link>([
      {
        ...dataUser,
      },
    ]);

    console.log("created new link!");

    if (createdDataLink.error) {
      console.log(createdDataLink.error);
      throw new ResponseError(501, "An error while create data Link");
    }

    return {
      status: "success",
      message: "Successfully created new link!",
      statusCode: 201,
    };
  }

  static async getDataLink(query: URLSearchParams): Promise<ResponsePayload> {
    const q = query.get("q");
    if (!q) {
      const { data, error } = await supabase.from("link").select("*");
      if (!data && error) {
        throw new ResponseError(501, "An error while get data Link");
      }

      return {
        status: "success",
        message: "Successfully get data links!",
        statusCode: 200,
        data,
      };
    }

    const { data, error } = await supabase
      .from("link")
      .select("*")
      .ilike("title", `%${q}%`);

    if (!data && error) {
      throw new ResponseError(501, "An error while get data Link");
    }

    return {
      status: "success",
      message: "Successfully get data links!",
      statusCode: 200,
      data,
    };
  }
}
