import { FileOutlined, PieChartOutlined, UserOutlined, TeamOutlined, DesktopOutlined} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import ProductGrid from '../ProductGrid/ProductGrid';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Products', '1', <PieChartOutlined />),
  getItem('Users', '2', <TeamOutlined />),
  getItem('Admins', 'sub1', <UserOutlined />),
//   getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
//   getItem('Files', '9', <FileOutlined />),
];
const Panel = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        {/* <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
          }}><div/> */}
          <div style={{
            height: 32,
            margin: 16,
            paddingTop:8,
            background: 'rgba(255, 255, 255, 0.2)',
            color: "white",
            textAlign:"center",
            fontWeight:900,
          }}>Admin Panel</div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout" style={{
              background: colorBgContainer,}}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {/* <Switch>

            </Switch> */}
            <ProductGrid/>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Panel;