import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/main.less";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import PageSpinner from "./components/PageSpinner/PageSpinner";
import store from "./store/app";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Suspense fallback={<PageSpinner />}>
    <Provider store={store}>
      <StyleProvider hashPriority="high">
        <ConfigProvider theme={{ hashed: false }}>
          <App />
        </ConfigProvider>
      </StyleProvider>
    </Provider>
  </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
