import { Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { InputWrapper, SplitInputWrapperProps } from "../../functions";
import { validations } from "../../../../config/validations/validations";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../../config/Constant";

const ImageUploadInputBox: React.FC<any> = props => {
  const { formProps, inputProps } = SplitInputWrapperProps(props);

  const [fileList, setFileList] = useState<any>([]);
  useEffect(() => {
    if (inputProps?.imageUrl) {
      setFileList([
        {
          uid: "-1",
          status: "done",
          url: BASE_URL + inputProps?.imageUrl,
        },
      ]);
    }
  }, [inputProps?.imageUrl]);

  const uploadButton = (
    <div>
      <PlusOutlined />
    </div>
  );

  const onPreview = async (file: any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow: any = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const checkFileType = (file: any) => {
    const acceptedFormats = [
      "image/svg+xml",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];
    if (!acceptedFormats.includes(file.type)) {
      message.error(`Upload valid image. Only PNG, JPEG, SVG are allowed.`);
      return true;
    } else {
      return false;
    }
  };

  const onChange = (data: any) => {
    if (data.file?.status === "error" || data.file?.status === "uploading") {
      setFileList([]);
    } else {
      setFileList(data.fileList);
    }
  };

  return (
    <InputWrapper
      rules={formProps.required ? [validations.required.text()] : []}
      {...formProps}
    >
      <Upload
        name={formProps.name}
        accept=".png,.jpeg,.jpg,.svg"
        maxCount={1}
        onPreview={onPreview}
        fileList={fileList}
        onChange={onChange}
        showUploadList={true}
        multiple={false}
        listType="picture-card"
        beforeUpload={checkFileType}
        {...inputProps}
      >
        {fileList.length < 1 && uploadButton}
      </Upload>
    </InputWrapper>
  );
};

export default ImageUploadInputBox;
