# 🎓 AI Study Buddy

An intelligent, interactive, and responsive web application designed to help students study smarter. Powered by the **Groq API** (Llama 3 70B) and built with **Next.js 16**, this application offers real-time streaming chat, automatic quiz generation, and content summarization.

## ✨ Features

- **Real-Time Streaming Chat:** Instant, natural, and low-latency study-focused conversations using Groq's high-speed Llama 3 processor.
- **AI Quiz Generator:** Generates structured multiple-choice and short-answer quizzes based on your specific study topics using OpenAI structured output formats via the AI SDK.
- **Responsive UI/UX:** A beautifully designed interface using **Tailwind CSS** and **shadcn/ui**, featuring modern dark mode support and micro-animations.
- **Smart Formatting:** Full Markdown support for code blocks, tables, and ordered lists inside the chat, making it perfect for studying complex technical topics.

## 🛠️ Technology Stack

- **Framework:** [Next.js (App Router)](https://nextjs.org/)
- **UI Library:** [React 19](https://react.dev/)
- **AI Integration:** [Vercel AI SDK 6.x](https://sdk.vercel.ai/docs) (`@ai-sdk/react`, `ai`)
- **AI Provider:** [Groq API](https://groq.com) (`@ai-sdk/groq` using `llama-3.3-70b-versatile`)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18 or higher) installed on your machine.

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/study-buddy.git
cd study-buddy
npm install
```

### 2. Set Up Environment Variables
Create a file named `.env.local` in the root directory. You will need a free API key from Groq.
You can get one from the [Groq Console](https://console.groq.com/keys).

Paste the following into your `.env.local` file:
```env
# Get a free API Key at: https://console.groq.com/keys
GROQ_API_KEY=gsk_your_api_key_here
```

### 3. Run the Application
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to interact with your AI Study Buddy!

## 📂 Project Structure Overview

- `src/app/page.tsx`: The main landing page / chat dashboard.
- `src/app/api/chat/route.ts`: API endpoint that streams chat completions from Groq to the client UI.
- `src/app/api/quiz/route.ts`: API endpoint that uses `generateObject` and Zod to force the AI to return well-structured JSON quizzes.
- `src/components/chat/`: Contains the customized logic for `ChatInterface` and `MessageBubble`.
- `docs/`: Deeper overview of the project's [Architecture](docs/ARCHITECTURE.md) and [APIs](docs/API.md).

## 💡 Troubleshooting
- **No Response in UI:** Ensure your `.env.local` is fully populated. If you receive an error `429 Too Many Requests`, you may have momentarily hit the API rate limit—wait 60 seconds and try again.
- **Blank Screen on Run:** Check standard terminal logs for any missing module installations.

## 📝 License
This project is open-source and free to adapt.
