import { z } from "zod";

export const formSchema = z.object({
  image: z
    .instanceof(File)
    .or(z.null())
    .refine((file) => file instanceof File, {
      message: "画像を選択してください",
    }),
  title: z.string().min(1, { message: "タイトルを入力してください" }),
  location: z.string().min(1, { message: "場所を選択してください" }),
});
