import {
  FormGroup,
  FormGroupProps,
  SwitchProps,
  Switch,
} from "@blueprintjs/core";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { handleBooleanChange } from "../../utils";

const EnhancedSwitch = (props: {
  controllerConfig: UseControllerProps<FieldValues, any>;
  formgroupProps: FormGroupProps;
  childrenProps: SwitchProps;
}) => {
  const { controllerConfig, formgroupProps, childrenProps } = props;
  const { field } = useController(controllerConfig);
  const handleChange = handleBooleanChange((value: boolean) => {
    field.onChange(value);
  });
  return (
    <FormGroup {...formgroupProps}>
      <Switch {...childrenProps} inputRef={field.ref} onChange={handleChange} />
    </FormGroup>
  );
};

export default EnhancedSwitch;
