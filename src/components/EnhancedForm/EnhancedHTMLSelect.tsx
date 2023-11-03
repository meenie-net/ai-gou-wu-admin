import {
  FormGroup,
  FormGroupProps,
  HTMLSelectProps,
  HTMLSelect,
} from "@blueprintjs/core";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { handleStringChange } from "../../utils";
import { ReactNode } from "react";

const EnhancedHTMLSelect = (props: {
  controllerConfig: UseControllerProps<FieldValues, any>;
  formgroupProps: FormGroupProps;
  childrenProps: HTMLSelectProps;
  restChildren?: ReactNode;
}) => {
  const { controllerConfig, formgroupProps, childrenProps, restChildren } =
    props;
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
      <HTMLSelect
        {...childrenProps}
        ref={field.ref}
        value={field.value}
        onChange={handleChange}
      />
      {restChildren}
    </FormGroup>
  );
};

export default EnhancedHTMLSelect;
