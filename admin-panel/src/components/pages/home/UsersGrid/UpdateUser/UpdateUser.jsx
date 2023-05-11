import { Button, Form, Input, Select } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import TextArea from 'antd/es/input/TextArea';
const { Option } = Select;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
const UpdateUser = () => {
    const [error, setError] = useState(false);
    const [user, setUser] = useState({
        "status": "",
        "name": "zxczxc",
        "email": "",
        "passsword": "",
        "address": "",
        "phone": 0,
        "isAdmin": false
    });
    const [form] = Form.useForm();
    const id = localStorage.getItem("updateId");

    const onFinish = (values) => {
        if (window.confirm("Are you sure, you want to Update this user Information?")) {
            let status = "";
            try {
                axios.put('http://localhost:8000/users/' + id, values);
                console.log(values);
                status = "User Updated Succesfully";
                // navigate('../', { replace: true });
            }
            catch (error) {
                console.log(error.message);
                status = error.message;
            }
            finally {
                alert(status);
            }
        }
    };
    const onReset = () => {
        form.resetFields();
    };
    const getUser = async () => {
        try {
            // setIsLoading(true);
            const id = localStorage.getItem("updateId")
            const { data } = await axios.get('http://localhost:8000/Users/' + id);
            setUser(data);
        } catch (error) {
            setError(error.message);
        } finally {
            // setIsLoading(false);
        }
    };
    useEffect(() => {
        (async () => {
            await getUser();
        })();
    }, []);

    return (
        <>
            {form.setFieldsValue(user)};
            <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                    margin: "5% auto"
                }}
            >
                <h1 style={{ textAlign: 'center', fontWeight: 600 }}>Update User</h1>
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input type='email' />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        type="password"
                    />
                </Form.Item>
                <Form.Item
                    name="address"
                    label="Address"
                    rules={[
                        {
                            required: false,
                        },
                    ]}
                >
                    <TextArea rows={8} />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Phone"
                    rules={[
                        {
                            required: false,
                        },
                    ]}
                >
                    <Input type='number' />
                </Form.Item>
                <Form.Item
                    name="isAdmin"
                    label="IsAdmin"
                    rules={[
                        {
                            required: false,
                        },
                    ]}
                >
                    <Select>
                        <Option value={true}><CheckOutlined /> True</Option>
                        <Option value={false}><CloseOutlined /> False</Option>
                    </Select>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Update
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                    <Button type="link" htmlType="button" href='http://localhost:3000/users/'>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
export default UpdateUser;

// https://youtu.be/XxnUSZOgMLY