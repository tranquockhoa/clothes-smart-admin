import { Outlet } from "react-router";
import { ConfigProvider } from "antd";
import "./app.css";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "@ant-design/v5-patch-for-react-19";

const App: React.FC = () => (
  <Provider store={store}>
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 5,
          colorPrimary: "#16a085",
          colorLink: "#16a085",
        },
        components: {
          Button: {
            colorPrimary: "#16a085",
            controlHeight: 45,
            boxShadow: "none",
          },
          Input: {
            colorPrimary: "#1677ff",
            controlHeight: 45,
          },
          Typography: {},
        },
      }}
    >
      <Outlet />
    </ConfigProvider>
  </Provider>
);

export default App;
