import { z } from "zod";

const SignupUser = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username is required and must be at least 4 characters long.",
    })
    .max(16, { message: "Username must not be longer than 16 characters." }),
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Must be a valid email." }),
  password: z.string().min(8, {
    message: "Password is required and must be at least 8 characters.",
  }),
});

export default SignupUser;
