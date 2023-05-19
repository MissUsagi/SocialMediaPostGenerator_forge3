import { Configuration, OpenAIApi } from "openai";
import fs from "fs";
import { base64, prompt } from "~~/mocks/image";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const url = body.url; // the article URL
  // Setup open AI
  const { OPENAI_API_KEY } = useRuntimeConfig();

  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  //**********************OPEN API FETCH */

  // const { data } = await openai.createChatCompletion({
  //   model: "gpt-3.5-turbo",
  //   messages: [
  //     {
  //       role: "system",
  //       content: "You are a prompt engineer creating DALL-E prompts",
  //     },
  //     {
  //       role: "user",
  //       content: `Provide realistic physical object based on this article: ${url}`,
  //     },
  //   ],
  //   temperature: body.temperature || 1,
  // });

  // if (!data.choices[0].message?.content) {
  //   throw new Error("No message returned from OpenAI");
  // }
  // const openAIPrompt = data.choices[0].message.content;

  // const response = await openai.createImage({
  //   prompt: openAIPrompt + "",
  //   n: 1,
  //   size: "256x256",
  // });

  // const imageUrl = response.data.data[0].url;

  // if (!imageUrl) {
  //   throw new Error("No image returned from OpenAI");
  // }

  // const res = (await $fetch(imageUrl, {
  //   responseType: "arrayBuffer",
  // })) as Buffer;
  // const base64String = Buffer.from(res).toString("base64");
  // return `data:image/jpeg;base64,${base64String}`;

  //****Mockup FETCH*/

  const openAIPrompt = prompt; //this is the mockup
  return base64; //mock
});
