import React, { useEffect, useState } from 'react'
import ToolBar from '../../components/ToolBar'
import CreateButton from '../../components/ToolBar/Buttons/CreateButton'
import ContentBox from '../../components/ContentBox/ContentBox'
import Listing from './Listing/Listing'
import { TalukaBreadcrumb } from '../../config/BreadcrumbConfig'
import { CONSTANT } from '../../config/Constant'
import { toUpperCaseWithUnderscore } from '../../components/AgGridWrapper/utils/commonFunctions'
import { useAppDispatch, useAppSelector } from '../../store/app'
import { useNavigate, useParams } from 'react-router-dom'
import { checkPrivileges } from '../../config/Global'
import AddComponent from './Form/addComponent'
import DeleteModal from '../../components/Modals/DeleteModal'
import { deleteTaluka, detailsTaluka, setPerPageSize } from './utils/talukaSlice'
import ViewDrawer from './Form/ViewDrawer'
import EditComponent from './Form/EditComponent'
import RecordPerPage from '../../components/ToolBar/Dropdown/RecordPerPage'

const moduleInfo = {
    title: "Talukas",
    permissionKeyPrefix: toUpperCaseWithUnderscore("TALUKA"),
    indexRoute: "/talukas",
};

const TalukasManagement: React.FC<any> = () => {

    const [visibleDrawer, setVisibleDrawer] = useState<string | null>(null);
    const [deleteValue, setDeleteValue] = useState<any>();
    const { action, id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const userDetail = useAppSelector((state) => state.auth.userDetail);
    const perpage = useAppSelector((state) => state.taluka.perPage)
    const getDetails = (id: any, type: string) => {
        dispatch(detailsTaluka(id)).then(() => {
            setVisibleDrawer(type)
        })
            .catch(() => {
                navigateToIndex()
            })
    }

    const pincodeList = useAppSelector(state => state.taluka)
    const navigateToIndex = () => {
        setVisibleDrawer(null)
        navigate(`${moduleInfo.indexRoute}`)
    }

    useEffect(() => {
        if (action === CONSTANT.DRAWER_TYPE.ADD && !checkPrivileges(userDetail, `${moduleInfo.permissionKeyPrefix}_CREATE`)) {
            navigateToIndex()
            return
        }
        if (action === CONSTANT.DRAWER_TYPE.VIEW && !checkPrivileges(userDetail, `${moduleInfo.permissionKeyPrefix}_DETAILS`)) {
            navigateToIndex()
            return
        }
        if (action === CONSTANT.DRAWER_TYPE.EDIT && !checkPrivileges(userDetail, `${moduleInfo.permissionKeyPrefix}_UPDATE`)) {
            navigateToIndex()
            return
        }

        if (!id && action) {
            setVisibleDrawer(action)
        } else if (id && action) {
            getDetails(id, action)
        } else {
            navigateToIndex()
        }

    }, [action, id])

    return (
        <div>
            <ToolBar breadcrumbs={TalukaBreadcrumb} >
                <CreateButton
                    action={() =>
                        navigate(`${moduleInfo.indexRoute}/${CONSTANT.DRAWER_TYPE.ADD}`)
                    }
                    permissionKey={`${moduleInfo.permissionKeyPrefix}`}
                />
                <RecordPerPage
                    perPage={perpage}setPerPageSize
                    onChange={(perPageSize: number) => {
                        dispatch(setPerPageSize(perPageSize));
                    }}
                />

            </ToolBar>
            <ContentBox>
                <Listing
                    moduleInfo={moduleInfo}
                    handleViewClick={(data: any) => {
                        navigate(`${moduleInfo.indexRoute}/${CONSTANT.DRAWER_TYPE.VIEW}/${data.id}`)
                    }}
                    handleDeleteClick={setDeleteValue}
                    handleEditClick={(data: any) => {
                        navigate(
                            `${moduleInfo.indexRoute}/${CONSTANT.DRAWER_TYPE.EDIT}/${data.id}`
                        );
                    }}
                />

                <AddComponent
                    titleName={moduleInfo.title}
                    open={visibleDrawer === CONSTANT.DRAWER_TYPE.ADD}
                    close={navigateToIndex}
                />
                <ViewDrawer
                    titleName={moduleInfo.title}
                    open={visibleDrawer === CONSTANT.DRAWER_TYPE.VIEW}
                    close={navigateToIndex}
                />
                <DeleteModal
                    title={moduleInfo.title}
                    deleteValues={deleteValue}
                    close={() => setDeleteValue(null)}
                    callApi={deleteTaluka}
                // callApi={}
                />
                <EditComponent
                    titleName={moduleInfo.title}
                    open={visibleDrawer === CONSTANT.DRAWER_TYPE.EDIT}
                    close={navigateToIndex}
                />
            </ContentBox>
        </div>
    )
}

export default TalukasManagement