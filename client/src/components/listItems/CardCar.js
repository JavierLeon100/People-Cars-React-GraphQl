import { EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useState } from "react";
import RemoveCar from "../buttons/RemoveCar";
import UpdateCar from "../forms/UpdateCar";

const CardCar = (props) => {
    const [id, setId] = useState(props.car.id);
    const [make, setMake] = useState(props.car.make);
    const [model, setModel] = useState(props.car.model);
    const [personId, setPersonId] = useState(props.car.personId);
    const [price, setPrice] = useState(props.car.price);
    const [year, setYear] = useState(props.car.year);
    const [editModeCar, setEditModeCar] = useState(false);

    const handleButtonCarClick = () => {
        setEditModeCar(!editModeCar);
    };

    const updateStateVariable = (variable, value) => {
        switch (variable) {
            case "id":
                setId(value);
                break;
            case "make":
                setMake(value);
                break;
            case "model":
                setModel(value);
                break;
            case "personId":
                setPersonId(value);
                break;
            case "price":
                setPrice(value);
                break;
            case "year":
                setYear(value);
                break;
            default:
                break;
        }
    };

    return (
        <div>
            {editModeCar ? (
                <UpdateCar
                    style={{ marginTop: 20 }}
                    id={id}
                    make={make}
                    model={model}
                    personId={personId}
                    price={price}
                    year={year}
                    onButtonClick={handleButtonCarClick}
                    updateStateVariable={updateStateVariable}
                />
            ) : (
                <Card
                    actions={[
                        <EditOutlined
                            key="edit"
                            onClick={handleButtonCarClick}
                        />,
                        <RemoveCar
                            id={id}
                            make={make}
                            model={model}
                            personId={personId}
                            price={price}
                            year={year}
                        />,
                    ]}
                    style={{
                        marginTop: 10,
                        width: "400px",
                    }}
                    type="inner"
                >
                    {year} | {make} | {model} | ${price}
                </Card>
            )}
        </div>
    );
};

export default CardCar;
