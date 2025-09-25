import ResponseError from "@/error/ResponseError";
import Bcrypt from "@/lib/bcrypt";
import JWT from "@/lib/jwt";
import {
  CreateUser,
  DataPutUser,
  PasswordPutData,
  ResponsePayload,
  User,
} from "@/types";
import { supabase } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default class UserSevice {
  static async createUser(data: CreateUser): Promise<ResponsePayload> {
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
      title: data.title,
      descriptionUser: data.descriptionUser,
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
  static async getUserData(username: string | null): Promise<ResponsePayload> {
    const user = await supabase
      .from("user")
      .select("*")
      .eq("username", username || "dfa.arsip");

    if (user.error) {
      throw new ResponseError(401, user.error.message);
    }

    return {
      status: "success",
      statusCode: 200,
      message: "Successfully get user",
      data: {
        title: user.data[0].title,
        descriptionUser: user.data[0].descriptionUser,
        username: user.data[0].username,
      },
    };
  }
  static async putUserData(
    data: DataPutUser,
    username: string
  ): Promise<ResponsePayload> {
    const dataUser = await supabase
      .from("user")
      .select("*")
      .eq("username", username);

    if (dataUser.error) {
      console.log(dataUser.error);
      throw new ResponseError(401, "An error while edit data!");
    }

    if (dataUser.data.length === 0) {
      throw new ResponseError(404, "Oops! User is not found!");
    }

    const updateUser = await supabase
      .from("user")
      .update(data)
      .eq("id", dataUser.data[0].id);

    if (updateUser.error) {
      console.log(updateUser.error);
      throw new ResponseError(401, "An error while edit data!");
    }

    return {
      status: "success",
      message: "Successfully update user",
      statusCode: 201,
    };
  }
  static async putPassword(
    data: PasswordPutData,
    username: string
  ): Promise<ResponsePayload> {
    const dataUser = await supabase
      .from("user")
      .select("*")
      .eq("username", username);

    if (dataUser.error) {
      throw new ResponseError(401, "An error while update password");
    }
    if (dataUser.data.length === 0) {
      throw new ResponseError(402, "Username Not Found");
    }

    const isPasswordValid = await Bcrypt.comparePassword(
      data.currentPassword,
      dataUser.data[0].password
    );

    if (!isPasswordValid) {
      throw new ResponseError(403, "Masukkan password sebelumnya dengan benar");
    }

    const passwordHashed = await Bcrypt.hashPassword(data.password);

    const updatedPassword = await supabase
      .from("user")
      .update({
        password: passwordHashed,
      })
      .eq("id", dataUser.data[0].id);

    if (updatedPassword.error) {
      throw new ResponseError(401, "An error while update password");
    }

    return {
      status: "success",
      statusCode: 201,
      message: "Successfully update password user!",
    };
  }
}
