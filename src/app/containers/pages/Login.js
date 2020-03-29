import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../actions";

//Components
import { Form, Input, Button, Checkbox, Card, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false
        };
    }

    onFinish = values => {
        this.setState({ isAuthenticated: true });
        this.props.login({ username: values.username });
    };

    render() {
        return (
            <div>
                {this.state.isAuthenticated && <Redirect to="/" />}
                <Row justify="center" align="middle" style={{ height: "100vh" }}>
                    <Col sm={12} md={5}>
                        <Card title="Login" bordered={false}>
                            <Form
                                name="normal_login"
                                className="login-form"
                                initialValues={{ remember: true }}
                                onFinish={this.onFinish}>
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, message: "Please enter your Username!" }]}>
                                    <Input
                                        prefix={<UserOutlined className="site-form-item-icon" />}
                                        placeholder="Username"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: "Please enter your Password!" }]}>
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <Checkbox>Remember me</Checkbox>
                                    </Form.Item>
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Log in
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapDispatchToProps = () => {
    return { login };
};

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(Login);
