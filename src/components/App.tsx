import React from "react";
import { DatePicker } from "antd";

import "../styles/index.css";

import { Layout, Menu, Breadcrumb, Icon } from "antd";
import Services from "./Services";
import ThreadGroups from "./ThreadGroups";
import Settings from "./Settings";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App extends React.Component {
  state = {
    collapsed: false,
    selectedIndex: 0
  };

  onCollapse = (collapsed: boolean) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Router>
        <Layout style={{ height: "100vh" }}>
          <Header
            className="header"
            style={{
              marginLeft: 0,
              backgroundColor: "#fff",
              display: "flex",
              flex: "row"
            }}
          >
            <div className="logo">ChatPlug Dashboard v1</div>
            <Menu
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={[this.state.selectedIndex.toString()]}
              style={{ lineHeight: "64px", marginLeft: "auto" }}
            >
              <Menu.Item key="2">
                Settings
                <Link to="/settings" />
              </Menu.Item>

              <Menu.Item key="1">
                Thread groups
                <Link to="/groups" />
              </Menu.Item>
              <Menu.Item key="0">
                Services
                <Link to="/services" />
              </Menu.Item>
            </Menu>
          </Header>
          <Route path="/groups" component={ThreadGroups} />
          <Route path="/services" component={Services} />
          <Route path="/settings" component={Settings} />
        </Layout>
      </Router>
    );
  }
}

export default App;
