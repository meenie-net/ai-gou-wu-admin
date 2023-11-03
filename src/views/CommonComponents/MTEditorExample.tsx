import { Card } from "@blueprintjs/core";
import { IToolbarConfig, IEditorConfig } from "@wangeditor/editor";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import "@wangeditor/editor/dist/css/style.css";
import { useMTEditor } from "../../hooks/useMTEditor";
import i18n from "../../i18n";

const MTEditorExample = () => {
  const { editor, setEditor, html, setHtml } = useMTEditor({
    initialValue: "<p>hello</p>",
  });

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {}; // TS 语法
  // const toolbarConfig = { }                        // JS 语法

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    // TS 语法
    // const editorConfig = {                         // JS 语法
    placeholder: "请输入内容...",
  };

  return (
    <Card className="h-full">
      <div style={{ border: "1px solid #ccc", zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: "1px solid #ccc" }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) =>
            setHtml(editor.getHtml() + i18n.resolvedLanguage)
          }
          mode="default"
          style={{ height: "500px", overflowY: "hidden" }}
        />
      </div>
      <div style={{ marginTop: "15px" }}>{html}</div>
    </Card>
  );
};

export default MTEditorExample;
