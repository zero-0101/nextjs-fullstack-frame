import * as z from "zod";

export const UserValidation = z
  .object({
    nickname: z.string().min(4, { message: "Minimun 4 characters" }),
    email: z.string().email(),
    password: z.string().min(8, { message: "Password minimun length is 8." }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password minimun length is 8." }),
    image: z.string(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });

export const LoginValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password minimun length is 8." }),
});
