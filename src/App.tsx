import React, { useEffect } from "react";
import { BrowserRouter} from "react-router-dom";
import Router from "./config/RouterConfig";
import { initialAppOptions } from "./store/AuthSlice";
import PageSpinner from "./components/PageSpinner/PageSpinner";
import { handleStorageEvents } from "./config/Global";
import { useAppDispatch, useAppSelector } from "./store/app";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const appLoading = useAppSelector(state => state.auth.appLoading);

  useEffect(() => {
    dispatch(initialAppOptions()).catch((error: any) => error);
    window.addEventListener("storage", handleStorageEvents);
  }, [dispatch]);

  return (

    <BrowserRouter>
      {appLoading ? <PageSpinner /> : <Router />}
    </BrowserRouter>
  );
}

export default App;
