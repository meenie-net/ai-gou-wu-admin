import { OverlayProps } from "@blueprintjs/core";
import { Dispatch, useEffect, useState } from "react";

export type IUseOverlay = {
  props: OverlayProps;
  rest: {
    isDisplay: boolean;
    onOpen: () => void;
    setPayload: Dispatch<any>;
  };
  payload: any;
};

function useOverlay(initPayload?: any): IUseOverlay {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDisplay, setIsDisplay] = useState<boolean>(false);
  const [payload, setPayload] = useState(initPayload);
  const onOpen = () => {
    setIsDisplay(true);
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };
  const onClosed = () => {
    setIsOpen(false);
    setIsDisplay(false);
    setPayload(initPayload);
  };
  useEffect(() => {
    if (!open) setPayload(initPayload);
  }, [open]);

  return {
    props: {
      isOpen,
      onClose,
      onClosed,
    },
    rest: {
      isDisplay,
      onOpen,
      setPayload,
    },
    payload,
  };
}

export default useOverlay;
