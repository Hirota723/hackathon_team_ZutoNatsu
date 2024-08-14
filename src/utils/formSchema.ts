import { z } from "zod";

export const formSchema = z.object({
  image: z
    .instanceof(File)
    .or(z.null())
    .refine((file) => file instanceof File, {
      message: "画像を選択してください",
    }),
  title5: z
    .string({
      required_error: "必須項目です",
      invalid_type_error: "入力値に誤りがります",
    })
    .max(6, { message: "5音である必要があります" }),
  title7: z
    .string({
      required_error: "必須項目です",
      invalid_type_error: "入力値に誤りがります",
    })
    .max(9, { message: "5音である必要があります" }),
  title5_2: z
    .string({
      required_error: "必須項目です",
      invalid_type_error: "入力値に誤りがります",
    })
    .max(6, { message: "5音である必要があります" }),
  location: z.string().min(1, { message: "場所を選択してください" }),
});
