import LayoutClassic from "./LayoutClassic";
import { ReactElement, Suspense } from "react";
import { HotkeysProvider, Spinner, SpinnerSize } from "@blueprintjs/core";
import LayoutColumn from "./LayoutColumn";
import LayoutTransverse from "./LayoutTransverse";
import LayoutVertical from "./LayoutVertical";
import "./style.scss";
import GlobalAlert from "../components/GlobalAlert";
import { AliveScope } from "react-activation";
import { useGlobalStore } from "../hooks/useStore";

export type TLayout = "CLASSIC" | "COLUMN" | "VERTICAL" | "TRANSVERSE";

const LAYOUT_BASE: Record<TLayout, ReactElement> = {
  CLASSIC: <LayoutClassic></LayoutClassic>,
  COLUMN: <LayoutColumn></LayoutColumn>,
  VERTICAL: <LayoutVertical></LayoutVertical>,
  TRANSVERSE: <LayoutTransverse></LayoutTransverse>,
};

export const Layout = () => {
  const {
    layoutType,
    setting: { darkTheme },
  } = useGlobalStore();
  return (
    <AliveScope>
      <Suspense
        fallback={
          <div className="flex h-full items-center justify-center">
            <Spinner size={SpinnerSize.LARGE} />
          </div>
        }
      >
        <HotkeysProvider>
          <div className={`h-full w-full ${darkTheme ? "bp4-dark" : ""}`}>
            {LAYOUT_BASE[layoutType]}
            <GlobalAlert isOpen={false} />
          </div>
        </HotkeysProvider>
      </Suspense>
    </AliveScope>
  );
};
