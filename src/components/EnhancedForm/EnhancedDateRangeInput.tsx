import { FormGroup, FormGroupProps } from "@blueprintjs/core";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import DateRangeInput from "../temporary/DateRangeInput";
import { DateRange } from "react-day-picker";

const EnhancedDateRangeInput = (props: {
  controllerConfig: UseControllerProps<FieldValues, any>;
  formgroupProps: FormGroupProps;
  childrenProps?: object;
}) => {
  const { controllerConfig, formgroupProps, childrenProps } = props;
  const {
    field,
    fieldState: { error },
  } = useController(controllerConfig);
  const handleChange = (range: DateRange | undefined) => {
    console.log("range: ", range);
  };
  return (
    <FormGroup
      {...formgroupProps}
      intent={field.value ? (error ? "danger" : "success") : "none"}
    >
      {/* warning: datatime do not support react 18 */}
      {/* todo:wait for blueprint support react 18 */}
      {/* 1.run `npm uninstall react-day-picker date-fns`
            2.remove <~/components/temporary> dir
            3.adaptive official component */}

      <DateRangeInput {...childrenProps} onChange={handleChange} />
    </FormGroup>
  );
};

export default EnhancedDateRangeInput;
