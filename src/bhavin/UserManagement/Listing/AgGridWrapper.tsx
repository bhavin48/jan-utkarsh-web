import React from 'react'
import { AgGridReact, AgGridReactProps, AgReactUiProps } from "ag-grid-react";
import { useAppDispatch } from '../../../store/app';
import Config from '../../../config/Config';

interface AgGridWrapperProps extends AgReactUiProps, AgGridReactProps {
    type?: "serverSide" | "clientSide";
    onGridReadyWithDispatch?: any;
}

const AgGridWrapper: React.FC<any> = ({
    type = "clientSide",
    context,
    onGridReadyWithDispatch,
    ...rest }) => {

        // show list 
    const gridType =
        type === "serverSide" ? Config.grid.server : Config.grid.local;

    const dispatch = useAppDispatch()
    return (
        <div className="ag-theme-alpine ag-grid-wrapper">
            <AgGridReact
                {...gridType}
                onGridReady={(param: any) => dispatch(onGridReadyWithDispatch(param))}
                {...rest}
                context={
                    context && {
                      // dispatch,
                      ...context,
                    }
                }
            ></AgGridReact>
        </div>
    )
}

export default AgGridWrapper