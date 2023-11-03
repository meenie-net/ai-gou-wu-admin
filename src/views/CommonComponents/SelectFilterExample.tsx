import { Card } from "@blueprintjs/core";
import SelectFilter, {
  ISelectFilterResult,
  ISelectFilter,
} from "../../components/SelectFilter";
import { useState } from "react";

const SelectFilterExample = () => {
  const options: ISelectFilter[] = [
    {
      title: "部门",
      key: "department",
      multiple: true,
      options: [
        {
          value: "sales",
          label: "销售部",
          icon: "shop",
        },
        {
          value: "back",
          label: "后勤部",
          icon: "clean",
        },
        {
          value: "eaar",
          label: "事业部",
          icon: "shop",
        },
      ],
    },
    {
      title: "权限",
      key: "permission",
      multiple: false,
      options: [
        {
          value: "admin",
          label: "管理员",
          icon: "user",
        },
        {
          value: "superAdmin",
          label: "超级管理员",
          icon: "mugshot",
        },
        {
          value: "sales",
          label: "普通",
          icon: "new-person",
        },
      ],
    },
  ];
  const [res, setRes] = useState({});
  const handleChange = (result: ISelectFilterResult) => {
    setRes(result);
  };
  return (
    <Card className="h-full">
      <SelectFilter options={options} onChange={handleChange} />
      <pre className="mt-4">结果：{JSON.stringify(res)}</pre>
    </Card>
  );
};

export default SelectFilterExample;
