import { Button, IconName, MaybeElement } from "@blueprintjs/core";
import { useEffect, useReducer } from "react";
export type ISelectFilterOption = {
  value: string;
  label: string;
  icon: IconName | MaybeElement;
};
export type ISelectFilter = {
  title: string;
  key: string;
  multiple: boolean;
  options: ISelectFilterOption[];
};

export type ISelectFilterResult = { [key: string]: Array<string> | string };
type SelectAction =
  | {
      type: "SELECT_SINGLE";
      payload: { item: ISelectFilter; option: ISelectFilterOption };
    }
  | {
      type: "SELECT_ALL";
      payload: { item: ISelectFilter };
    };
const SelectFilter = (props: {
  options: ISelectFilter[];
  onChange: (result: ISelectFilterResult) => void;
}) => {
  const { options, onChange } = props;

  // ------------------------- USE useState START ------------------------------
  // const [selected, setSelected] = useState<IFilterResult>(() => {
  //   const obj: IFilterResult = {};
  //   for (const key in options) {
  //     if (Object.prototype.hasOwnProperty.call(options, key)) {
  //       const element = options[key];
  //       element.multiple ? (obj[element.key] = []) : (obj[element.key] = "");
  //     }
  //   }
  //   return obj;
  // });
  // const handleSelectAll = (item: ISelectFilter) => {
  //   selected[item.key].length === item.options.length
  //     ? setSelected({
  //         ...selected,
  //         [item.key]: [],
  //       })
  //     : setSelected({
  //         ...selected,
  //         [item.key]: item.options.map((option) => option.value),
  //       });
  // };
  // const handleSelectSingle = (
  //   item: ISelectFilter,
  //   option: ISelectFilterOption
  // ) => {
  //   if (item.multiple) {
  //     // 多选
  //     const newData = selected[item.key] as string[];
  //     newData.includes(option.value)
  //       ? newData.splice(selected[item.key].indexOf(option.value), 1)
  //       : newData.push(option.value);
  //     setSelected({
  //       ...selected,
  //       [item.key]: newData,
  //     });
  //   } else {
  //     // 单选
  //     selected[item.key] === option.value
  //       ? setSelected({ ...selected, [item.key]: "" })
  //       : setSelected({ ...selected, [item.key]: option.value });
  //   }
  // };
  // ------------------------- USE useState END ------------------------------

  // ------------------------- USE useReducer START --------------------------
  const selectReducer = (state: ISelectFilterResult, action: SelectAction) => {
    const newState = JSON.parse(JSON.stringify(state));
    const { item } = action.payload;
    switch (action.type) {
      case "SELECT_SINGLE":
        if (item.multiple) {
          // 多选
          const newData = newState[item.key] as string[];
          newData.includes(action.payload.option.value)
            ? newData.splice(
                newState[item.key].indexOf(action.payload.option.value),
                1
              )
            : newData.push(action.payload.option.value);
          return {
            ...newState,
            [item.key]: newData,
          };
        } else {
          // 单选
          return newState[item.key] === action.payload.option.value
            ? { ...newState, [item.key]: "" }
            : { ...newState, [item.key]: action.payload.option.value };
        }
      case "SELECT_ALL":
        return newState[item.key].length === item.options.length
          ? {
              ...newState,
              [item.key]: [],
            }
          : {
              ...newState,
              [item.key]: item.options.map((option) => option.value),
            };
      default:
        return newState;
    }
  };
  const initState: ISelectFilterResult = {};
  for (const key in options) {
    if (Object.prototype.hasOwnProperty.call(options, key)) {
      const element = options[key];
      element.multiple
        ? (initState[element.key] = [])
        : (initState[element.key] = "");
    }
  }
  const [selected, dispatch] = useReducer(selectReducer, initState);
  const handleSelectAll = (item: ISelectFilter) => {
    dispatch({ type: "SELECT_ALL", payload: { item } });
  };
  const handleSelectSingle = (
    item: ISelectFilter,
    option: ISelectFilterOption
  ) => {
    dispatch({ type: "SELECT_SINGLE", payload: { item, option } });
  };
  // ------------------------- USE useReducer END ------------------------------

  useEffect(() => onChange(selected), [selected]);
  return (
    <div>
      {options
        ? options.map((item, i) => (
            <div key={i} className="mt-4 flex flex-wrap items-center">
              <span className="text-base">
                {item.title}（{item.multiple ? "多" : "单"}）：
              </span>
              {item.multiple && (
                <Button
                  className="mr-4 whitespace-nowrap rounded-full"
                  intent="primary"
                  outlined
                  active={
                    selected[item.key]
                      ? selected[item.key].length === item.options.length
                      : false
                  }
                  small
                  onClick={() => handleSelectAll(item)}
                >
                  全部
                </Button>
              )}
              {item.options.map((option, k) => (
                <Button
                  key={k}
                  className="mr-4 whitespace-nowrap rounded-full"
                  intent="primary"
                  outlined
                  active={
                    item.multiple
                      ? selected[item.key]
                        ? selected[item.key].includes(option.value)
                        : false
                      : option.value === selected[item.key]
                  }
                  small
                  icon={option.icon || "grid-view"}
                  onClick={() => handleSelectSingle(item, option)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          ))
        : null}
    </div>
  );
};

export default SelectFilter;
