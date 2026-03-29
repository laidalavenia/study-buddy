import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const systemPrompt = `You are an AI Study Tutor. Explain concepts clearly and simply. Adjust difficulty based on user level. Provide examples when useful. Keep answers concise but helpful. If asked, generate quizzes with answers. Format your output using Markdown.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      const mockStream = new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder();
          const responseText = "Hello! It looks like you haven't set up your OpenAI API key yet. \n\nYou can generate one at [platform.openai.com/api-keys](https://platform.openai.com/api-keys). Once you have it, add it to a `.env.local` file like this:\n\n```\nOPENAI_API_KEY=your_key_here\n```\n\nRestart the development server, and I'll be ready to help you study!";
          
          const words = responseText.split(" ");
          for (let i = 0; i < words.length; i++) {
            await new Promise(r => setTimeout(r, 50));
            // Data stream Protocol: '0' for text chunk, followed by JSON string
            controller.enqueue(encoder.encode(`0:${JSON.stringify(words[i] + " ")}\n`));
          }
          // Note: End of sequence is automatically managed or we can omit it, 
          // but we will close the controller safely.
          controller.close();
        }
      });
      return new Response(mockStream, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    }

    const result = await streamText({
      model: openai('gpt-4o-mini'),
      system: systemPrompt,
      messages: messages.map((m: any) => {
        // Handle new AI SDK 6.x message format (parts) or previous format (content)
        const textContent = m.parts 
          ? m.parts.filter((p: any) => p.type === 'text').map((p: any) => p.text).join('\n')
          : m.content || '';
          
        return {
          role: m.role,
          content: textContent,
        };
      }),
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("AI chat error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate AI response" }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
