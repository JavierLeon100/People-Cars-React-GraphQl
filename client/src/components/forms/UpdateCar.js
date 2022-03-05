import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, Select } from "antd";
import { useDebugValue, useEffect, useState } from "react";
import { ADD_CAR, GET_PEOPLE, UPDATE_CAR } from "../../queries";

const UpdateCar = (props) => {
    const [updateCar] = useMutation(UPDATE_CAR);
    const [id, setId] = useState(props.id);
    const [make, setMake] = useState(props.make);
    const [model, setModel] = useState(props.model);
    const [personId, setPersonId] = useState(props.personId);
    const [price, setPrice] = useState(props.price);
    const [year, setYear] = useState(props.year);
    const [form] = Form.useForm();
    const [, forcedUpdate] = useState();
    const { Option } = Select;

    useEffect(() => {
        forcedUpdate({});
    }, []);

    const onOwnerChange = (value) => {
        setPersonId(value);
    };

    const { loading, error, data } = useQuery(GET_PEOPLE);
    if (loading) return "Loading...";
    if (error) return `Error ${error.message}`;

    const onFinish = (values) => {
        const { price, model, make, year } = values;

        updateCar({
            variables: {
                price: parseFloat(price),
                model,
                make,
                year: parseInt(year),
                personId,
                id,
            },
            optimisticResponse: {
                __typename: "Mutation",
                updateCar: {
                    __type: "Car",
                    price,
                    model,
                    make,
                    year,
                    personId,
                    id,
                },
            },
            update: (proxy, { data: { addPerson } }) => {
                const data = proxy.readQuery({ query: GET_PEOPLE });
                proxy.writeQuery({
                    query: GET_PEOPLE,
                    data: {
                        ...data,
                        people: [...data.people, addPerson],
                    },
                });
            },
        });

        props.onButtonClick();
    };

    return (
        <Form
            form={form}
            name="update-car-form"
            onFinish={onFinish}
            layout="horizontal"
            size="large"
            style={{ margin: "40px" }}
            initialValues={{
                year: year,
                make: make,
                model: model,
                price: price,
                personId: personId,
            }}
        >
            <Form.Item
                name="year"
                rules={[
                    {
                        message: "Please input year of car",
                    },
                ]}
            >
                <Input placeholder="Year i.e. 2000" allowClear />
            </Form.Item>
            <Form.Item
                name="make"
                rules={[
                    {
                        message: "Please input make of car",
                    },
                ]}
            >
                <Input placeholder="Make i.e. Chevrolet" allowClear />
            </Form.Item>
            <Form.Item
                name="model"
                rules={[
                    {
                        message: "Please input model of car",
                    },
                ]}
            >
                <Input placeholder="Model i.e. Spark" allowClear />
            </Form.Item>
            <Form.Item
                name="price"
                rules={[
                    {
                        message: "Please price year of car",
                    },
                ]}
            >
                <Input placeholder="Price i.e. 5000" allowClear />
            </Form.Item>

            <Form.Item
                name="personId"
                rules={[{ message: "Please select owner" }]}
            >
                <Select
                    placeholder="Select The Owner"
                    onChange={onOwnerChange}
                    allowClear
                >
                    {data.people.map(({ id, firstName, lastName }) => (
                        <Option value={id} key={id}>
                            {firstName} {lastName}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button type="primary" htmlType="submit">
                        Add Car
                    </Button>
                )}
            </Form.Item>
            <Button onClick={props.onButtonClick}>Cancel</Button>
        </Form>
    );
};

export default UpdateCar;
