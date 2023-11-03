import { ReactNode, useEffect } from "react";
import { useUserStore } from "../hooks/useStore";
import { useLocation, useNavigate } from "react-router-dom";
import NProgress from "nprogress"; // 引入nprogress插件
import "nprogress/nprogress.css";

const RouteBeforeEach = ({ children }: { children: ReactNode }) => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();

  // todo
  // auth逻辑
  useEffect(() => {
    // 使用 NProgress
    NProgress.configure({ easing: "ease", speed: 1000 });
    NProgress.start();
    const timer = setTimeout(() => NProgress.done(), 300);
    return () => {
      clearTimeout(timer);
    };
  }, [location]);
  useEffect(() => {
    if (JSON.stringify(user) === "{}") {
      navigate("/login");
    }
  }, []);

  return JSON.stringify(user) === "{}" ? null : <>{children}</>;
};

export default RouteBeforeEach;
