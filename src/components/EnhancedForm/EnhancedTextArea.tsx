import {
  FormGroup,
  FormGroupProps,
  TextAreaProps,
  TextArea,
} from "@blueprintjs/core";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { handleStringChange } from "../../utils";

const EnhancedTextArea = (props: {
  controllerConfig: UseControllerProps<FieldValues, any>;
  formgroupProps: FormGroupProps;
  childrenProps: TextAreaProps;
}) => {
  const { controllerConfig, formgroupProps, childrenProps } = props;
  const {
    field,
    fieldState: { error },
  } = useController(controllerConfig);
  const handleChange = handleStringChange((value: string) => {
    field.onChange(value);
  });

  return (
    <FormGroup
      {...formgroupProps}
      helperText={error?.message ? error?.message : formgroupProps.helperText}
      intent={field.value ? (error ? "danger" : "success") : "none"}
    >
      <TextArea
        {...childrenProps}
        growVertically={true}
        className="resize"
        inputRef={field.ref}
        value={field.value}
        onChange={handleChange}
      />
    </FormGroup>
  );
};

export default EnhancedTextArea;
