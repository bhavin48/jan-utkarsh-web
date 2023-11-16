import { RcFile } from "antd/lib/upload";
import CryptoJS from "crypto-js";
import { debounce } from "lodash";
import { CONSTANT } from "./Constant";
import moment from "moment";
import { notification } from "antd";
import store from '../store/app';
import { resetAuthStore } from "../store/AuthSlice";

export const Constant = {
  API_KEY: "secret-api-key",
};

export const handleStorageEvents = (e: any) => {
  if (e.key === 'token') {
    if (e.oldValue && !e.newValue) {
      window.location.href = "/";
      store.dispatch(resetAuthStore());
    } else if (!e.oldValue && e.newValue) {
      window.location.reload();
    }
  }
  if (e.key === 'initialData') {
    if (e.oldValue !== e.newValue) {
      window.location.reload();
    }
  }
}

export const uploadedFileOnPreview = async (file: any) => {
  let src = file.url as string;
  if (!src) {
    src = await new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj as RcFile);
      reader.onload = () => resolve(reader.result as string);
    });
  }

  const image = new Image();
  image.src = src;
  const imgWindow: any = window.open(src);
  imgWindow.document.write(image.outerHTML);
};

const insertAt = (array: any[], index: number, ...elementsArray: any[]) => {
  array.splice(index, 0, ...elementsArray);
};

export const convertTextToID = (
  textArray: any,
  mainArray: any,
  textKey = "name",
  idKey = "id"
) => {
  const newArray: any = [];
  if (textArray && textArray.values && textArray.values.length > 0) {
    textArray.values.forEach((x: any) => {
      const temp = mainArray.find((y: any) => y[textKey] === x);
      if (x && temp) {
        newArray.push(temp[idKey]);
      } else {
        insertAt(newArray, 0, x);
      }
    });
  }

  return newArray;
};

export const copyTextToClipboard = (textToCopy: any) => {
  if (navigator.clipboard && window.isSecureContext) {
    // navigator clipboard api method'
    return navigator.clipboard.writeText(textToCopy);
  } else {
    // text area method
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    // make the textarea out of viewport
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise<void>((res, rej) => {
      // here the magic happens
      document.execCommand("copy") ? res() : rej();
      textArea.remove();
    });
  }
};

export const stringEncryption = (string: string) => {
  return CryptoJS.AES.encrypt(string, Constant.API_KEY)
    .toString()
    .replace(/\+/g, "xMl3Jk")
    .replace(/\//g, "Por21Ld")
    .replace(/=/g, "Ml32");
};

export const stringDecryption = (string: string) => {
  string = string
    .replace(/xMl3Jk/g, "+")
    .replace(/Por21Ld/g, "/")
    .replace(/Ml32/g, "=");
  return CryptoJS.AES.decrypt(string, Constant.API_KEY).toString(
    CryptoJS.enc.Utf8
  );
};

export const dataToFormDataConverter = (data: any) => {
  const formData = new FormData();
  for (let name in data) {
    const value = data[name];

    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        name = `${name}[]`;
        value.map(item => {
          formData.append(name, item);
          return item;
        });
      } else {
        formData.append(name, value);
      }
    }
    // formData.append(name, data[name]); // there should be values.avatar which is a File object
  }
  return formData;
};

export const b64toBlob = (
  b64Data: string,
  contentType = "",
  sliceSize = 512
): File => {
  const byteCharacters = Buffer.from(b64Data, "base64").toString("binary");
  const byteArrays: Uint8Array[] = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new File(byteArrays, "pot", { type: contentType });
};

export const validateFields = debounce((form, setDisabled) => {
  form
    .validateFields()
    .then(() => {
      setDisabled(false);
    })
    .catch(() => {
      setDisabled(true);
    });
}, 500);

export const dateFormatter = (
  date: any,
  format = CONSTANT.DATE_TIME_FORMAT
) => {
  return moment(date).format(format);
};

export const snakeCaseString = (str: any): string => {
  return (
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((s: any) => s.toLowerCase())
      .join("_")
  );
};

export const camelCaseString = (str: string): string => {
  str = str
    .replace(/[-_]+/g, " ")
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word: any, index: any) {
      return index !== 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/ (.)/g, function ($1: any) {
      return $1.toUpperCase();
    });
  return str;
};

/**
 * We use notification from here 2 type of nofiifcation
 * Success: {placement:"bottomRight",message: "Your Success message"}
 * Error: {placement:"bottomRight",message: "Your Error Message"}
 */
export const Notification = {
  success: (data: any) => {
    notification.success({
      placement: data.placement ? data.placement : "bottomRight",
      duration: 3,
      ...data,
    });
  },
  error: (data: any) => {
    notification.error({
      placement: data.placement ? data.placement : "bottomRight",
      duration: 3,
      ...data,
    });
  },
};

export const checkPrivileges = (
  userDetail: any,
  permissionType: string
): boolean =>
  !!(
    userDetail?.userPrivileges &&
    userDetail?.userPrivileges.includes(permissionType)
  );
