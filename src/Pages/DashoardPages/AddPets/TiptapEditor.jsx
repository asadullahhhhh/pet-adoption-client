import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

const TiptapEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write detailed pet information...",
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="border rounded-lg p-4 bg-white min-h-[200px]">
      {editor ? (
        <EditorContent editor={editor} />
      ) : (
        <p className="text-gray-400">Loading editor...</p>
      )}
    </div>
  );
};

export default TiptapEditor;
