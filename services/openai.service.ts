import { OpenAI } from "https://deno.land/x/openai_mini@0.2.0/mod.ts";

export default function (): OpenAI {
    return new OpenAI(Deno.env.get('openai-key') || '');
}