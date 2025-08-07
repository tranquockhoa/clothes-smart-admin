import { Outlet } from "react-router";
import { ConfigProvider } from "antd";
import "./app.css";
import React from "react";

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      token: {
        borderRadius: 5,
      },
      components: {
        Button: {
          colorPrimary: "#1890ff",
          algorithm: true, // Enable algorithm
        },
        Input: {
          colorPrimary: "#1890ff",
          algorithm: true, // Enable algorithm
        },
      },
    }}
  >
    <Outlet />
  </ConfigProvider>
);

export default App;
