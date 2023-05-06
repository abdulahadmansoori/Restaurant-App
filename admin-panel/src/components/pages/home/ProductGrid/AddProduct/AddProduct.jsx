import { Button, Form, Input, Select } from 'antd';
import axios from 'axios';

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
const AddProduct = () => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        if (window.confirm("Are you sure, you want to add this product?")) {
            let status ="";
            try{
                axios.post('http://localhost:8000/products/add-product', values);
                status = "Product Added Succesfully";
                form.resetFields();
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
                <h1 style={{ textAlign: 'center', fontWeight: 600 }}>Add Product</h1>
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
                    name="description"
                    label="Description"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Price"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        type="number"
                    />
                </Form.Item>
                <Form.Item
                    name="image"
                    label="Image"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Add
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                    <Button type="link" htmlType="button" href='http://localhost:3000/'>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
export default AddProduct;