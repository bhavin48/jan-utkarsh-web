import React from "react";
import { Input } from "antd";
import { SplitInputWrapperProps, InputWrapper } from "../../functions";
import { InputBoxProps } from "./interface";

const EmailInputBox: React.FC<InputBoxProps> = (props) => {
	const { formProps, inputProps } = SplitInputWrapperProps(props);
	console.log("inputProps " , inputProps);
	
	return (
		<InputWrapper {...formProps}>
			<Input type="email" {...inputProps} />
		</InputWrapper>
	);
};

export default EmailInputBox;
