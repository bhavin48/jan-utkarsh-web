import React from "react";
import ViewButton from "./Buttons/ViewButton";
import EditButton from "./Buttons/EditButton";
import DeleteButton from "./Buttons/DeleteButton";
import { ButtonProps } from "../Buttons/interface/ButtonInterface";
import LockButton from "./Buttons/LockButton";
import { checkPrivileges } from "../../config/Global";
import { useAppSelector } from "../../store/app";

interface ActionButtonsProps {
  data: any;
  view?: ButtonProps;
  edit?: ButtonProps;
  deleteButton?: ButtonProps;
  lock?: ButtonProps;
  viewInterestAssessment?: ButtonProps;
  viewSkillAssessment?: ButtonProps;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  data,
  lock,
  view,
  deleteButton,
  edit,
  viewInterestAssessment,
  viewSkillAssessment,
}) => {
  const userDetail = useAppSelector(state => state.auth.userDetail);
  return (
    <div className="action-column">
      {lock?.action && (
        <LockButton
          data={data?.data}
          permission={checkPrivileges(userDetail, lock.permissionKey)}
          {...lock}
        />
        
      )}
      {viewInterestAssessment?.action && (
        <ViewButton
          data={data?.data}
          permission={checkPrivileges(
            userDetail,
            viewInterestAssessment.permissionKey
          )}
          title="View Interest Assessment Results"
          iconProps={{ icon: "InterestAssessment" }}
          {...viewInterestAssessment}
        />
      )}
      {viewSkillAssessment?.action && (
        <ViewButton
          data={data?.data}
          permission={checkPrivileges(
            userDetail,
            viewSkillAssessment.permissionKey
          )}
          title="View Skill Assessment Results"
          iconProps={{ icon: "SkillAssessment" }}
          {...viewSkillAssessment}
        />
      )}
      {view?.action && (
        <ViewButton
          data={data?.data}
          permission={checkPrivileges(userDetail, view.permissionKey)}
          {...view}
        />
      )}
      {edit?.action && (
        <EditButton
          data={data?.data}
          permission={checkPrivileges(userDetail, edit.permissionKey)}
          {...edit}
        />
      )}
      {deleteButton?.action && (
        <DeleteButton
          data={data?.data}
          permission={checkPrivileges(userDetail, deleteButton.permissionKey)}
          {...deleteButton}
        />
      )}
    </div>
  );
};

export default ActionButtons;
