"use client";

import { useState } from "react";
import { ChatInterface } from "@/components/chat/chat-interface";
import { StudyTools } from "@/components/sidebar/study-tools";
import { QuizModal } from "@/components/quiz/quiz-modal";

export default function Home() {
  const [chatInput, setChatInput] = useState("");
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  const handleStudyAction = (prompt: string) => {
    setChatInput(prompt);
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-3.5rem)] w-full max-w-7xl mx-auto p-4 md:p-6 gap-6">
      <div className="order-2 md:order-1 flex-1 min-w-0">
        <ChatInterface
          initialInput={chatInput}
          onClearInput={() => setChatInput("")}
        />
      </div>
      <aside className="order-1 md:order-2 w-full md:w-80 shrink-0 h-[300px] md:h-auto">
        <StudyTools
          onAction={handleStudyAction}
          onOpenQuizModal={() => setIsQuizModalOpen(true)}
        />
      </aside>

      <QuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
      />
    </div>
  );
}
