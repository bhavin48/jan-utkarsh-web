import React, { useEffect, useState } from "react";
import ToolBar from "../../components/ToolBar";
import CreateButton from "../../components/ToolBar/Buttons/CreateButton";
import ContentBox from "../../components/ContentBox/ContentBox";
import AddComponent from "./conponents/AddComponent";
import { UserBreadcrumbB } from "../../config/BreadcrumbConfig"; 
import { CONSTANT } from "../../config/Constant";   
import { toUpperCaseWithUnderscore } from "../../components/AgGridWrapper/utils/commonFunctions"; 
import { checkPrivileges } from "../../config/Global";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../store/app";
import List from "./Listing/List";
// import { Button } from "antd";


const moduleInfo = {
    title: "ethnicities",
    permissionKeyPrefix: toUpperCaseWithUnderscore("ETHNICITY"),
    indexRoute: "/ethnicities",
  };

  
  
  const UserManagementB: React.FC<any> = () => {

    const userDetail = useAppSelector((state) => state.auth.userDetail)
    const [visibleDrawer, setVisibleDrawer] = useState<string | null>(null);
    const {action , id} = useParams()
    const navigate = useNavigate()

    const navigateToIndex = () => {
        // setDetails(null);
        setVisibleDrawer(null);
        navigate(`${moduleInfo.indexRoute}`);
      };

      useEffect(() =>{
        if(action){
            if(action === CONSTANT.DRAWER_TYPE.ADD && !checkPrivileges(userDetail, `${moduleInfo.permissionKeyPrefix}_CREATE`)){
                navigateToIndex()
                return
            }

            if (!id && action) {
                setVisibleDrawer(action);
              } else {
                navigateToIndex();
              }
        }
      },[action, id])
    return (
      <>
        <ToolBar breadcrumbs={UserBreadcrumbB}>
        <CreateButton
          action={() =>
            navigate(`${moduleInfo.indexRoute}/${CONSTANT.DRAWER_TYPE.ADD}`)
          }
          permissionKey={`${moduleInfo.permissionKeyPrefix}_CREATE`}
        />
        </ToolBar>
      
        <ContentBox>
        <List
          moduleInfo={moduleInfo}
        />
        <AddComponent 
          titleName={moduleInfo.title}
          open={visibleDrawer === CONSTANT.DRAWER_TYPE.ADD}
          close={navigateToIndex}
        />
        </ContentBox>
      </>
    )
  }
  
  export default UserManagementB