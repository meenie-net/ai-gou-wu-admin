import {
  Button,
  NonIdealState,
  NonIdealStateIconSize,
} from "@blueprintjs/core";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const description = (
    <div>
      {`Your search didn't match any files.`}
      <br />
      Try searching for something else, or create a new file.
    </div>
  );
  const action = (
    <Button
      outlined
      onClick={() => navigate("/")}
      text="Go Home"
      icon="home"
      intent="primary"
    />
  );
  return (
    <div className="flex h-full items-center justify-center">
      <NonIdealState
        icon="issue"
        iconSize={NonIdealStateIconSize.STANDARD}
        title="No results"
        description={description}
        action={action}
        layout="vertical"
      />
    </div>
  );
};

export default NotFound;
