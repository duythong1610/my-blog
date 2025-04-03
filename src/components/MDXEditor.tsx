"use client";

import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  ChangeAdmonitionType,
  ChangeCodeMirrorLanguage,
  CodeToggle,
  ConditionalContents,
  CreateLink,
  DiffSourceToggleWrapper,
  frontmatterPlugin,
  InsertAdmonition,
  InsertCodeBlock,
  insertCodeBlock$,
  InsertFrontmatter,
  InsertImage,
  InsertSandpack,
  InsertTable,
  InsertThematicBreak,
  linkDialogPlugin,
  ListsToggle,
  MDXEditor,
  toolbarPlugin,
  UndoRedo,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  linkPlugin,
  imagePlugin,
  tablePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
} from "@mdxeditor/editor";

const MDXEditorComponent = ({ markdown, onChange }: any) => {
  return (
    <MDXEditor
      markdown={markdown}
      onChange={onChange}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        frontmatterPlugin(),
        imagePlugin(),
        tablePlugin(),
        codeBlockPlugin({
          defaultCodeBlockLanguage: "js",
        }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            js: "JavaScript",
            jsx: "JavaScript JSX",
            ts: "TypeScript",
            tsx: "TypeScript JSX",
            html: "HTML",
            css: "CSS",
            php: "PHP",
            python: "Python",
            java: "Java",
            ruby: "Ruby",
            go: "Go",
            rust: "Rust",
            c: "C",
            cpp: "C++",
            csharp: "C#",
            json: "JSON",
            markdown: "Markdown",
            yaml: "YAML",
            bash: "Bash",
            plain: "Plain Text",
          },
        }),
        toolbarPlugin({
          toolbarClassName: "my-classname",
          toolbarContents: () => (
            <>
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <BlockTypeSelect />
              <CodeToggle />
              <CreateLink />
              <InsertCodeBlock />
              <InsertAdmonition />
              <InsertFrontmatter />
              <InsertImage />
              <InsertSandpack />
              <InsertTable />

              <ConditionalContents
                options={[
                  {
                    when: (editor) => editor?.editorType === "codeblock",
                    contents: () => <ChangeCodeMirrorLanguage />,
                  },
                  {
                    when: (editor) => editor?.editorType === "sandpack",
                    contents: () => <ChangeCodeMirrorLanguage />,
                  },
                ]}
              />
            </>
          ),
        }),
      ]}
      className="border border-gray-300 rounded-md p-4"
    />
  );
};

export default MDXEditorComponent;
