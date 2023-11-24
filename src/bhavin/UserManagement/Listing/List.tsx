import { AgGridReact, AgGridReactProps, AgReactUiProps } from 'ag-grid-react'
import React, { useState } from 'react'
import columnDefs from './columnDefs'
import { useAppDispatch } from '../../../store/app'
import { changeStatus, setGrid, setupGrid } from '../conponents/utils/sliceB'
import { rest } from 'lodash'
import AgGridWrapper from './AgGridWrapper'
import ChangeStatusModal from '../../../components/Modals/ChangeStatusModal'
// import { AgGridReact, AgGridReactProps, AgReactUiProps } from "ag-grid-react";


const List: React.FC<any> = () => {
  const dispatch = useAppDispatch()

  const [statusData, setStatusData] = useState<any>();

  
  return (
    <div>
      <ChangeStatusModal
        titleName={"Activ"}
        data={statusData}
        close={() => setStatusData(null)}
        callApi={changeStatus}
      />
      <AgGridWrapper
        onGridReadyWithDispatch={setupGrid}
        type="serverSide"
        columnDefs={columnDefs()}
        context={{ setStatusData }}
        // components = {"/bhavin"}
      ></AgGridWrapper>
    </div>
  )
}

export default List