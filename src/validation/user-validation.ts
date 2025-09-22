import z from "zod";

export default class UserValidation {
  static readonly USER = z.object({
    username: z
      .string({ error: "Please fill username properly!" })
      .min(1, { error: "Minimum of length username is 1" }),
    password: z
      .string({ error: "Please fill password properly!" })
      .min(6, { error: "Minimum of length password is 6" }),
  });
}
