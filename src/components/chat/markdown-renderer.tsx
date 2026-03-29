import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-sm dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 max-w-none break-words text-[15px]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          ul: ({ node, ...props }) => <ul className="list-disc pl-5 my-2" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-5 my-2" {...props} />,
          li: ({ node, ...props }) => <li className="my-1" {...props} />,
          h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-6 mb-3" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-xl font-bold mt-5 mb-3" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-lg font-bold mt-4 mb-2" {...props} />,
          p: ({ node, ...props }) => <p className="mb-4 last:mb-0" {...props} />,
          a: ({ node, ...props }) => <a className="text-primary tracking-tight font-medium hover:underline" {...props} />,
          blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4" {...props} />,
          code: ({ node, className, children, ...props }: any) => {
            const inline = !className?.includes('language-');
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <div className="rounded-xl overflow-hidden border bg-zinc-950 dark:bg-zinc-900 my-4 shadow-sm">
                <div className="flex items-center px-4 py-2 text-xs font-mono text-zinc-400 bg-zinc-900 border-b border-zinc-800">
                  {match[1]}
                </div>
                <div className="p-4 overflow-x-auto text-zinc-50">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </div>
              </div>
            ) : (
              <code className="bg-muted px-1.5 py-0.5 rounded-md text-[0.85em] font-mono text-foreground" {...props}>
                {children}
              </code>
            );
          },
          pre: ({ node, ...props }) => <pre className="m-0" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
