import { SwitchTransition, CSSTransition } from "react-transition-group";
import "./style.scss";
import { useLocation, useOutlet } from "react-router-dom";

const Content = () => {
  const currentOutlet = useOutlet();
  const location = useLocation();

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition key={location.pathname} timeout={300} classNames="page">
        {currentOutlet}
      </CSSTransition>
    </SwitchTransition>
  );
};

export default Content;
