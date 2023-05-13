import { Button, Form, Input, Select } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate()
    const onFinish = (values) => {
        if (window.confirm("Are you sure, you want to add this product?")) {
            let status ="";
            try{
                axios.post('http://localhost:8000/products/add-product', values);
                status = "Product Added Succesfully";
                form.resetFields();
                navigate('/products');
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
    const cancelBtnHandler = () => {
        navigate('/products', { replace: true });
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
                    margin: "5% auto",
                    marginBottom:"10%"
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
                    <Button onClick={cancelBtnHandler}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
export default AddProduct;