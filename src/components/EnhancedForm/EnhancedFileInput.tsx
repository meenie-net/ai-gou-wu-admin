import {
  FormGroup,
  FormGroupProps,
  FileInputProps,
  FileInput,
} from "@blueprintjs/core";
import { FormEvent } from "react";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

const EnhancedFileInput = (props: {
  controllerConfig: UseControllerProps<FieldValues, any>;
  formgroupProps: FormGroupProps;
  childrenProps: FileInputProps;
}) => {
  const { controllerConfig, formgroupProps, childrenProps } = props;
  const {
    field,
    fieldState: { error },
  } = useController(controllerConfig);
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    console.log("e.target", e.target.value!);
    // field.onChange(value);
  };

  return (
    <FormGroup
      {...formgroupProps}
      helperText={error?.message ? error?.message : formgroupProps.helperText}
      intent={field.value ? (error ? "danger" : "success") : "none"}
    >
      <FileInput {...childrenProps} onInputChange={handleChange} />
    </FormGroup>
  );
};

export default EnhancedFileInput;
