import z from "zod";

export default class DataLinkValidation {
  static readonly DATALINK = z.object({
    title: z
      .string({ error: "Please fill title properly!" })
      .min(1, { error: "Minimum of length title is 1" }),
    url: z.url({ error: "Please fill url properly!" }),
    description: z
      .string({ error: "Please fill descriptions properly!" })
      .optional(),
  });
}
