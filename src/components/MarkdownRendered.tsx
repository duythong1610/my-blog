"use client";
/* eslint @typescript-eslint/no-var-requires: "off" */
import { slugify } from "@/utils/slug";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { IoMdCheckmark, IoMdCopy } from "react-icons/io";
import ReactMarkdown from "react-markdown";

// Interface for heading structure
interface Heading {
  id: string;
  text: string;
  level: number;
}

const getPlainTextFromChildren = (children: React.ReactNode): string => {
  if (typeof children === "string") {
    return children;
  }

  if (Array.isArray(children)) {
    return children.map((child) => getPlainTextFromChildren(child)).join("");
  }

  if (children && typeof children === "object" && "props" in children) {
    return getPlainTextFromChildren(children.props.children);
  }

  return "";
};

const removeMarkdownFormatting = (text: string): string => {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1") // Bold **text**
    .replace(/__(.*?)__/g, "$1") // Bold __text__
    .replace(/\*(.*?)\*/g, "$1") // Italic *text*
    .replace(/_(.*?)_/g, "$1") // Italic _text_
    .replace(/`(.*?)`/g, "$1") // Code `text`
    .trim();
};

const generateIdFromCode = (codeString: string) => {
  return btoa(codeString).slice(0, 10); // Mã hóa base64 rồi cắt lấy 10 ký tự đầu
};

// Updated MarkdownRenderer with heading extraction
const MarkdownRenderer = ({
  content,
  onHeadingsExtracted,
}: {
  content?: string;
  onHeadingsExtracted?: (headings: Heading[]) => void;
}) => {
  const [SyntaxHighlighter, setSyntaxHighlighter] = useState<any>(null);
  const [generatedIds, setGeneratedIds] = useState<Record<string, string>>({});
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    import("react-syntax-highlighter").then((mod) => {
      setSyntaxHighlighter(() => mod.Prism);
    });
  }, []);

  // Extract headings from markdown on component mount

  useEffect(() => {
    if (content && onHeadingsExtracted) {
      const headings: Heading[] = [];
      // Match heading patterns in markdown (## Heading)
      const regex = /^(#{1,6})\s+(.+)$/gm;
      let matches;

      // Create mapping of ids
      const newGeneratedIds: Record<string, string> = {};

      while ((matches = regex.exec(content)) !== null) {
        const level = matches[1].length;
        // Only capture h2 and h3 headings
        if (level === 2 || level === 3) {
          const rawText = matches[2].trim();
          const text = removeMarkdownFormatting(rawText);

          // Create a consistent ID based on the text content
          const id = slugify(text);
          newGeneratedIds[text] = id;

          headings.push({
            id,
            text,
            level: level,
          });
        }
      }

      setGeneratedIds(newGeneratedIds);
      onHeadingsExtracted(headings);
    }
  }, [content]);

  const handleCopy = (blockId: string) => {
    setCopiedStates(() => ({ [blockId]: true }));
  };

  if (!SyntaxHighlighter) return <div>Loading code highlighter...</div>;

  return (
    <div className="mx-auto p-6 rounded-lg">
      <ReactMarkdown
        components={{
          h1: ({ children, ...props }) => {
            // Extract plain text from potentially complex children structure
            const plainText = getPlainTextFromChildren(children);

            // Use our generated ID from the extraction phase
            const id = generatedIds[plainText] || slugify(plainText);

            return (
              <h1
                id={id}
                {...props}
                className="text-3xl font-bold my-4 pt-4  transition-colors duration-500"
              >
                {children}
              </h1>
            );
          },
          h2: ({ children, ...props }) => {
            // Extract plain text from potentially complex children structure
            const plainText = getPlainTextFromChildren(children);

            // Use our generated ID from the extraction phase
            const id = generatedIds[plainText] || slugify(plainText);

            return (
              <h2
                id={id}
                {...props}
                className="text-2xl font-bold my-4 pt-4 transition-colors duration-500"
              >
                {children}
              </h2>
            );
          },
          h3: ({ children, ...props }) => {
            // Extract plain text from potentially complex children structure
            const plainText = getPlainTextFromChildren(children);

            const id = generatedIds[plainText] || slugify(plainText);

            return (
              <h3
                id={id}
                {...props}
                className="text-xl font-bold my-4 pt-4 transition-colors duration-500"
              >
                {children}
              </h3>
            );
          },
          blockquote: ({ children, ...props }) => {
            return (
              <blockquote
                {...props}
                className="border-l-[6px] border-purple-500 px-4 py-3  bg-gray-100 dark:bg-[#222] italic text-lg font-semibold my-6 rounded-md"
              >
                <div className="blockquote-content [&>p]:mb-0">{children}</div>
              </blockquote>
            );
          },

          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const codeString = String(children).replace(/\n$/, "");
            const id = generateIdFromCode(codeString);

            return match ? (
              <div className="relative">
                <SyntaxHighlighter
                  wrapLongLines
                  showLineNumbers
                  style={
                    require("react-syntax-highlighter/dist/esm/styles/prism/dracula")
                      .default
                  }
                  language={match[1]}
                  PreTag="div"
                  className="rounded-lg !pt-10 custom-scrollbar"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>

                <div className="">
                  <span className="absolute top-1 left-1 bg-white dark:bg-[#222] px-2 rounded-md">
                    {match[1]}
                  </span>
                  {
                    //@ts-ignore
                    <CopyToClipboard
                      text={codeString}
                      onCopy={() => handleCopy(id)}
                    >
                      <button className="absolute top-2 right-2  p-1 bg-gray-800 text-white rounded-full hover:bg-purple-600">
                        {copiedStates[id] ? (
                          <IoMdCheckmark className="text-lg text-green-400" />
                        ) : (
                          <IoMdCopy className="text-lg" />
                        )}
                      </button>
                    </CopyToClipboard>
                  }
                </div>
              </div>
            ) : (
              <code
                className="bg-gray-800 text-pink-400 px-1 rounded"
                {...props}
              >
                {children}
              </code>
            );
          },
          p({ children }) {
            return <p className="mb-4 leading-[1.8]">{children}</p>;
          },
          ul({ children }) {
            return <ul className="leading-[1.8] list-disc pl-5">{children}</ul>;
          },
          img({ children, ...props }) {
            return (
              <img className="mx-auto" {...props}>
                {children}
              </img>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
