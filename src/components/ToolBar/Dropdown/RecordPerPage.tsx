import React from "react";
import { Select } from "antd";
import { CONSTANT } from "../../../config/Constant";

interface RecordPerPageProps {
  onChange: (params: any) => any;
  perPage: number;
  [key: string]: any;
}

const RecordPerPage: React.FC<RecordPerPageProps> = ({onChange, perPage, ...rest}) => {
  
  return (
    <Select
      defaultValue={perPage + " per page"}
      style={{ width: "160px" }}
      onChange={onChange}
      {...rest}
    >
      {CONSTANT.PER_PAGE_RECORD.map((item: any) => {
        return (
          <Select.Option value={item.id} key={item.id}>
            {item.value}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default RecordPerPage;
