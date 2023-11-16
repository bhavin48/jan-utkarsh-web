import { Switch } from "antd";

const SwitchCellRenderer = (props: any) => {
  const {
    data,
    context: { setStatusData },
  } = props;

  return (
    <div>
      <Switch
        checked={data?.status == 1}
        onClick={() => {
          setStatusData({ id: data?.id, status: Number(!data?.status) });
        }}
      />
    </div>
  );
};
export default SwitchCellRenderer;
