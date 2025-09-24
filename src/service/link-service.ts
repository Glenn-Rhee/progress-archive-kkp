import ResponseError from "@/error/ResponseError";
import { Link, ResponsePayload } from "@/types";
import { supabase } from "@/utils/supabase/server";

export default class LinkService {
  static async createDataLink(
    dataUser: Link,
    username: string
  ): Promise<ResponsePayload> {
    const user = await supabase
      .from("user")
      .select("*")
      .eq("username", username);

    if (user.error) {
      throw new ResponseError(501, "An error occured");
    }

    if (user.data.length === 0) {
      throw new ResponseError(404, "User is not found!");
    }

    const createdDataLink = await supabase.from("link").insert([
      {
        idUser: user.data[0].id,
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

    if (data.length === 0) {
      const dataUrl = await supabase
        .from("link")
        .select("*")
        .ilike("url", `%${q}%`);
      if (!dataUrl.data && dataUrl.error) {
        throw new ResponseError(401, dataUrl.error.message);
      }

      if (dataUrl.data.length === 0) {
        const dataDesc = await supabase
          .from("link")
          .select("*")
          .ilike("description", `%${q}%`);
        if (!dataDesc.data && dataDesc.error) {
          throw new ResponseError(401, dataDesc.error.message);
        }

        return {
          status: "success",
          message: "Successfully get data links!",
          statusCode: 200,
          data: dataDesc.data,
        };
      }

      return {
        status: "success",
        message: "Successfully get data links!",
        statusCode: 200,
        data: dataUrl.data,
      };
    }

    return {
      status: "success",
      message: "Successfully get data links!",
      statusCode: 200,
      data,
    };
  }

  static async updateDataLink(
    id: string,
    dataUser: Link
  ): Promise<ResponsePayload> {
    const { data, error } = await supabase
      .from("link")
      .select("*")
      .eq("id", id);

    if (error) {
      console.log("Error update 1:", error.message);
      throw new ResponseError(501, "An error while update data Link");
    }

    if (data.length === 0) {
      throw new ResponseError(404, "Data is not found!");
    }

    const { error: errorUpdate } = await supabase
      .from("link")
      .update({
        ...dataUser,
      })
      .eq("id", id);

    if (errorUpdate) {
      console.log("Error update 2:", errorUpdate.message);
      throw new ResponseError(501, "An error while update data Link");
    }

    return {
      status: "success",
      statusCode: 201,
      message: "Successfully update data!",
    };
  }

  static async deleteDataLink(id: string): Promise<ResponsePayload> {
    const { data, error } = await supabase
      .from("link")
      .select("*")
      .eq("id", id);
    if (error) {
      console.log("Error delete: ", error.message);
      throw new ResponseError(501, "An error while delete data Link");
    }

    if (data.length === 0) {
      throw new ResponseError(404, "Data not found");
    }

    const { error: errorDelete } = await supabase
      .from("link")
      .delete()
      .eq("id", id);

    if (errorDelete) {
      console.log("Error delete3: ", errorDelete.message);
      throw new ResponseError(501, "An error while delete data link");
    }

    return {
      status: "success",
      message: "Successfully delete 1 data!",
      statusCode: 201,
    };
  }
}
