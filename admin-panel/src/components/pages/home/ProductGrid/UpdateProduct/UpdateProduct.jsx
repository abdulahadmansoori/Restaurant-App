import { Button, Form, Input, Select } from 'antd';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
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
const UpdateProduct = () => {
    const [error, setError] = useState(false);
    const [products, setProduct] = useState([]);
    const [form] = Form.useForm();
    const { id } = params.id;
    console.log(id);
    const onFinish = (values) => {
        // if (window.confirm("Are you sure, you want to Update this product Information?")) {
        //     let status = "";
        //     try {
        //         axios.put('http://localhost:8000/products/update-product', values);
        //         status = "Product Updated Succesfully"
        //     }
        //     catch (error) {
        //         console.log(error.message);
        //         status = error.message;
        //     }
        //     finally {
        //         alert(status);
        //     }
        // }
    };

    const onReset = () => {
        form.resetFields();
    };
    // const getProduct = async () => {
    //     try {
    //         // setIsLoading(true);
    //         // const data = axios.get('http://localhost:8000/products/update-product/' + id);
    //         // console.log(data.success);
    //         console.log(id)
    //         // setProduct(data);
    //     } catch (error) {
    //         setError(error.message);
    //     } finally {
    //         // setIsLoading(false);
    //     }
    // };
    // useEffect(() => {
    //     (async () => {
    //       await getProduct();
    //     })();
    //   }, []);

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
                    <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Update
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                    <Button type="link" htmlType="button" href='http://localhost:3000/'>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
            {/* {getProduct()}; */}
        </>
    );
}
export default UpdateProduct;