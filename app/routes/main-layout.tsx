import React, { useState } from "react";
import { Outlet } from "react-router";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { NavLink } from "react-router";
const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    <NavLink to="/">Quản lí tài khoản</NavLink>,
    "1",
    <PieChartOutlined />,
  ),
  getItem(
    <NavLink to="/manage-banner">Quản lí banner</NavLink>,
    "2",
    <DesktopOutlined />,
  ),
  getItem("Quản lí sản phẩm", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Quản lí sale", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Quản lí đơn hàng", "9", <FileOutlined />),
  getItem("Quản lí kho hàng", "10", <TeamOutlined />),
  getItem(
    <NavLink to="/manage-categories">Quản lí categories</NavLink>,
    "11",
    <TeamOutlined />,
  ),
  getItem(
    <NavLink to={"/manage-user"}>Quản lí người dùng</NavLink>,
    "12",
    <TeamOutlined />,
  ),
  getItem(
    <NavLink to={"/profile"}>Thông tin tài khoản</NavLink>,
    "13",
    <TeamOutlined />,
  ),
];

console.log(items);

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            borderBottom: "1px solid #d1f0eb",
          }}
        />
        <Content style={{ background: colorBgContainer }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
