import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

export const maxDuration = 30;

const quizSchema = z.object({
  questions: z.array(z.object({
    type: z.enum(["multiple-choice", "short-answer"]),
    question: z.string().describe("The text of the question."),
    options: z.array(z.string()).optional().describe("Provide 4 options if type is multiple-choice. Otherwise omit."),
    correctAnswer: z.string().describe("The exact correct option text for multiple-choice, or a brief sample correct answer for short-answer."),
    explanation: z.string().describe("A brief explanation of why the answer is correct.")
  }))
});

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    const { object } = await generateObject({
      model: openai('gpt-4o-mini'),
      system: `You are an AI Study Tutor generating a high-quality quiz.
The quiz should contain a mix of multiple-choice and short-answer questions (about 3-5 total).
Make sure multiple-choice options are distinct and plausible.
Ensure the correct answer exactly matches one of the options for multiple-choice.`,
      prompt: `Generate a quiz about the following topic or text: \n\n${topic}`,
      schema: quizSchema,
    });

    return new Response(JSON.stringify(object), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("AI quiz error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate quiz" }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
