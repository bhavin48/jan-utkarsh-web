import React from 'react'
import { ColDef } from "ag-grid-community";
import {  actionColumn, statusColumn } from '../../../components/AgGridWrapper/utils/commonColumns';
import { renderNA } from '../../../components/AgGridWrapper/utils/commonFunctions';
import { useAppDispatch } from '../../../store/app';
import { pincodeTaluka } from '../utils/talukaSlice';
const columnDefs = (): ColDef[] => {
  const dispatch = useAppDispatch()

  const idColumn: ColDef = {
    field: "id",
    headerName: "# ID",
    pinned: "left",
    width: 120,
    minWidth: 120,
    filter: "agNumberColumnFilter",
    cellRenderer: (props: any) => {
      console.log("props.data " , props.data.id);
      
      return renderNA(props.data.id);
    },
  };
  const talukaColumn: ColDef = {
    field: "name",
    headerName: "Taluka",
    cellRenderer: (props: any) => {
      return renderNA(props.data.name);
    },
  };

  const talukaPinColumn: ColDef = {
    field: "pincode.pincode",
    headerName: "pincode",
    cellRenderer: (props: any) => {
      return renderNA(props.data.pincode.pincode);
    },
    filter: "agTextColumnFilter",
  
  };
  return [idColumn, talukaColumn, talukaPinColumn, statusColumn, actionColumn]
}

export default columnDefs