import { mistral } from "@ai-sdk/mistral";
import { WikipediaClient } from '@agentic/wikipedia';
import { generateObject } from "ai";
import { z } from "zod";

export class WikiService {
  async getWikiData() {
    try {
      const { object } = await generateObject({
        model: mistral("pixtral-large-latest"),
        schema: z.object({
          recipe: z.object({
            name: z.string(),
            ingredients: z.array(
              z.object({ name: z.string(), amount: z.string() })
            ),
            steps: z.array(z.string()),
          }),
        }),
        prompt: "Generate a lasagna recipe.",
      });

      return object;
    } catch (error) {
      throw error;
    }
  }

  async getWikiDataWithWikipediaClient() {
    try {
      const wikiClient = new WikipediaClient();
      const data = await wikiClient.search({ query: "Lasagna" });
      return data;
    } catch (error) {
      throw error;
    }
  }
  // async getWikiDataWithWikipediaClientAndMistral() {
  //   try {
  //     const wikiClient = new WikipediaClient();
  //     const data = await wikiClient.getPageSummary({ title: "Lasagna" });
  //     const { object } = await generateObject({
  //       model: mistral("pixtral-large-latest"),
  //       schema: z.object({
  //         recipe: z.object({
  //           name: z.string(),
  //           ingredients: z.array(
  //             z.object({ name: z.string(), amount: z.string() })
  //           ),
  //           steps: z.array(z.string()),
  //         }),
  //       }),
  //       prompt: data,
  //     });

  //     return data;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
