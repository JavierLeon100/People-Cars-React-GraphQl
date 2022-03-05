import { EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useState } from "react";
import UpdateCar from "../forms/UpdateCar";

const CardCar = (props) => {
    const car = props.car;
    const [editModeCar, setEditModeCar] = useState(false);

    const handleButtonCarClick = () => {
        setEditModeCar(!editModeCar);
    };

    return (
        <div>
            {editModeCar ? (
                <UpdateCar
                    style={{ marginTop: 20 }}
                    id={car.id}
                    make={car.make}
                    model={car.model}
                    personId={car.personId}
                    price={car.price}
                    year={car.year}
                    onButtonClick={handleButtonCarClick}
                />
            ) : (
                <Card
                    actions={[
                        <EditOutlined
                            key="edit"
                            onClick={handleButtonCarClick}
                        />,
                        // <RemoveCar
                        //     id={id}
                        //     firstName={firstName}
                        //     lastName={lastName}
                        // />,
                    ]}
                    style={{
                        marginTop: 10,
                    }}
                    type="inner"
                >
                    {car.year} | {car.make} | {car.model} | ${car.price}
                </Card>
            )}
        </div>
    );
};

export default CardCar;
