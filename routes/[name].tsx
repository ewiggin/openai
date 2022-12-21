import { Handlers, PageProps } from "$fresh/server.ts";
import openaiService from "../services/openai.service.ts";

export const handler: Handlers<any> = {
  async GET(_req, ctx) {
    const response = await openaiService().createImage({
      prompt: `a person with name ${ctx.params.name}`,
      n: 1,
      size: '512x512',
      response_format: 'url'
    });

    return await ctx.render(response);
  },
};

export default function Greet(props: PageProps<any>) {
  return <div><img src={props.data.data[0].url} alt="generated image" /> {props.data[0].url}</div>;
}
