import {
  FormGroup,
  FormGroupProps,
  SliderProps,
  Slider,
} from "@blueprintjs/core";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

const EnhancedSlider = (props: {
  controllerConfig: UseControllerProps<FieldValues, any>;
  formgroupProps: FormGroupProps;
  childrenProps: SliderProps;
}) => {
  const { controllerConfig, formgroupProps, childrenProps } = props;
  const {
    field,
    fieldState: { error },
  } = useController(controllerConfig);
  const handleChange = (value: number) => {
    field.onChange(value);
  };

  return (
    <FormGroup
      {...formgroupProps}
      intent={field.value ? (error ? "danger" : "success") : "none"}
    >
      <Slider
        {...childrenProps}
        ref={field.ref}
        value={field.value}
        onChange={handleChange}
        intent={field.value ? (error ? "danger" : "success") : "none"}
      />
    </FormGroup>
  );
};

export default EnhancedSlider;
