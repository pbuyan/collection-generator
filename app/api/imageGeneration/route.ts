import { z } from "zod";
import OpenAI from "openai";
import { NextApiRequest, NextApiResponse } from "next";

const PromptSchema = z.object({
  prompt: z.string().min(1).max(5000),
  size: z.enum(["256x256", "512x512", "1024x1024"]),
});

const GenerateImage = PromptSchema.omit({});
const openai = new OpenAI();

export async function POST(req: Request) {
  const json = await req.json();

  const { prompt, size } = GenerateImage.parse({
    prompt: json.prompt,
    size: json.size,
  });

  if (prompt.trim().length === 0 || size.trim().length === 0) {
    return Response.json({
      error: {
        message: "prompt or image size missing",
      },
    });
  }

  try {
    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt: prompt,
      size: size,
      // n: 5,
      user: "",
    });

    return Response.json(response);
  } catch (error: any) {
    console.log(error);
    return Response.json({
      error: {
        message: error.message,
      },
    });
  }
}
