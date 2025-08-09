import { Outlet } from "react-router";
import { ConfigProvider } from "antd";
import "./app.css";
import React from "react";

const App: React.FC = () => (
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
          colorPrimary: "#1abc9c",
          controlHeight: 45,
        },
        Typography: {},
      },
    }}
  >
    <Outlet />
  </ConfigProvider>
);

export default App;
