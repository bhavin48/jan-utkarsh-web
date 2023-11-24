import React, { useEffect, useState } from 'react'
import AgGridWrapper from '../../../components/AgGridWrapper/AgGridWrapper'
import { changeStatus, pincodeTaluka, setupGrid } from '../utils/talukaSlice'
import columnDefs from './columnDefs'
import { useAppDispatch, useAppSelector } from '../../../store/app'
import ActionButtons from '../../../components/ActionButtons'
import ChangeStatusModal from '../../../components/Modals/ChangeStatusModal'
const Listing: React.FC<any> = ({
    moduleInfo,
    handleViewClick,
    handleDeleteClick,
    handleEditClick
}) => {

    const dispatch = useAppDispatch()

    const [statusData, setStatusData] = useState<any>();
    //    console.log("statusData " , statusData);
    // const userDetails = useAppSelector(state => state.taluka.details)
    const ActionRenderer = (props: any) => {
        return (
            <ActionButtons
                data={props}
                view={
                    {
                        action: handleViewClick,
                        permissionKey: `${moduleInfo.permissionKeyPrefix}__DETAILS`
                    }
                }
                deleteButton={{
                    action: handleDeleteClick,
                    permissionKey: `${moduleInfo.permissionKeyPrefix}_DELETE`,
                }}
                edit={{
                    action: handleEditClick,
                    permissionKey: `${moduleInfo.permissionKeyPrefix}_UPDATE`,
                }}
            />
        )
    }

    useEffect(() => {
        dispatch(pincodeTaluka(statusData))
    }, [])
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
            ></AgGridWrapper>
        </>
    )
}

export default Listing
