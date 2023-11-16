import React, { useState } from "react";
import AgGridWrapper from "../../../../../components/AgGridWrapper/AgGridWrapper";
import ActionButtons from "../../../../../components/ActionButtons";
import { changeStatus, setupGrid } from "../../utils/slice";
import ChangeStatusModal from "../../../../../components/Modals/ChangeStatusModal";
import columnDefs from "./columnDefs";
// import { Button } from "antd";
// import SVGIcon from "../../../../../utils/SVGIcon";

const Listing: React.FC<any> = ({
  moduleInfo,
  handleViewClick,
  handleDeleteClick,
  handleEditClick,
}) => {
  const [statusData, setStatusData] = useState<any>();
  const ActionRenderer = (props: any) => {
    return (
      <>
        <ActionButtons
          data={props}
          view={{
            action: handleViewClick,
            permissionKey: `${moduleInfo.permissionKeyPrefix}_DETAILS`,
          }}
          edit={{
            action: handleEditClick,
            permissionKey: `${moduleInfo.permissionKeyPrefix}_UPDATE`,
          }}
          deleteButton={{
            action: handleDeleteClick,
            permissionKey: `${moduleInfo.permissionKeyPrefix}_DELETE`,
          }}
        />
        {/* <Button
          type="text"
          title={"Change Password"}
          className="editIcon"
          // onClick={}
        >
          <SVGIcon icon="changePass" />
        </Button> */}
      </>
    );
  };

  return (
    <>
      <ChangeStatusModal
        titleName={moduleInfo.title}
        data={statusData}
        close={() => setStatusData(null)}
        callApi={changeStatus}
      />
      <AgGridWrapper
        type="serverSide"
        components={{
          ActionRenderer,
        }}
        onGridReadyWithDispatch={setupGrid}
        columnDefs={columnDefs()}
        context={{ setStatusData }}
      />
    </>
  );
};

export default Listing;
