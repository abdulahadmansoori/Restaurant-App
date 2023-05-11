import { Button, Form, Input, Select } from 'antd';
import axios from 'axios';
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
const AddUser = () => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        if (window.confirm("Are you sure, you want to add this User?")) {
            let status ="";
            try{
                axios.post('http://localhost:8000/users/add-user', values);
                status = "User Added Succesfully";
                console.log(values);
                // form.resetFields();
            }
            catch(error){
                console.log(error.message);
                status = error.message;
            }
            finally{
                alert(status);
            }
        }
    };
    const onReset = () => {
        form.resetFields();
    };
    return (
        <>
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
                <h1 style={{ textAlign: 'center', fontWeight: 600 }}>Add User</h1>
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
                    <Input type='email'/>
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
                    <Input />
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
                    <Input type='number'/>
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
                    {/* <Input type='checkbox' value={false}/> */}
                    <Select>
                        <Option value={true}>True</Option>
                        <Option value={false}>False</Option>
                    </Select>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Add
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                    <Button type="link" htmlType="button" href='http://localhost:3000/Users'>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
export default AddUser;