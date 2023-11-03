import { useGlobalStore } from "../../../hooks/useStore";

const Footer = (props: { className?: string }) => {
  const { className } = props;
  const {
    setting: { showFooter },
  } = useGlobalStore();
  return showFooter ? (
    <div className={className + " custom-border-t"}>Footer</div>
  ) : null;
};

export default Footer;
