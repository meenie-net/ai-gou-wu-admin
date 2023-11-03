import {
  FormGroup,
  FormGroupProps,
  NumericInput,
  HTMLInputProps,
  NumericInputProps,
} from "@blueprintjs/core";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

const EnhancedNumericInput = (props: {
  controllerConfig: UseControllerProps<FieldValues, any>;
  formgroupProps: FormGroupProps;
  childrenProps: HTMLInputProps & NumericInputProps;
  onBeforeChange?: (value: number) => void;
}) => {
  const { controllerConfig, formgroupProps, childrenProps, onBeforeChange } =
    props;
  const {
    field,
    fieldState: { error },
  } = useController(controllerConfig);
  const handleChange = (value: number) => {
    onBeforeChange && onBeforeChange(value);
    field.onChange(value);
  };

  return (
    <FormGroup
      {...formgroupProps}
      helperText={error?.message ? error?.message : formgroupProps.helperText}
      intent={field.value ? (error ? "danger" : "success") : "none"}
    >
      <NumericInput
        {...childrenProps}
        inputRef={field.ref}
        value={field.value}
        onValueChange={handleChange}
      />
    </FormGroup>
  );
};

export default EnhancedNumericInput;
