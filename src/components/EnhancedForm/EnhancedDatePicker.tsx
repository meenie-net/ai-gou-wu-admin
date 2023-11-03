import { FormGroup, FormGroupProps } from "@blueprintjs/core";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import DatePicker from "../temporary/DatePicker";

const EnhancedDatePicker = (props: {
  controllerConfig: UseControllerProps<FieldValues, any>;
  formgroupProps: FormGroupProps;
  childrenProps?: object;
}) => {
  const { controllerConfig, formgroupProps, childrenProps } = props;
  const {
    field,
    fieldState: { error },
  } = useController(controllerConfig);
  const handleChange = (date: Date | undefined) => {
    console.log("date: ", date);
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
      <DatePicker {...childrenProps} onChange={handleChange} />
    </FormGroup>
  );
};

export default EnhancedDatePicker;
