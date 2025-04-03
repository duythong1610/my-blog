"use client";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const markdownContent = `
## 2. Cách hoạt động:

Khi sử dụng \`useTransition\`, React sẽ cho phép các cập nhật bất đồng bộ được xử lý trong background (hay còn gọi là chạy nền) và sẽ không chặn các cập nhật UI quan trọng khác. Điều này giúp tránh tình trạng UI bị **"đóng băng"** khi thực hiện các tác vụ nặng nề.

\`\`\`javascript
const [isPending, startTransition] = useTransition()
\`\`\`

Như cấu trúc ở trên:

- \`isPending\`: Trả về **true** khi React đang xử lý các cập nhật bất đồng bộ.
- \`startTransition\`: Một hàm nhận vào một callback, bên trong callback này thực hiện các cập nhật trạng thái "non-urgent".
`;

export default function MarkdownRenderer({
  content = markdownContent,
}: {
  content?: string;
}) {
  return (
    <div className="mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                wrapLongLines
                showLineNumbers
                style={dracula}
                language={match[1]}
                PreTag="div"
                className="rounded-lg"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code
                className="bg-gray-800 text-pink-400 px-1 rounded"
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
