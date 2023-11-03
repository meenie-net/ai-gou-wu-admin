import "./App.scss";
import { RouterProvider } from "react-router-dom";
import router from "./routers";
import { useEffect } from "react";
import { i18nAddResources } from "@wangeditor/editor";

function App() {
  useEffect(() => {
    const locales = import.meta.glob(`../public/locales/*/*.json`);
    for (const path in locales) {
      if (
        path === "../public/locales/zh/translation.json" ||
        path === "../public/locales/en/translation.json"
      )
        continue;
      locales[path]().then((locale) => {
        const lng = path
          .split("../public/locales/")[1]
          .split("/translation.json")[0];
        // 给编辑器添加新语言，如日语 ja
        i18nAddResources(lng, (locale as { [key: string]: object })["editor"]);
      });
    }
  }, []);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
