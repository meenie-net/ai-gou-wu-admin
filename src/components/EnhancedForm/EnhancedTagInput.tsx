import {
  FormGroup,
  FormGroupProps,
  TagInputProps,
  TagInput,
  TagProps,
} from "@blueprintjs/core";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

const EnhancedTagInput = (props: {
  controllerConfig: UseControllerProps<FieldValues, any>;
  formgroupProps: FormGroupProps;
  childrenProps: TagInputProps;
}) => {
  const { controllerConfig, formgroupProps, childrenProps } = props;
  const {
    field,
    fieldState: { error },
  } = useController(controllerConfig);
  const handleChange = (values: React.ReactNode[]) => {
    console.log("values", values);
  };
  return (
    <FormGroup
      {...formgroupProps}
      intent={field.value ? (error ? "danger" : "success") : "none"}
    >
      <TagInput
        {...childrenProps}
        ref={field.ref}
        onChange={handleChange}
        tagProps={{
          intent: field.value ? (error ? "danger" : "success") : "none",
          large: (childrenProps.tagProps as TagProps).large || false,
          minimal: (childrenProps.tagProps as TagProps).minimal || true,
        }}
      />
    </FormGroup>
  );
};

export default EnhancedTagInput;
