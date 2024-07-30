"use server";

import { z } from "zod";
import OpenAI from "openai";

const PromptSchema = z.object({
  prompt: z.string().min(1).max(5000),
  size: z.enum(["256x256", "512x512", "1024x1024"]),
});

const GenerateImage = PromptSchema.omit({});
export async function generateImage(formData: FormData) {
  const openai = new OpenAI();
  console.log("formData: ", formData);
  const { prompt, size } = GenerateImage.parse({
    prompt: formData.get("prompt"),
    size: formData.get("size"),
  });

  console.log("prompt: ", prompt);
  console.log("size: ", size);

  if (prompt.trim().length === 0 || size.trim().length === 0) {
    return {
      error: {
        message: "prompt or image size missing",
      },
    };
  }

  try {
    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt: prompt,
      size: size,
    });
    // let response = await openai.createImage({
    // 	prompt,
    // 	n: 5,
    // 	size,
    // 	user: "test 123"
    // })

    const image = response.data;
    console.log("image: ", image);
    return image;
  } catch (error: any) {
    console.log(error);
    return {
      error: {
        message: error.message,
      },
    };
  }

  // const response = await fetch('/api/generate', {
  //     method: 'POST',
  //     body: formData
  // });

  // if (!response.ok) {
  //     throw new Error(`Error generating image: ${response.statusText}`);
  // }

  // return await response.blob();
}
