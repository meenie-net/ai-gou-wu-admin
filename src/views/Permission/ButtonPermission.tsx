import { Button, Card, ControlGroup, FormGroup } from "@blueprintjs/core";
import { useButtonPermission } from "../../hooks/useButtonPermission";
import { useDispatch } from "react-redux";
import { fetchPermisson } from "../../stores/permission";
import { useEffect, useState } from "react";
const ButtonPermission = () => {
  const dispatch = useDispatch();

  const { BUTTONS, ready } = useButtonPermission({ name: "userList" });
  const [current, setCurrent] = useState("admin");
  useEffect(() => {
    dispatch(fetchPermisson(current));
  }, [current]);

  const handleChange = () => {
    setCurrent(current === "admin" ? "guest" : "admin");
  };
  return (
    <Card className="h-full">
      <Button
        icon="user"
        intent="warning"
        onClick={handleChange}
        loading={!ready}
      >
        点击切换权限
      </Button>
      <pre>{JSON.stringify(BUTTONS)}</pre>
      <FormGroup
        label={`当前权限路由：userList，当前用户按钮权限: ${
          ready ? current : "……"
        }`}
        className="mt-4"
      >
        <ControlGroup vertical={false}>
          {BUTTONS.add && (
            <Button icon="plus" intent="primary">
              Add
            </Button>
          )}
          {BUTTONS.delete && (
            <Button icon="delete" intent="danger">
              Delete
            </Button>
          )}
          {BUTTONS.edit && (
            <Button icon="edit" intent="warning">
              Edit
            </Button>
          )}
        </ControlGroup>
      </FormGroup>
    </Card>
  );
};

export default ButtonPermission;
