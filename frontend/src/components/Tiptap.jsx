import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import _ from "lodash";

// icons
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import CircleIcon from "@mui/icons-material/Circle";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import CodeIcon from "@mui/icons-material/Code";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import { useEffect } from "react";

const MenuBar = ({ setContent, setEditor }) => {
  const { editor } = useCurrentEditor();

  useEffect(() => {
    setEditor(editor);
  }, [editor, setEditor]);

  let debounceContent = _.debounce(function (content) {
    setContent(content);
  }, 1000);

  useEffect(() => {
    if (editor) {
      const getHtml = editor.getHTML();
      debounceContent(getHtml);
    }
  }, [editor, debounceContent]);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`tiptap-buttons ${
          editor.isActive("bold") ? "is-active bg-gray-400" : ""
        }`}
      >
        <FormatBoldIcon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`tiptap-buttons ${
          editor.isActive("italic") ? "is-active bg-gray-400" : ""
        }`}
      >
        <FormatItalicIcon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`tiptap-buttons ${
          editor.isActive("strike") ? "is-active bg-gray-400" : ""
        }`}
      >
        <FormatStrikethroughIcon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={`tiptap-buttons ${
          editor.isActive("code") ? "is-active bg-gray-400" : ""
        }`}
      >
        ``
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`tiptap-buttons ${
          editor.isActive("paragraph") ? "is-active bg-gray-400" : ""
        }`}
      >
        paragraph
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`tiptap-buttons ${
          editor.isActive("heading", { level: 1 })
            ? "is-active bg-gray-400"
            : ""
        }
        `}
      >
        <span className="font-bold">H1</span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`tiptap-buttons ${
          editor.isActive("heading", { level: 2 })
            ? "is-active bg-gray-400"
            : ""
        }
        `}
      >
        <span className="font-bold">H2</span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`tiptap-buttons ${
          editor.isActive("heading", { level: 3 })
            ? "is-active bg-gray-400"
            : ""
        }
        `}
      >
        <span className="font-bold">H3</span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`tiptap-buttons ${
          editor.isActive("heading", { level: 4 })
            ? "is-active bg-gray-400"
            : ""
        }
        `}
      >
        <span className="font-bold">H4</span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={`tiptap-buttons ${
          editor.isActive("heading", { level: 5 })
            ? "is-active bg-gray-400"
            : ""
        }
        `}
      >
        <span className="font-bold">H5</span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={`tiptap-buttons ${
          editor.isActive("heading", { level: 6 })
            ? "is-active bg-gray-400"
            : ""
        }
        `}
      >
        <span className="font-bold">H6</span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`tiptap-buttons ${
          editor.isActive("bulletlist") ? "is-active bg-gray-400" : ""
        }`}
      >
        <CircleIcon sx={{ fontSize: 10 }} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`tiptap-buttons ${
          editor.isActive("orderedlist") ? "is-active bg-gray-400" : ""
        }`}
      >
        <FormatListNumberedIcon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`tiptap-buttons ${
          editor.isActive("codeBlock") ? "is-active bg-gray-400" : ""
        }`}
      >
        <CodeIcon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`tiptap-buttons ${
          editor.isActive("blockqoute") ? "is-active bg-gray-400" : ""
        }`}
      >
        <span className="font-bold">“</span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="tiptap-buttons"
      >
        <HorizontalRuleIcon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className="border border-gray-400 py-[0.9px] px-2 rounded-md mx-2"
      >
        clear marks
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().clearNodes().run()}
        className="border border-gray-400 py-[0.9px] px-2 rounded-md mx-2"
      >
        clear nodes
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className="tiptap-buttons"
      >
        hard break
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="text-red-500 cursor-pointer tiptap-buttons"
      >
        <UndoIcon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="text-green-500 cursor-pointer tiptap-buttons"
      >
        <RedoIcon />
      </button>
    </div>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

const TipTap = ({ newContent, setContent, setEditor }) => {
  const editorProps = {
    attributes: {
      class:
        "prose prose-sm md:prose-lg lg:prose-xl max-h-[300px] min-h-[300px] overflow-y-scroll focus:outline-none border border-gray-500 w-full md:min-w-[70%] mx-auto p-4 rounded-md my-5",
    },
  };
  return (
    <EditorProvider
      slotBefore={<MenuBar setContent={setContent} setEditor={setEditor} />}
      extensions={extensions}
      content={newContent}
      editorProps={editorProps}
    ></EditorProvider>
  );
};

export default TipTap;
