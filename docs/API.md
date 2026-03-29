# 🔌 API Documentation

This document describes the primary serverless endpoints that power the AI Study Buddy application.

## 1. Chat Completion Endpoint
**Path:** `/api/chat`
**Method:** `POST`

This endpoint receives the chat history from the interface and hooks directly into the Groq API.

### Payload Structure:
```json
{
  "messages": [
    { "role": "user", "content": "Explain Newton's first law." }
  ]
}
```

### Response:
It returns a `DataStreamResponse` (content-type: `text/event-stream`). The chunks follow Vercel's protocol, beginning with `"0:"` for text chunks.

---

## 2. Quiz Generation Endpoint
**Path:** `/api/quiz`
**Method:** `POST`

This endpoint utilizes `generateObject` which strictly conforms LLM outputs to a predefined `Zod` JSON schema.

### Payload Structure:
```json
{
  "topic": "The Solar System"
}
```

### Execution Details:
1. The endpoint validates inputs.
2. It sends a structured schema requiring:
   - Mix of `multiple-choice` and `short-answer`.
   - A `question` string.
   - `options` array (empty `[]` for short answer).
   - `correctAnswer` and `explanation`.
3. Returns a standardized `JSON` object. If rate-limited, it gracefully falls back to a 500 status code with a standard JSON error message response.
