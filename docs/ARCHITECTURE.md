# 🏛️ Architecture Overview

The Study Buddy app uses a highly modular and modern Next.js setup, taking full advantage of React Server Components (RSC) and standard client boundaries.

## Component Breakdown

1. **Client Interface (`src/components/chat/chat-interface.tsx`)**
   - The interactive portion of the application is wrapped in `"use client"`.
   - It utilizes the Vercel AI SDK's `useChat()` hook, which handles state management, streaming reconciliation, and history tracking automatically.
   - We extract text parts safely from `message.parts` due to changes in AI SDK v6.x where raw content was restructured.

2. **Server-Side API (`src/app/api/*`)**
   - We heavily rely on the `streamText` function from `ai` to natively pipe LLM results via the Server-Sent Events (SSE) data stream protocol.
   - Using `toUIMessageStreamResponse()` ensures the client-side `useChat()` hook can properly decode the chunked response and display it instantly without waiting for completion.

3. **Provider Layer**
   - Abstracted entirely by the `@ai-sdk/groq` adapter.
   - The application invokes the `groq('llama-3.3-70b-versatile')` model. This allows for near zero-latency study explanations and handles large contexts (like pasted PDF notes) effectively.

## UI Decisions
- We implemented **shadcn/ui** for accessible, customizable components (buttons, textareas, dialogs).
- Tailwind is used for raw layout logic, keeping the application lightweight.
- Dark Mode is integrated natively using `next-themes`.
