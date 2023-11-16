import { RuleObject} from "antd/lib/form";

const defaultLabel = "It";

export const minName = 3;
export const maxName = 50;
export const minDescription = 3;
export const maxDescription = 100;
export const minMobile = 8;
export const maxMobile = 20;
export const minEmail = 3;
export const maxEmail = 70;
export const minPassword = 8;
export const maxPassword = 20;

export const regexPatterns = {
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#!$%^&+=])(?=.*[0-9]).*$/,
  decimal: (number: number) => new RegExp('^\\d*(\\.\\d{0,' + number + '})?$'), // /^\d*(\.\d{0,2})?$/,
  numeric: /^[1-9\b]+$/,
  firstLetterUpperCase: /^(?=.*[a-z])(?=.*[A-Z]).*$/,
};

export const validations = {
  required: {
    text: (field = defaultLabel): RuleObject => {
      return {
        required: true,
        whitespace: true,
        message: `${field} is required.`,
      };
    },
    select: (field = defaultLabel): RuleObject => {
      return { required: true, message: `Please select ${field}.` };
    },
  },
  min: {
    text: (min: number, field = defaultLabel): RuleObject => {
      return {
        min,
        message: `${field} should contain minimum ${min} characters.`,
      };
    },
    select: (field = defaultLabel, min: number): RuleObject => {
      return {
        min,
        message: `Please select minimum ${min} ${field}.`,
      };
    },
    number: (min: number, field = defaultLabel): RuleObject => {
      return {
        min,
        message: `${field} should contain minimum ${min} digits.`,
      };
    },
  },
  max: {
    text: (max: number, field = defaultLabel): RuleObject => {
      return {
        max,
        message: `${field} should contain maximum ${max} characters.`,
      };
    },
    select: (field = defaultLabel, max: number): RuleObject => {
      return {
        max,
        message: `Please select maximum ${max} ${field}.`,
      };
    },
    number: (max: number, field = defaultLabel): RuleObject => {
      return {
        max,
        message: `${field} should contain maximum ${max} digits.`,
      };
    },
  },
  pattern: {
    password: (field = defaultLabel): RuleObject => {
      return {
        pattern: regexPatterns.password,
        message: `${field} should contain at least an uppercase letter, a lowercase letter, a number, and a special character.`,
      };
    },
    numeric: (): RuleObject => {
      return {
        pattern: regexPatterns.numeric,
        message: "Please enter digits only.",
      }
    },
    decimal: (number: number): RuleObject => {
      return {
        pattern: regexPatterns.decimal(number),
        message: `Please enter digits or decimal digits up to ${number} decimal places only.`,
      };
    },
  },
  email: (field = defaultLabel): RuleObject => {
    return {
      type: "email",
      message: `${field} Is Invalid email.`,
    };
  },
  between: {
    numeric: (min: number, max: number, field = defaultLabel): RuleObject => {
      return {
        min, max,
        message: `${field} must be between ${min} and ${max}.`,
      };
    }
  },
  url: (): RuleObject => {
    return {
      type: "url",
      message: `Invalid URL.`,
    };
  },
};
