import { useTranslation } from "react-i18next";

const Welcome = () => {
  const { t } = useTranslation();
  return (
    <div className="h-full text-center">
      <h1 className="text-2xl font-bold">{t("welcome")}</h1>
      <div className="my-4">
        <span className="px-4 font-serif text-6xl font-bold text-white bg-black">
          Mee Admin
        </span>
      </div>
      <div>
        <span className="font-serif text-2xl">
          Mee Admin is a <strong>relaxed</strong> and <strong>soft </strong>
          admin template with{" "}
          <a className="text-orange-400" href="https://blueprintjs.com/">
            blueprint
          </a>{" "}
          UI framework.
        </span>
      </div>
      <div>
        <span className="font-serif text-xl">
          Mee Admin是一个<strong>清爽</strong>，<strong>视觉效果舒适的</strong>
          后台模板，它使用了
          <a className="text-orange-400" href="https://blueprintjs.com/">
            blueprint
          </a>
          这个UI框架.
        </span>
      </div>
    </div>
  );
};

export default Welcome;
