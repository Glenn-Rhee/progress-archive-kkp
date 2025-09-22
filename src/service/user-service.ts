import ResponseError from "@/error/ResponseError";
import Bcrypt from "@/lib/bcrypt";
import JWT from "@/lib/jwt";
import { ResponsePayload, User } from "@/types";
import { supabase } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default class UserSevice {
  static async createUser(data: User): Promise<ResponsePayload> {
    const coockieStore = await cookies();
    const dataUser = await supabase
      .from("user")
      .select("*")
      .eq("username", data.username);
    if (dataUser.error) {
      throw new ResponseError(401, "Error while login");
    }
    if (dataUser.data.length > 0) {
      throw new ResponseError(402, "Username already exists");
    }

    const passwordHashed = await Bcrypt.hashPassword(data.password);
    const response = await supabase.from("user").insert({
      username: data.username,
      password: passwordHashed,
    });
    if (response.error) {
      console.log(response.error);
      throw new ResponseError(401, "Error while login");
    }
    const token = JWT.generateToken({
      username: data.username,
      password: passwordHashed,
    });

    coockieStore.set({
      name: "token",
      value: token,
      httpOnly: true,
      maxAge: 60 * 60,
    });

    return {
      status: "success",
      message: "User created successfully",
      statusCode: 201,
    };
  }
  static async loginUser(data: User): Promise<ResponsePayload> {
    const dataUser = await supabase
      .from("user")
      .select("*")
      .eq("username", data.username);
    if (dataUser.error) {
      throw new ResponseError(401, dataUser.error.message);
    }
    if (dataUser.data.length === 0) {
      throw new ResponseError(402, "Username Not Found");
    }
    const isPasswordValid = await Bcrypt.comparePassword(
      data.password,
      dataUser.data[0].password
    );
    if (!isPasswordValid) {
      throw new ResponseError(403, "Password Doesn't Match");
    }
    const token = JWT.generateToken({
      username: data.username,
      password: dataUser.data[0].password,
    });
    const coockieStore = await cookies();
    coockieStore.set({
      name: "token",
      value: token,
      httpOnly: true,
      maxAge: 60 * 60,
    });

    return {
      status: "success",
      message: "Login Successful",
      statusCode: 200,
    };
  }
}
