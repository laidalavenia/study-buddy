"use client";

import { useChat } from "@ai-sdk/react";
import { Send, Loader2, ListPlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MessageBubble } from "./message-bubble";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function ChatInterface({
  initialInput = "",
  onClearInput,
}: {
  initialInput?: string;
  onClearInput?: () => void;
}) {
  const { messages, status, sendMessage } = useChat();
  
  const [input, setInput] = useState(initialInput || "");
  const isLoading = status === "streaming" || status === "submitted";

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e?: any) => {
    e?.preventDefault?.();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialInput && initialInput !== "") {
      setInput(initialInput);
      if (onClearInput) onClearInput();
    }
  }, [initialInput, onClearInput]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] md:h-full border rounded-xl overflow-hidden bg-background shadow-sm">
      <div className="border-b p-4 min-h-[64px] flex items-center bg-muted/30">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <ListPlus className="w-5 h-5 text-primary" />
          Study Session
        </h2>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-2 scroll-smooth"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 px-4">
            <div className="w-16 h-16 bg-primary/10 flex items-center justify-center rounded-3xl">
              <span className="text-4xl">📚</span>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-2xl tracking-tight">How can I help you study?</h3>
              <p className="text-muted-foreground text-sm max-w-sm">
                Ask me to explain a concept, summarize text, or generate a quiz to test your knowledge.
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => {
            const textContent = message.parts
              ? message.parts.filter((p: any) => p.type === "text").map((p: any) => p.text).join("\n")
              : "";

            return (
              <MessageBubble
                key={message.id}
                role={message.role as any}
                content={textContent}
              />
            );
          })
        )}
        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex w-full justify-start mb-6">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-background shadow-sm">
                <Loader2 size={18} className="animate-spin text-muted-foreground" />
              </div>
              <div className="px-5 py-3.5 rounded-2xl bg-muted text-muted-foreground border rounded-tl-none animate-pulse">
                Thinking...
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-background border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          className="flex items-end gap-2"
        >
          <div className="relative flex-1">
            <Textarea
              className="resize-none min-h-[60px] max-h-[200px] w-full pr-12 rounded-xl py-3 px-4 outline-none focus-visible:ring-1 border shadow-sm"
              placeholder="Ask anything or paste text..."
              value={input || ""}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              rows={1}
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading || !(input || "").trim()}
            className="h-[60px] w-[60px] rounded-xl shrink-0 transition-transform active:scale-95"
            size="icon"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
