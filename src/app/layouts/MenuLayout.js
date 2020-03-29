import React from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { Layout, Menu, Avatar, Dropdown, PageHeader } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined, PoweroffOutlined } from "@ant-design/icons";
import items from "../../_nav.js";
import routes from "../../routes";
const { Header, Content, Sider } = Layout;

class MenuLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            broken: false,
            crumbs: this.getCrumbs(this.props.match)
        };
    }
    getCrumbs(match) {
        return routes
            .filter(({ path }) => match.path.includes(path))
            .map(({ path, ...rest }) => ({
                path: Object.keys(match.params).length
                    ? Object.keys(match.params).reduce(
                          (path, param) => path.replace(`:${param}`, match.params[param]),
                          path
                      )
                    : path,
                breadcrumbName: rest.name
            }));
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

    renderMenuItems() {
        return items.map((item, index) => {
            if (item.items)
                return (
                    <Menu.SubMenu
                        key={index}
                        title={
                            <span>
                                {React.cloneElement(item.icon, {})}
                                <span className="nav-text">{item.title}</span>
                            </span>
                        }>
                        {item.items.map((i, key) => {
                            return (
                                <Menu.Item key={index}>
                                    <Link to={i.url}>
                                        {React.cloneElement(i.icon, {})}
                                        <span className="nav-text">{i.title}</span>
                                    </Link>
                                </Menu.Item>
                            );
                        })}
                    </Menu.SubMenu>
                );
            else
                return (
                    <Menu.Item key={index}>
                        <Link to={item.url}>
                            {React.cloneElement(item.icon, {})}
                            <span className="nav-text">{item.title}</span>
                        </Link>
                    </Menu.Item>
                );
        });
    }

    overlay() {
        return (
            <Menu>
                <Menu.Item key="1">
                    <PoweroffOutlined />
                    Logout
                </Menu.Item>
            </Menu>
        );
    }

    render() {
        return (
            <React.Fragment>
                {!this.props.user && <Redirect to="/login" />}
                <Layout style={{ height: "100vh" }}>
                    <Sider
                        breakpoint="sm"
                        zeroWidthTriggerStyle={{ display: "none" }}
                        onBreakpoint={broken => {
                            this.setState({ broken, collapsed: broken });
                        }}
                        collapsedWidth={this.state.broken ? 0 : 80}
                        collapsible
                        collapsed={this.state.collapsed}>
                        <div className="logo" />
                        <Menu theme={"dark"} mode="inline">
                            {this.renderMenuItems()}
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header
                            style={{
                                padding: 0,
                                background: "white",
                                boxShadow: "0 1px 4px rgba(0,21,41,.08)"
                            }}>
                            <React.Fragment>
                                {React.createElement(
                                    this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                                    {
                                        className: "trigger",
                                        onClick: this.toggle
                                    }
                                )}
                                <div style={{ float: "right", paddingRight: 16 }}>
                                    <Dropdown overlay={this.overlay()}>
                                        <Avatar
                                            size="large"
                                            src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
                                        />
                                    </Dropdown>
                                </div>
                            </React.Fragment>
                        </Header>
                        <PageHeader
                            style={{ background: "white" }}
                            breadcrumb={{ routes: this.state.crumbs }}
                        />
                        <Content style={{ margin: "24px 16px 0" }}>
                            {this.props.children ? (
                                <div className="site-layout-content" style={{ padding: 24 }}>
                                    {this.props.children}
                                </div>
                            ) : null}
                        </Content>
                    </Layout>
                </Layout>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = () => {
    return {};
};

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(withRouter(MenuLayout));
