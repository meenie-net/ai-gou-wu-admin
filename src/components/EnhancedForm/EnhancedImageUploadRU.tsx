import {
  FormGroup,
  FormGroupProps,
  Button,
  ProgressBar,
} from "@blueprintjs/core";
import { getMockSenderEnhancer } from "@rpldy/mock-sender";
import { asUploadButton } from "@rpldy/upload-button";
import UploadPreview from "@rpldy/upload-preview";
import Uploady, {
  useItemFinishListener,
  useItemProgressListener,
} from "@rpldy/uploady";
import { ReactElement, useState } from "react";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

interface IEnhancedImageUploadChildrenProps {
  uploadButton?: ReactElement;
  crop?: boolean;
  type?: "fileName" | "thumbnail";
  preview?: boolean;
}
interface IEnhancedImageUploadProps {
  controllerConfig: UseControllerProps<FieldValues, any>;
  formgroupProps: FormGroupProps;
  childrenProps: IEnhancedImageUploadChildrenProps;
}

const EnhancedImageUpload = ({
  controllerConfig = { name: "image" },
  formgroupProps = {},
  childrenProps: {
    uploadButton,
    type = "thumbnail",
    crop = false,
    preview = false,
  },
}: IEnhancedImageUploadProps) => {
  const {
    field,
    fieldState: { error },
  } = useController(controllerConfig);
  const mockSenderEnhancer = getMockSenderEnhancer({
    delay: 1500,
    progressIntervals: [20, 40, 75, 80, 90, 99],
  });
  const LogProgress = () => {
    const [value, setValue] = useState(0);
    useItemProgressListener((item) => {
      setValue(item.completed);
      console.log(
        `>>>>> (hook) File ${item.file.name} completed: ${item.completed}`
      );
    });
    return value === 0 || value === 100 ? null : (
      <ProgressBar intent="danger" value={value} />
    );
  };
  const FileName = () => {
    const [value, setValue] = useState("");
    useItemProgressListener((item) => {
      setValue(item.file.name);
    });
    return <div>{value}</div>;
  };
  const MyUploadButton = asUploadButton((props: any) => {
    return uploadButton ? (
      <button {...props}>{uploadButton}</button>
    ) : (
      <Button {...props} style={{ cursor: "pointer" }} small>
        点击选择
      </Button>
    );
  });
  const FinishMethod = () => {
    useItemFinishListener((item) => {
      console.log(
        `item ${item.id} finished uploading, response was: `,
        item.uploadResponse,
        item.uploadStatus
      );
    });
    return null;
  };
  // const handleChange = (e: FormEvent<HTMLInputElement>) => {
  //   console.log("e.target", e.target.value!);
  //   // field.onChange(value);
  // };

  return (
    <FormGroup
      {...formgroupProps}
      helperText={error?.message ? error?.message : formgroupProps.helperText}
      intent={field.value ? (error ? "danger" : "success") : "none"}
    >
      <Uploady
        destination={{ url: "http://localhost:3000/file/imgUpload" }}
        inputFieldName="img"
      >
        {type === "thumbnail" ? (
          <div className="flex gap-2">
            <div className="relative border">
              <UploadPreview
                previewComponentProps={{ className: "w-36 h-24 border cover" }}
                fallbackUrl="https://icon-library.net/images/image-placeholder-icon/image-placeholder-icon-6.jpg"
              />
              <div className="absolute bottom-0 w-full">
                <LogProgress />
              </div>
            </div>
            <MyUploadButton />
          </div>
        ) : (
          <div>
            <MyUploadButton />
            <div className="border">
              <FileName />
              <div className="w-full">
                <LogProgress />
              </div>
            </div>
          </div>
        )}
        <FinishMethod />
      </Uploady>
    </FormGroup>
  );
};
export default EnhancedImageUpload;
