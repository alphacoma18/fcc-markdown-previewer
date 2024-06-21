"use client";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { remark } from 'remark';
import HTML from 'remark-html';

export function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState(`# Welcome to the Markdown Previewer

This is a simple yet powerful tool that allows you to preview your Markdown content in real-time.

## Features:

- Support for all standard Markdown syntax
- Live preview of the rendered Markdown
- Responsive and adaptive layout
- Clean, minimalist design

To get started, simply start typing in the editor on the left. Your changes will be reflected instantly in the preview on the right.

Enjoy your Markdown experience`);
  const [html, setHtml] = useState('');

  useEffect(() => {
    (async () => {
      remark().use(HTML).process(markdown).then((file) => {
        setHtml(String(file));
      });
    })();
  }, [markdown]);

  return (
    <div className="flex flex-col h-screen w-full bg-slate-900 text-slate-200 md:flex-row">
      <div className="flex-1 flex flex-col border-b border-slate-700 p-6 md:border-b-0 md:border-r md:p-8">
        <Textarea
          value={markdown}
          id="editor"
          onChange={(e) => setMarkdown(e.currentTarget.value)}
          className="flex-grow resize-none bg-transparent text-base leading-relaxed focus:outline-none"
          placeholder="Start typing your Markdown here..."
        />
      </div>
      <div className="flex-1 flex flex-col p-6 md:p-8">
        <div className="prose prose-invert max-h-[45vh] md:max-h-full w-full overflow-auto">
          <div id="preview" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </div>
  );
}
