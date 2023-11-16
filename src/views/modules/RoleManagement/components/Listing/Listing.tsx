import React, { useState } from "react";
import AgGridWrapper from "../../../../../components/AgGridWrapper/AgGridWrapper";
import ActionButtons from "../../../../../components/ActionButtons";
import { changeStatus, setGrid } from "../../utils/slice";
import columnDefs from "./columnDefs";
import ChangeStatusModal from "../../../../../components/Modals/ChangeStatusModal";
import { useAppSelector } from "../../../../../store/app";

const Listing: React.FC<any> = ({
  moduleInfo,
  handleViewClick,
  handleDeleteClick,
  handleEditClick,
}) => {
  const rowData = useAppSelector(state => state.role.rowData);
  const [statusData, setStatusData] = useState<any>();
  const ActionRenderer = (props: any) => {
    return (
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
        components={{
          ActionRenderer,
        }}
        rowData={rowData}
        onGridReadyWithDispatch={setGrid}
        columnDefs={columnDefs()}
        context={{ setStatusData }}
      />
    </>
  );
};

export default Listing;
