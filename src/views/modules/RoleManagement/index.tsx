import React, { useEffect, useState } from "react";
import ToolBar from "../../../components/ToolBar";
import CreateButton from "../../../components/ToolBar/Buttons/CreateButton";
import RecordPerPage from "../../../components/ToolBar/Dropdown/RecordPerPage";
import ContentBox from "../../../components/ContentBox/ContentBox";
import Listing from "./components/Listing/Listing";
import {
  setPerPageSize,
  details,
  setDetails,
  deleteRecord,
  fetchList,
} from "./utils/slice";
import DeleteModal from "../../../components/Modals/DeleteModal";
import ViewDrawer from "./components/ViewDrawer";
import AddComponent from "./components/Form/AddComponent";
import EditComponent from "./components/Form/EditComponent";
import { RoleBreadcrumb } from "../../../config/BreadcrumbConfig";
import { CONSTANT } from "../../../config/Constant";
import { useAppDispatch, useAppSelector } from "../../../store/app";
import { toUpperCaseWithUnderscore } from "../../../components/AgGridWrapper/utils/commonFunctions";
import { useNavigate, useParams } from "react-router-dom";
import { checkPrivileges } from "../../../config/Global";

const moduleInfo = {
  title: "Role",
  permissionKeyPrefix: toUpperCaseWithUnderscore("Roles"),
  indexRoute: "/roles",
};

const RoleManagement: React.FC<any> = () => {
  const dispatch = useAppDispatch();
  const { perPage } = useAppSelector((state) => state.role);
  const userDetail = useAppSelector((state) => state.auth.userDetail);
  const [visibleDrawer, setVisibleDrawer] = useState<string | null>(null);
  const [deleteValue, setDeleteValue] = useState<any>();
  const { action, id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchList()).catch((error: any) => error);
  }, []);

  const getDetails = (id: any, type: string) => {
    dispatch(details(id))
      .then(() => {
        setVisibleDrawer(type);
      })
      .catch(() => {
        navigateToIndex();
      });
  };

  const navigateToIndex = () => {
    setDetails(null);
    setVisibleDrawer(null);
    navigate(`${moduleInfo.indexRoute}`);
  };

  useEffect(() => {
    if (action) {
      if (action === CONSTANT.DRAWER_TYPE.ADD && !checkPrivileges(userDetail, `${moduleInfo.permissionKeyPrefix}_CREATE`)) {
        navigateToIndex()
        return
      }
      if (action === CONSTANT.DRAWER_TYPE.EDIT && !checkPrivileges(userDetail, `${moduleInfo.permissionKeyPrefix}_UPDATE`)) {
        navigateToIndex()
        return
      }
      if (action === CONSTANT.DRAWER_TYPE.VIEW && !checkPrivileges(userDetail, `${moduleInfo.permissionKeyPrefix}_DETAILS`)) {
        navigateToIndex()
        return
      }
      
      if (!id && action) {
        setVisibleDrawer(action);
      } else if (id && action) {
        getDetails(id, action);
      } else {
        navigateToIndex();
      }
    }
  }, [action, id]);

  return (
    <>
      <ToolBar breadcrumbs={RoleBreadcrumb}>
        <CreateButton
          action={() =>
            navigate(`${moduleInfo.indexRoute}/${CONSTANT.DRAWER_TYPE.ADD}`)
          }
          permissionKey={`${moduleInfo.permissionKeyPrefix}_CREATE`}
        />
        <RecordPerPage
          perPage={perPage}
          onChange={(perPageSize: number) => {
            dispatch(setPerPageSize(perPageSize));
          }}
        />
      </ToolBar>
      <ContentBox>
        <Listing
          moduleInfo={moduleInfo}
          handleViewClick={(data: any) => {
            navigate(
              `${moduleInfo.indexRoute}/${CONSTANT.DRAWER_TYPE.VIEW}/${data.id}`
            );
          }}
          handleEditClick={(data: any) => {
            navigate(
              `${moduleInfo.indexRoute}/${CONSTANT.DRAWER_TYPE.EDIT}/${data.id}`
            );
          }}
          handleDeleteClick={setDeleteValue}
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
        <EditComponent
          titleName={moduleInfo.title}
          open={visibleDrawer === CONSTANT.DRAWER_TYPE.EDIT}
          close={navigateToIndex}
        />
        <DeleteModal
          title={moduleInfo.title}
          deleteValues={deleteValue}
          callApi={deleteRecord}
          close={() => setDeleteValue(null)}
        />
      </ContentBox>
    </>
  );
};

export default RoleManagement;
