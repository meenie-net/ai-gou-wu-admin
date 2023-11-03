import {
  Checkbox,
  CheckboxProps,
  FormGroup,
  FormGroupProps,
} from "@blueprintjs/core";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

const EnhancedCheckBoxGroup = (props: {
  controllerConfig: UseControllerProps<FieldValues, any>;
  formgroupProps: FormGroupProps;
  childrenList: CheckboxProps[];
}) => {
  const { controllerConfig, formgroupProps, childrenList } = props;
  const { field } = useController(controllerConfig);
  const handleChange = (key: string) => {
    const newValue = new Set(field.value);
    if (newValue.has(key)) {
      newValue.delete(key);
    } else {
      newValue.add(key);
    }
    field.onChange(Array.from(newValue));
  };
  return (
    <FormGroup {...formgroupProps}>
      {childrenList.map((checkbox: CheckboxProps) => (
        <Checkbox
          {...checkbox}
          checked={
            field.value.findIndex(
              (value: string) => value === checkbox.label
            ) !== -1
          }
          key={checkbox.label}
          onChange={() => handleChange(checkbox.label!)}
          indeterminate={false}
        />
      ))}
    </FormGroup>
  );
};

export default EnhancedCheckBoxGroup;
