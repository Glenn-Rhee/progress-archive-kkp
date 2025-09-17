import z from "zod";

export default class UserValidation {
  static readonly USER = z.object({
    username: z.string({ error: "Please fill username properly!" }),
    password: z
      .string({ error: "Please fill password properly!" })
      .min(6, { error: "Minimum of length password is 6" }),
  });
}
