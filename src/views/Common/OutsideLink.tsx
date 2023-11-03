import { Card } from "@blueprintjs/core";
import { useRouteHandle } from "../../hooks/useRouteHandle";

const OutsideLink = () => {
  const routeHandle = useRouteHandle();
  return (
    <Card className="h-full text-center">
      这是外链
      <a
        href={routeHandle.url}
        target={routeHandle.target}
        className="bg-slate-200 text-lg font-bold text-orange-900 underline hover:bg-slate-800 hover:text-orange-300"
      >
        {routeHandle.title}
      </a>
      的链接
    </Card>
  );
};

export default OutsideLink;
