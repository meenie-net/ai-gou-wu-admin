import { IDomEditor, i18nChangeLanguage } from "@wangeditor/editor";
import i18n from "../i18n";
import { useState, useEffect } from "react";
import emitter, { EmitEventEnum } from "../utils/EventEmitter";

export const useMTEditor = (props: { initialValue: string }) => {
  const { initialValue } = props;
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null); // TS 语法
  // const [editor, setEditor] = useState(null)

  // 编辑器内容
  const [html, setHtml] = useState(initialValue);

  const initLanguage = () => {
    // 初始化编辑器语言
    i18nChangeLanguage(
      i18n.resolvedLanguage && i18n.resolvedLanguage !== "zh"
        ? i18n.resolvedLanguage
        : "zh-CN"
    );
  };
  initLanguage();

  const refreshLanguage = () => {
    editor?.blur();
    setTimeout(() => editor?.focus(), 0);
  };
  emitter.on(EmitEventEnum.LanguageChange, refreshLanguage);

  useEffect(() => {
    return () => {
      emitter.off(EmitEventEnum.LanguageChange, refreshLanguage);
    };
  }, []);

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);
  return { editor, setEditor, html, setHtml };
};
