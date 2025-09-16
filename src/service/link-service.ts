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
}
