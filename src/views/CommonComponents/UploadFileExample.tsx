import { Button, Card } from "@blueprintjs/core";
import EnhancedFileInput from "../../components/EnhancedForm/EnhancedFileInput";
import { useForm } from "react-hook-form";
import EnhancedImageUploadRU from "../../components/EnhancedForm/EnhancedImageUploadRU";
import { Icon } from "@iconify/react";

const UploadFileExample = () => {
  const { handleSubmit, control } = useForm({ mode: "all" });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <Card className="h-full overflow-y-auto">
      <div className="grid grid-cols-1 gap-2 px-2">
        <div>
          <h1 className="py-2 text-2xl">依赖包：react-uploady</h1>
          <table className="my-2 text-center">
            <thead>
              <tr className="bg-slate-100">
                <th className="border">属性</th>
                <th className="border">说明</th>
                <th className="border">类型</th>
                <th className="border">默认值</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border">
                  <pre>uploadButton</pre>
                </td>
                <td className="border">
                  包含在一个<code>button</code>中，定制入口样式
                </td>
                <td className="border px-2">
                  <code className="rounded-sm bg-gray-200 px-1">
                    ReactElement
                  </code>
                </td>
                <td className="border p-2">
                  <Button small>点击选择</Button>
                </td>
              </tr>
              <tr>
                <td className="border">
                  <pre>type</pre>
                </td>
                <td className="border">等待区显示类型</td>
                <td className="border px-2">
                  <code className="rounded-sm bg-gray-200 px-1">
                    {`"fileName" | "thumbnail"`}
                  </code>
                </td>
                <td className="border">{`"fileName"`}</td>
              </tr>
              <tr>
                <td className="border">
                  <pre>crop</pre>
                </td>
                <td className="border">是否裁剪</td>
                <td className="border px-2">
                  <code className="rounded-sm bg-gray-200 px-1">boolean</code>
                </td>
                <td className="border">false</td>
              </tr>
              <tr>
                <td className="border">
                  <pre>preview</pre>
                </td>
                <td className="border">是否预览</td>
                <td className="border px-2">
                  <code className="rounded-sm bg-gray-200 px-1">boolean</code>
                </td>
                <td className="border">false</td>
              </tr>
            </tbody>
          </table>
          <div className="grid grid-cols-2 gap-2">
            <div className="border">
              <h1>单图片上传（无裁剪）</h1>
              <div className="bg-slate-200 p-3">
                <EnhancedImageUploadRU
                  controllerConfig={{
                    name: "file",
                    control,
                    defaultValue: "",
                  }}
                  formgroupProps={{
                    label: <div>上传图片</div>,
                    labelInfo: <div>(必填)</div>,
                    inline: true,
                  }}
                  childrenProps={{}}
                />
              </div>
            </div>
            <div className="border">
              <h1>单图片上传（裁剪）</h1>
              <div className="bg-slate-200 p-3">
                <EnhancedImageUploadRU
                  controllerConfig={{
                    name: "file",
                    control,
                    defaultValue: "",
                  }}
                  formgroupProps={{
                    helperText: "填写说明：",
                    label: <div>上传图片</div>,
                    labelInfo: <div>(必填)</div>,
                    inline: true,
                  }}
                  childrenProps={{
                    uploadButton: (
                      <div className="flex h-24 w-36 flex-col items-center justify-center rounded border border-dashed border-gray-300 bg-white hover:border-blue-600 ">
                        <div>
                          <Icon icon="ph:image" height="1.5em" />
                        </div>
                        <div>选择</div>
                      </div>
                    ),
                    preview: true,
                  }}
                />
              </div>
            </div>
            <div className="border">
              <h1>选择头像（单图裁剪固定比例及大小）</h1>
              <div className="bg-slate-200 p-3">
                <EnhancedImageUploadRU
                  controllerConfig={{
                    name: "file",
                    control,
                    defaultValue: "",
                  }}
                  formgroupProps={{
                    helperText: "填写说明：",
                    label: <div>上传图片</div>,
                    labelInfo: <div>(必填)</div>,
                    inline: true,
                  }}
                  childrenProps={{
                    uploadButton: (
                      <div className="flex h-24 w-36 flex-col items-center justify-center rounded border border-dashed border-gray-300 bg-white hover:border-blue-600 ">
                        <div>
                          <Icon icon="ph:image" height="1.5em" />
                        </div>
                        <div>选择</div>
                      </div>
                    ),
                    preview: true,
                  }}
                />
              </div>
            </div>
            <div className="border">
              <h1>多图片上传（无裁剪）</h1>
              <div className="bg-slate-200 p-3">
                <EnhancedImageUploadRU
                  controllerConfig={{
                    name: "file",
                    control,
                    defaultValue: "",
                  }}
                  formgroupProps={{
                    helperText: "填写说明：",
                    label: <div>上传图片</div>,
                    labelInfo: <div>(必填)</div>,
                    inline: true,
                  }}
                  childrenProps={{
                    uploadButton: (
                      <div className="flex h-24 w-36 flex-col items-center justify-center rounded border border-dashed border-gray-300 bg-white hover:border-blue-600 ">
                        <div>
                          <Icon icon="ph:image" height="1.5em" />
                        </div>
                        <div>选择</div>
                      </div>
                    ),
                    preview: true,
                  }}
                />
              </div>
            </div>
            <div className="border">
              <h1>多图片上传（裁剪）</h1>
              <div className="bg-slate-200 p-3">
                <EnhancedImageUploadRU
                  controllerConfig={{
                    name: "file",
                    control,
                    defaultValue: "",
                  }}
                  formgroupProps={{
                    helperText: "填写说明：",
                    label: <div>上传图片</div>,
                    labelInfo: <div>(必填)</div>,
                    inline: true,
                  }}
                  childrenProps={{
                    uploadButton: (
                      <div className="flex h-24 w-36 flex-col items-center justify-center rounded border border-dashed border-gray-300 bg-white hover:border-blue-600 ">
                        <div>
                          <Icon icon="ph:image" height="1.5em" />
                        </div>
                        <div>选择</div>
                      </div>
                    ),
                    preview: true,
                  }}
                />
              </div>
            </div>
            <div className="border">
              <h1>图片视频上传（预览）</h1>
              <div className="bg-slate-200 p-3">
                <EnhancedImageUploadRU
                  controllerConfig={{
                    name: "file",
                    control,
                    defaultValue: "",
                  }}
                  formgroupProps={{
                    helperText: "填写说明：",
                    label: <div>上传图片</div>,
                    labelInfo: <div>(必填)</div>,
                    inline: true,
                  }}
                  childrenProps={{
                    uploadButton: (
                      <div className="flex h-24 w-36 flex-col items-center justify-center rounded border border-dashed border-gray-300 bg-white hover:border-blue-600 ">
                        <div>
                          <Icon icon="ph:image" height="1.5em" />
                        </div>
                        <div>选择</div>
                      </div>
                    ),
                    preview: true,
                  }}
                />
              </div>
            </div>
            <div className="border">
              <h1>文件上传（进度条）</h1>
              <div className="bg-slate-200 p-3">
                <EnhancedImageUploadRU
                  controllerConfig={{
                    name: "file",
                    control,
                    defaultValue: "",
                  }}
                  formgroupProps={{
                    helperText: "填写说明：",
                    label: <div>上传图片</div>,
                    labelInfo: <div>(必填)</div>,
                    inline: true,
                  }}
                  childrenProps={{
                    uploadButton: (
                      <div className="flex h-24 w-36 flex-col items-center justify-center rounded border border-dashed border-gray-300 bg-white hover:border-blue-600 ">
                        <div>
                          <Icon icon="ph:image" height="1.5em" />
                        </div>
                        <div>选择</div>
                      </div>
                    ),
                    preview: true,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="py-2 text-2xl">依赖包：react-filepond</h1>
          <div className="grid grid-cols-2 gap-2">
            <div className="border">
              <h1>单图片上传（裁剪）</h1>
              <div className="bg-slate-200 p-3">
                <EnhancedFileInput
                  controllerConfig={{
                    name: "file",
                    control,
                    defaultValue: "",
                  }}
                  formgroupProps={{
                    helperText: "填写说明：",
                    label: <div>单图片上传（裁剪）</div>,
                    labelInfo: <div>(必填)</div>,
                  }}
                  childrenProps={{
                    text: "请选择要上传的图片",
                    buttonText: "点击选择",
                    small: true,
                  }}
                />
              </div>
            </div>
            <div className="border">
              <h1>选择头像（单图裁剪固定比例及大小）</h1>
              <div className="bg-slate-200 p-3">
                <EnhancedFileInput
                  controllerConfig={{
                    name: "file",
                    control,
                    defaultValue: "",
                  }}
                  formgroupProps={{
                    helperText: "填写说明：比例1：1；大小不超过120k",
                    label: <div>选择头像</div>,
                    labelInfo: <div>(必填)</div>,
                  }}
                  childrenProps={{
                    text: "请选择图片",
                    buttonText: "点击选择",
                    small: true,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="py-2 text-2xl">依赖包：react-dropzone-uploader</h1>
          <div className="grid grid-cols-2 gap-2">
            <div className="border">
              <h1>图片视频上传（预览）</h1>
              <div className="bg-slate-200 p-3">
                <EnhancedImageUploadRU
                  controllerConfig={{
                    name: "file",
                    control,
                    defaultValue: "",
                  }}
                  formgroupProps={{
                    label: <div>上传图片</div>,
                    labelInfo: <div>(必填)</div>,
                  }}
                  childrenProps={{
                    preview: true,
                  }}
                />
              </div>
            </div>
            <div className="border">
              <h1>文件上传（进度条）</h1>
              <div className="bg-slate-200 p-3">
                <EnhancedFileInput
                  controllerConfig={{
                    name: "file",
                    control,
                    defaultValue: "",
                  }}
                  formgroupProps={{
                    helperText: "填写说明：",
                    label: <div>文件上传</div>,
                    labelInfo: <div>(必填)</div>,
                  }}
                  childrenProps={{
                    text: "请选择要上传的文件",
                    buttonText: "点击选择",
                    small: true,
                  }}
                />
              </div>
            </div>
            <div className="border">
              <h1>图片视频上传（预览）</h1>
              <div className="bg-slate-200 p-3">
                <EnhancedImageUploadRU
                  controllerConfig={{
                    name: "file",
                    control,
                    defaultValue: "",
                  }}
                  formgroupProps={{
                    label: <div>上传图片</div>,
                    labelInfo: <div>(必填)</div>,
                    inline: true,
                  }}
                  childrenProps={{
                    preview: true,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UploadFileExample;
