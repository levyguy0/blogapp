import { z } from "zod";

const ValidUsername = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username is required and must be at least 3 characters long.",
    })
    .max(16, { message: "Username must not be longer than 16 characters." }),
});

export default ValidUsername;
