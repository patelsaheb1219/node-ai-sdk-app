import { mistral } from "@ai-sdk/mistral";
import { generateText, tool } from "ai";
import { z } from "zod";
import { config } from "dotenv";

config();

const getWikiData = async () => {
  try {
    const { text, steps } = await generateText({
      model: mistral("pixtral-large-latest"),
      tools: {
        weather: tool({
          description: "Get the weather in a location",
          parameters: z.object({
            location: z
              .string()
              .describe("The location to get the weather for"),
          }),
          execute: async ({ location }) => {
            const data = await fetch(
              "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m"
            );
            const json = await data.json();
            return {
              location,
              data: json
            };
          }
        }),
      },
      maxSteps: 5, // allow up to 5 steps
      prompt: "What is the hourly weather in San Francisco?",
    });

    console.log("Generated text:", text);
  } catch (error) {
    throw error;
  }
};

getWikiData();
