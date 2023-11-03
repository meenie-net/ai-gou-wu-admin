import {
  FormGroup,
  FormGroupProps,
  Radio,
  RadioGroup,
  RadioGroupProps,
  RadioProps,
} from "@blueprintjs/core";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { handleStringChange } from "../../utils";

const EnhancedRadioGroup = (props: {
  controllerConfig: UseControllerProps<FieldValues, any>;
  formgroupProps: FormGroupProps;
  childrenProps: Omit<RadioGroupProps, "onChange">;
  childrenList: RadioProps[];
}) => {
  const { controllerConfig, formgroupProps, childrenProps, childrenList } =
    props;
  const { field } = useController(controllerConfig);
  const handleChange = handleStringChange((gender) => {
    field.onChange(gender);
  });
  return (
    <FormGroup {...formgroupProps}>
      <RadioGroup
        {...childrenProps}
        selectedValue={field.value}
        onChange={handleChange}
      >
        {childrenList.map((radio: RadioProps) => (
          <Radio {...radio} key={radio.label} />
        ))}
      </RadioGroup>
    </FormGroup>
  );
};

export default EnhancedRadioGroup;
