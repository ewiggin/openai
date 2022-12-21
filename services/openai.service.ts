import { Configuration, OpenAIApi } from 'npm:openai@3.1.0';
const configuration = new Configuration({
    apiKey: Deno.env.get('openai-key'),
});

export default function (): OpenAIApi {
    return new OpenAIApi(configuration);
}