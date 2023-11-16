import React, { useEffect, useState } from "react";
import { SplitInputWrapperProps, InputWrapper } from "../../functions";
import { EditorBoxProps } from "./interface";
import { Editor } from "@tinymce/tinymce-react";

const EditorInputBox: React.FC<EditorBoxProps> = (props) => {
  const { formProps, inputProps } = SplitInputWrapperProps(props);
  const { initValue, editorChange, ...rest } = inputProps;
  const [initialValue, setInitialValue] = useState("");

  const handleEditorChange = (e: any) => {
    if (editorChange) {
      editorChange(e);
      setInitialValue(e)
    }
  };

  useEffect(() => {
    setInitialValue(initValue)
  }, [])
  return (
    <InputWrapper {...formProps}>
      <Editor
        {...rest}
        apiKey={process.env.REACT_APP_TINYMCE_KEY ?? ''}
        value={initialValue}
        onEditorChange={handleEditorChange}
        init={{
          menubar: false,
          plugins: 'lists image fullscreen wordcount',
          toolbar: `bold italic underline forecolor removeformat | fontsize | numlist bullist alignleft aligncenter alignright alignjustify outdent indent | lineheight image fullscreen`,
          font_size_formats: "8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 36pt",
          line_height_formats: "1 1.2 1.4 1.5 1.6 1.8 2.0 3.0",
          content_style: "body {font-size: 14pt;}",
          image_dimensions: true,
          images_upload_credentials: true,
          automatic_uploads: true,
          file_picker_types: 'image',
          images_file_types: 'png,jpg,svg',
          images_upload_handler: async (blobInfo: any) => {
            return new Promise((resolve, reject) => {
              const fileReader: any = new FileReader()
              fileReader.readAsDataURL(blobInfo.blob())
              fileReader.onload = () => {
                resolve(fileReader.result)
              }
              fileReader.onerror = (e: any) => {
                reject(e)
              }
            })
          }
        }} />
    </InputWrapper>
  );
};

export default EditorInputBox;
