import { ColDef } from "ag-grid-community";
import { dateFormatter } from "../../../config/Global";
import { renderNA, setDateFilterDefs } from "./commonFunctions";
import SwitchCellRenderer from "./cellRenderer/SwitchCellRenderer";

export const idColumn: ColDef = {
  field: "id",
  headerName: "# ID",
  pinned: "left",
  width: 120,
  minWidth: 120,
  filter: "agNumberColumnFilter",
};

export const statusColumn: ColDef = {
  field: "display_status",
  headerName: "Status",
  sortable: false,
  width: 100,
  minWidth: 100,
  cellRenderer: SwitchCellRenderer,
  filter: "agSetColumnFilter",
  filterParams: {
    values: (params: any) => {  
      params.success(["Active", "Inactive"]);
    },
    buttons: ["apply", "reset"],
    closeOnApply: true,
  },
};

export const isActiveColumn: ColDef = {
  field: "is_active",
  headerName: "Is Active?",
  filter: "agSetColumnFilter",
  cellRenderer: (props: any) => {
    
    return renderNA(props.data.name);
  },
  filterParams: {
    values: (params: any) => {
      const data = ["Active", "Deactivate"];
      params.success(data);
    },
    buttons: ["apply", "reset"],
    closeOnApply: true,
  },
};

export const actionColumn: ColDef = {
  field: "",
  headerName: "Action",
  type: "actionColumn",
  sortable: false,
  filter: false,
  width: 120,
  minWidth: 120,
  pinned: "right",
  suppressMenu: true,
};

export const createdAtColumn: ColDef = {
  field: "created_at",
  headerName: "Created at",
  sortable: true,
  width: 200,
  minWidth: 200,
  cellRenderer: (props: any) => {
    return props.data.created_at ? dateFormatter(props.data.created_at) : "N/A";
  },
  ...setDateFilterDefs()
};

export const updatedAtColumn: ColDef = {
  field: "updated_at",
  headerName: "Updated at",
  sortable: true,
  width: 200,
  minWidth: 200,
  cellRenderer: (props: any) => {
    return props.data.updated_at ? dateFormatter(props.data.updated_at) : "N/A";
  },
  ...setDateFilterDefs()
};
