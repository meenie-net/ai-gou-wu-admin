import { Card, TreeNodeInfo } from "@blueprintjs/core";
import TreeFilter, { ITreeFilterResult } from "../../components/TreeFilter";

const TreeFilterExample = () => {
  /* tslint:disable:object-literal-sort-keys so childNodes can come last */
  const INITIAL_STATE: TreeNodeInfo[] = [
    {
      id: 0,
      label: "总公司",
    },
    {
      id: 1,
      label: "上海分公司",
      childNodes: [
        {
          id: 10,
          label: "销售部",
        },
        {
          id: 11,
          label: "事业部",
        },
        {
          id: 12,
          label: "人事部",
        },
      ],
    },
    {
      id: 2,
      label: "广州分公司",
    },
  ];

  const handleFilter = (res: ITreeFilterResult) => {
    console.log("res", res);
  };
  return (
    <Card className="h-full">
      <div className="flex">
        <div className="w-48">
          <TreeFilter options={INITIAL_STATE} onChange={handleFilter} />
        </div>
        <div className="w-48">
          <TreeFilter
            options={INITIAL_STATE}
            onChange={handleFilter}
            multiple
          />
        </div>
      </div>
    </Card>
  );
};

export default TreeFilterExample;
