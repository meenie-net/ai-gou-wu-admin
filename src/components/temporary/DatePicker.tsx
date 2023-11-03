import { Button, ControlGroup, InputGroup } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import { useState } from "react";
import { DayPicker } from "react-day-picker";

const DatePicker = (props: { onChange: (range: Date | undefined) => void }) => {
  const { onChange } = props;
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    onChange(date);
  };
  return (
    <ControlGroup>
      <Popover2
        popoverClassName=""
        portalClassName="foo"
        enforceFocus={false}
        content={
          <DayPicker
            selected={selectedDate}
            onSelect={handleSelect}
            footer={undefined}
            defaultMonth={new Date(1979, 8)}
          />
        }
      >
        <InputGroup
          placeholder="请选择日期"
          value={`${selectedDate}`}
          readOnly
        />
      </Popover2>
      <Button icon="refresh" text="清空" />
    </ControlGroup>
  );
};

export default DatePicker;
