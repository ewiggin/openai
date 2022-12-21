import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "https://deno.land/x/fresh@1.1.2/server.ts";
import openaiService from "../services/openai.service.ts";

export const handler: Handlers<any> = {
  async POST(req, ctx) {
    const formData = await req.formData();
    const prompt = formData.get("prompt");

    let response: any = { data: {} };
    if (prompt) {
      try {
        response = await openaiService().createImage({
          prompt: prompt.toString(),
          n: 1,
          size: "512x512",
          response_format: "url",
        });

        if (response.error) {
          throw new Error("bad request");
        }

        return await ctx.render(response);
      } catch (error) {
        console.log(error);
      }
    }

    return await ctx.render(response);
  },
};

export default function Home(props: PageProps<any>) {
  const img = props?.data?.data ? props.data.data[0].url : "/logo.svg";
  return (
    <>
      <Head>
        <title>Image creator</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-lg text-center">
            <h1 class="text-2xl font-bold sm:text-3xl">Genera una imagen!</h1>

            <p class="mt-4 text-gray-500">
              Usando la API de OpenAI genera la imagen a partir de un prompt.
            </p>
          </div>

          <form action="" method="post" class="mx-auto mt-8 mb-0 max-w-md space-y-4">
            <div>
              <label for="prompt" class="sr-only">Prompt</label>

              <div class="relative">
                <input
                  type="text"
                  name="prompt"
                  class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                  placeholder="Introduce una descripción concisa"
                />

                <span class="absolute inset-y-0 right-4 inline-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <button
                type="submit"
                class="ml-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
              >
                Generar imagen
              </button>
            </div>
          </form>
        </div>
        <div className="mx-auto flex justify-center">
          <img
            src={img}
            alt="the fresh logo: a sliced lemon dripping with juice"
          />
        </div>
      </div>
    </>
  );
}
