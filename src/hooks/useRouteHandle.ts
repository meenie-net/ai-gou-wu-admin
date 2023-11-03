import { useMatches } from "react-router-dom";

export const useRouteHandle = () => {
  const matches = useMatches();
  const { handle } = matches[matches.length - 1];
  return handle as unknown as {
    icon: string;
    url: string;
    title: string;
    name: string;
    target: "_blank" | "_self" | "_parent";
  };
};
