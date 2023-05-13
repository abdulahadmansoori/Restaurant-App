import { Button, Form, Input, Select } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TextArea from 'antd/es/input/TextArea';
import { useNavigate } from 'react-router-dom';
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
const UpdateProduct = () => {
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        "status": "",
        "name": "zxczxc",
        "description": "",
        "price": 0,
        "image": ""
    });
    const [form] = Form.useForm();
    const id  = localStorage.getItem("updateId");

    const onFinish = (values) => {
        if (window.confirm("Are you sure, you want to Update this product Information?")) {
            let status = "";
            try {
                axios.put('http://localhost:8000/products/' + id, values);
                console.log(values);
                status = "Product Updated Succesfully";
                navigate('/products', { replace: true });
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
    const cancelBtnHandler = () => {
        navigate('/products', { replace: true });
    };
    const getProduct = async () => {
        try {
            // setIsLoading(true);
            const id = localStorage.getItem("updateId")
            const { data } = await axios.get('http://localhost:8000/products/' + id);
            setProduct(data);
        } catch (error) {
            setError(error.message);
        } finally {
            // setIsLoading(false);
        }
    };
    useEffect(() => {
        (async () => {
            await getProduct();
        })();
    }, []);

    return (
        <>
            {form.setFieldsValue(product)};
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
                <h1 style={{ textAlign: 'center', fontWeight: 600 }}>Update Product</h1>
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
                    <TextArea rows={8} />
                </Form.Item>
                <Form.Item
                    name="status"
                    label="Status"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select>
                        <Option value="Avaliable">Avaliable</Option>
                        <Option value="NotAvaliable">Not Avaliable</Option>
                    </Select>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Update
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
export default UpdateProduct;

// https://youtu.be/XxnUSZOgMLY