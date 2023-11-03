import { Breadcrumbs2 } from "@blueprintjs/popover2";
import useBreadcrumbs from "../../../hooks/useBreadcrumbs";
import { useGlobalStore } from "../../../hooks/useStore";

const Breadcrumb = (props: { mode: "dark" | "light" }) => {
  const { mode } = props;
  const {
    setting: { showBreadcrumbs },
  } = useGlobalStore();
  const crumbs = useBreadcrumbs({ mode });
  return showBreadcrumbs ? (
    <div id="breadcrumbs">
      <Breadcrumbs2 className="select-none" items={crumbs} />
    </div>
  ) : null;
};

export default Breadcrumb;
