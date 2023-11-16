import { ColDef } from "ag-grid-community";
import {
  idColumn,
  actionColumn,
  statusColumn,
} from "../../../../../components/AgGridWrapper/utils/commonColumns";
import { renderNA } from "../../../../../components/AgGridWrapper/utils/commonFunctions";

const columnDefs = (): ColDef[] => {
  const nameColumn: ColDef = {
    field: "name",
    headerName: "Name",
    cellRenderer: (props: any) => {
      return renderNA(props.data.name);
    },
  };

  return [idColumn, nameColumn, statusColumn, actionColumn];
};

export default columnDefs;
