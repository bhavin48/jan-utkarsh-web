import React, { Suspense } from "react";
import PageSpinner from "./PageSpinner/PageSpinner";
import ErrorBoundary from "antd/lib/alert/ErrorBoundary";

interface ModuleWrapProps {
  module: any;
  permissions?: any;
}

const ModuleWrap: React.FC<ModuleWrapProps> = ({ module: Module, ...rest }) => {
  // const { AUTH } = useStore();
  // AUTH.getPermission(rest?.permissionPath ? "/" + rest.permissionPath : "");
  // if (!AUTH.checkPermission(permission)) {
  //   return <RestrictedAccessPage />;
  // }

  // const permissions = AUTH.permission?.reduce(
  //   (a: any, v: any) => ({ ...a, [v]: v }),
  //   {}
  // );

  return (
    <Suspense fallback={<PageSpinner />}>
      <ErrorBoundary description={"Report the Error You Faced"}>
        <div className="mainPageWrap">
          <Module permissions={""} {...rest} />
        </div>
      </ErrorBoundary>
    </Suspense>
  );
};

export default ModuleWrap;
