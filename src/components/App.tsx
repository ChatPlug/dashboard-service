import React from "react";
import { DatePicker } from "antd";

import "../styles/index.css";

import { Layout, Menu, Breadcrumb, Icon } from "antd";
import Services from "./Services";
import ThreadGroups from "./ThreadGroups";
import Settings from "./Settings";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App extends React.Component {
  state = {
    collapsed: false,
    selectedIndex: 0,
  };

  onCollapse = (collapsed: boolean) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        <Header  className="header" style={{marginLeft: 0, backgroundColor: "#fff", display: "flex", flex:"row"}}>
          <div className="logo">
            ChatPlug Dashboard v1
          </div>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={[this.state.selectedIndex.toString()]}
            style={{ lineHeight: "64px",    marginLeft: 'auto'
          }}
          >
                        <Menu.Item
            style={{float: 'right'}}
              key="2"
              onClick={_ => this.setState({ selectedIndex: 2 })}
            >
              Settings
            </Menu.Item>

            <Menu.Item
            style={{float: 'right'}}
              key="1"
              onClick={_ => this.setState({ selectedIndex: 1 })}
            >
              Thread groups
            </Menu.Item>
            <Menu.Item
              style={{float: 'right'}}
              key="0"
              onClick={_ => this.setState({ selectedIndex: 0 })}
            >
              Services
            </Menu.Item>
          </Menu>
        </Header>
        {this.drawContent()}
      </Layout>
    );
  }

  drawContent() {
    if (this.state.selectedIndex === 0) {
      return <Services />;
    } else if (this.state.selectedIndex === 1) {
      return <ThreadGroups />;
    } else {
      return <Settings />;
    }
  }
}

export default App;
