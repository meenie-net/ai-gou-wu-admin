import { Button, Card } from "@blueprintjs/core";
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";
import { useGlobalStore } from "../../hooks/useStore";

const GuideExample = () => {
  const {
    layoutType,
    setting: { darkTheme },
  } = useGlobalStore();
  const handleStartGuide = () => {
    const driver: Driver = new Driver({
      allowClose: false,
      stageBackground: darkTheme
        ? "rgba(255,255,255,0.3)"
        : layoutType === "CLASSIC" || layoutType === "VERTICAL"
        ? "rgba(255,255,255,0.3)"
        : "#FFFFFF",
      doneBtnText: "结束",
      closeBtnText: "关闭",
      nextBtnText: "下一步",
      prevBtnText: "上一步",
      padding: 3,
    });

    const steps = [
      {
        element: "#open-icon",
        popover: {
          title: "菜单收起展开按钮",
          description: "点击以收起或展开菜单",
          position: "bottom",
        },
      },
      {
        element: "#breadcrumbs",
        popover: {
          title: "Breadcrumbs",
          description: "Breadcrumbs",
          position: "bottom",
        },
        // onNext: () => {
        //   // Prevent moving to the next step
        //   driver.preventMove();

        //   // Perform some action or create the element to move to
        //   // And then move to that element
        //   setTimeout(() => {
        //     driver.moveNext();
        //   }, 4000);
        // },
      },
      {
        element: "#global-search",
        popover: {
          title: "全局搜索",
          description: "全局搜索",
          position: "left",
        },
      },
      {
        element: "#i18n",
        popover: {
          title: "国际化",
          description: "国际化",
          position: "left",
        },
      },
      {
        element: "#full-screen",
        popover: {
          title: "全屏",
          description: "全屏",
          position: "left",
        },
      },
      {
        element: "#theme",
        popover: {
          title: "外观设置",
          description: "外观设置",
          position: "left",
        },
      },
      {
        element: "#message",
        popover: {
          title: "消息",
          description: "消息",
          position: "left",
        },
      },
    ];
    driver.defineSteps(steps);
    driver.start();
  };
  return (
    <Card className="h-full">
      <Button onClick={handleStartGuide}>点击开始引导</Button>
    </Card>
  );
};

export default GuideExample;
