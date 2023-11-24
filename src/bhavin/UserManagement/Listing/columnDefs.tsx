// import React from 'react'
import { renderNA } from '../../../components/AgGridWrapper/utils/commonFunctions';
import { ColDef } from 'ag-grid-community';
import { useAppDispatch } from '../../../store/app';
import { fetchRolesList } from '../../../store/CommonSlice';
import { idColumn , actionColumn,  statusColumn } from '../../../components/AgGridWrapper/utils/commonColumns';

const columnDefs = (): ColDef[] => {
  const dispatch = useAppDispatch()
  const firstNameColumn: ColDef = {
    field: "name",
    headerName: "First Name",
    cellRenderer: (props: any) => {
      return renderNA(props.data.name);
    },
  };

  const emailColumn: ColDef = {
    field: "email",
    headerName: "Email",
    cellRenderer: (props: any) => {
      return renderNA(props.data.email);
    },
  };

  const mobileNumberColumn: ColDef = {
    field: "mobile_no",
    headerName: "Mobile Number",
    cellRenderer: (props: any) => {
      return renderNA(props.data.mobile_no);
    },
  };

  const roleColumn: ColDef = {
    field: "role",
    headerName: "Role",
    cellRenderer: (props: any) => {
      return renderNA(props.data.role);
    },
    filter: "agSetColumnFilter",
    filterParams: {
      values: (params: any) => {
        dispatch(fetchRolesList()).then((data: any) => {
          params.success(data?.data?.map((role: any) => role?.name));
        });
      },
      buttons: ["apply", "reset"],
      closeOnApply: true,
    },
  };
  return [
    idColumn,
    firstNameColumn ,
     emailColumn,
     mobileNumberColumn,
     roleColumn,
     statusColumn,
     { ...actionColumn, width: 165, minWidth: 165 },
    ]
}

export default columnDefs