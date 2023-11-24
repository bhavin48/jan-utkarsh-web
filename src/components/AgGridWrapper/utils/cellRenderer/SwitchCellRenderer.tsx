
import { Switch } from "antd";
const SwitchCellRenderer = (props: any) => {
  const {
    data,
    context: { setStatusData },
  } = props;

  // console.log("data switch " , data.name);
  
  const handleSwitchChange = (checked: boolean) => {
    setStatusData({ id: data?.id, status: checked ? 1 : 0, data :  data}); 
  };
  return (
    <div>
      <Switch
        checked={data.is_active == 1}
        // onClick={() => {
        //   setStatusData({ id: data?.id, status: Number(!data?.status) });
        // }}
        onChange={handleSwitchChange}
      />
    </div>
  );
};
export default SwitchCellRenderer;