import {
  FormGroup,
  FormGroupProps,
  InputGroup,
  InputGroupProps2,
} from "@blueprintjs/core";
import { handleStringChange } from "../../utils";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

const EnhancedInput = (props: {
  controllerConfig: UseControllerProps<FieldValues, any>;
  formgroupProps: FormGroupProps;
  childrenProps: InputGroupProps2;
  onBeforeChange?: (value: string) => void;
}) => {
  const { controllerConfig, formgroupProps, childrenProps, onBeforeChange } =
    props;
  const {
    field,
    fieldState: { error },
  } = useController(controllerConfig);
  const handleChange = handleStringChange((value) => {
    onBeforeChange && onBeforeChange(value);
    field.onChange(value);
    console.log("error", error);
  });
  return (
    <FormGroup
      {...formgroupProps}
      helperText={error?.message ? error?.message : formgroupProps.helperText}
      intent={field.value ? (error ? "danger" : "success") : "none"}
    >
      <InputGroup
        {...childrenProps}
        inputRef={field.ref}
        value={field.value}
        onChange={handleChange}
        intent={field.value ? (error ? "danger" : "success") : "none"}
      />
    </FormGroup>
  );
};

export default EnhancedInput;
