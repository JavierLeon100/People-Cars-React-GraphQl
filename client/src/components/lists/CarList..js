import { List } from "antd";
import CardCar from "../listItems/CardCar";

const getStyles = () => ({
    list: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
    },
});

const CarList = (props) => {
    const styles = getStyles();

    const cars = props.cars;

    return (
        <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
            {cars.length > 0
                ? cars.map((car, id) => (
                      <List.Item key={id} style={{ width: "100%" }}>
                          <CardCar car={car} key={id} />
                      </List.Item>
                  ))
                : "This person has no cars 🏎"}
        </List>
    );
};

export default CarList;
