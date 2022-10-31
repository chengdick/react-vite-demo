import { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import Button from "antd/es/button";
import { LiveProvider, LiveError, LivePreview } from "react-live";
import "antd/dist/antd.css";
import { download } from "../../utils/const";
import "./index.less";
import { Space } from "antd";
export default function HomePage() {
  const editorRef: any = useRef();
  const [data, setData] = useState(`
() => (
    <div>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="danger">Danger</Button>
        <Button type="link">Link</Button>
    </div>
)
  `);
  const transSug = (items: any) => {
    const newSug = [...items, "and", "or", "(", ")"].map((item) => {
      return {
        label: item, // 显示的label
        detail: !items.includes(item) ? "符号" : "字段", // 描述
        insertText: item, // 选择后插入的value
        icon: items.includes(item),
      };
    });
    return newSug;
  };
  const editorDidMount = (editor: any, monaco: any) => {
    const suggestions = transSug(["代码提示"]);
    if (suggestions.length) {
      editorRef.current = editor;

      monaco.languages.registerCompletionItemProvider("javascript", {
        provideCompletionItems() {
          return {
            suggestions: suggestions.map((item) => ({
              ...item,
              kind: item.icon
                ? monaco.languages.CompletionItemKind.Variable // 图标
                : null,
            })),
          };
        },
        triggerCharacters: [" "], // 触发代码提示的关键字，ps：可以有多个
      });
    }
  };

  return (
    <div className="code">
      <div>
        <Space>
          <Button
            type="primary"
            onClick={() => {
              setData(editorRef.current.getValue());
            }}
          >
            运行
          </Button>
          <Button
            type="primary"
            onClick={() => {
              download(editorRef.current.getValue());
            }}
          >
            下载
          </Button>
        </Space>
      </div>
      <div className="code-content">
        <div style={{ width: "50%" }}>
          <Editor
            height="90vh"
            defaultLanguage="javascript"
            defaultValue={data}
            onMount={editorDidMount}
          />
        </div>
        <LiveProvider scope={{ Button }} code={data}>
          <LiveError />
          <LivePreview />
        </LiveProvider>
      </div>
    </div>
  );
}
