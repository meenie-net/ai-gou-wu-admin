import { Button, ControlGroup, InputGroup } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";

import { format } from "date-fns";
import { useState } from "react";
import {
  DayPicker,
  DateRange,
  SelectRangeEventHandler,
} from "react-day-picker";
import "react-day-picker/dist/style.css";

const DateRangeInput = (props: {
  onChange: (range: DateRange | undefined) => void;
}) => {
  const { onChange } = props;
  const [selectedRange, setSelectedRange] = useState<DateRange>();
  const [fromValue, setFromValue] = useState<string>("开始日期");
  const [toValue, setToValue] = useState<string>("结束日期");

  const handleRangeSelect: SelectRangeEventHandler = (
    range: DateRange | undefined
  ) => {
    setSelectedRange(range);
    if (range?.from) {
      setFromValue(format(range.from, "y-MM-dd"));
    } else {
      setFromValue("开始日期");
    }
    if (range?.to) {
      setToValue(format(range.to, "y-MM-dd"));
    } else {
      setToValue("结束日期");
    }
    onChange(range);
  };
  return (
    <ControlGroup>
      <Popover2
        popoverClassName=""
        portalClassName="foo"
        enforceFocus={false}
        content={
          <DayPicker
            mode="range"
            selected={selectedRange}
            onSelect={handleRangeSelect}
            footer={undefined}
            defaultMonth={new Date(1979, 8)}
          />
        }
      >
        <InputGroup
          placeholder="请选择日期"
          value={`${fromValue}~${toValue}`}
          readOnly
        />
      </Popover2>
      <Button icon="refresh" text="清空" />
    </ControlGroup>
  );
};

export default DateRangeInput;
