import React from "react";
import { AgGridReact, AgGridReactProps, AgReactUiProps } from "ag-grid-react";
import Config from "../../config/Config";
import "ag-grid-enterprise";
import { useAppDispatch } from "../../store/app";

interface AgGridWrapperProps extends AgReactUiProps, AgGridReactProps {
  type?: "serverSide" | "clientSide";
  onGridReadyWithDispatch?: any;
}

const AgGridWrapper: React.FC<AgGridWrapperProps> = ({
  children,
  type = "clientSide",
  context,
  onGridReadyWithDispatch,
  ...rest
}) => {
  const gridType =
    type === "serverSide" ? Config.grid.server : Config.grid.local;
  const dispatch = useAppDispatch();

  return (
    <div className="ag-theme-alpine ag-grid-wrapper">
      <AgGridReact
        {...gridType}
        // {...(type === "serverSide"
        //   ? {
        //       onGridReady: (params: any) =>
        //         dispatch(onGridReadyWithDispatch(params)).catch(
        //           (error: any) => error
        //         ),
        //     }
        //   : {})}
        onGridReady={(params: any) => dispatch(onGridReadyWithDispatch(params))}
        context={
          context && {
            // dispatch,
            ...context,
          }
        }
        {...rest}
      >
        {children}
      </AgGridReact>
    </div>
  );
};

export default AgGridWrapper;
