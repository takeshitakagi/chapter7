import { z } from "zod"

export const validationSchema = z.object({
  name: z
    .string()
    .nonempty("名前は必須です。")
    .max(30, "30文字以内にしてください。"),
  email: z
    .string()
    .nonempty("メールアドレスは必須です。")
    .email("正しいメールアドレスを入力してください。"),
  content: z
    .string()
    .nonempty("本文は必須です。")
    .max(500, "500文字以内にしてください。"),
})
