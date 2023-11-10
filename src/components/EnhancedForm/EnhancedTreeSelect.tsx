import {
  Button,
  ButtonProps,
  FormGroup,
  FormGroupProps,
} from "@blueprintjs/core";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { ReactNode, useState } from "react";
import { Popover2, Popover2Props } from "@blueprintjs/popover2";
import TreeFilter, { ITreeFilterProps } from "../TreeFilter";

const EnhancedTreeSelect = (props: {
  controllerConfig: UseControllerProps<FieldValues, any>;
  formgroupProps: FormGroupProps;
  childrenProps: {
    popoverProps?: Popover2Props;
    treeFilterProps: Omit<ITreeFilterProps, "onChange">;
    selectButtonProps: ButtonProps;
  };
  restChildren?: ReactNode;
}) => {
  const { controllerConfig, formgroupProps, childrenProps, restChildren } =
    props;
  const {
    field,
    fieldState: { error },
  } = useController(controllerConfig);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({ label: "" });
  const handleSelect = (nextState: boolean) => {
    setOpen(nextState);
  };
  const handleChange = (value: any) => {
    field.onChange(value.id);
    setSelected(value);
    setOpen(false);
  };

  return (
    <FormGroup
      {...formgroupProps}
      helperText={error?.message ? error?.message : formgroupProps.helperText}
      intent={field.value ? (error ? "danger" : "success") : "none"}
    >
      <Popover2
        {...childrenProps.popoverProps}
        isOpen={open}
        placement="bottom"
        minimal
        onInteraction={(state) => handleSelect(state)}
        interactionKind="click"
        content={
          <TreeFilter
            options={childrenProps.treeFilterProps.options}
            onChange={handleChange}
          />
        }
      >
        <Button
          {...childrenProps.selectButtonProps}
          rightIcon="caret-down"
          text={selected ? `${selected.label}` : "请选择"}
        />
      </Popover2>
      {restChildren}
    </FormGroup>
  );
};

export default EnhancedTreeSelect;
