import { gql } from "apollo-server";
import { filter, find, remove } from "lodash";

const people = [
    {
        id: "1",
        firstName: "Bill",
        lastName: "Gates",
    },
    {
        id: "2",
        firstName: "Steve",
        lastName: "Jobs",
    },
    {
        id: "3",
        firstName: "Linux",
        lastName: "Torvalds",
    },
];

const cars = [
    {
        id: "1",
        year: "2019",
        make: "Toyota",
        model: "Corolla",
        price: "40000",
        personId: "1",
    },
    {
        id: "2",
        year: "2018",
        make: "Lexus",
        model: "LX 600",
        price: "13000",
        personId: "1",
    },
    {
        id: "3",
        year: "2017",
        make: "Honda",
        model: "Civic",
        price: "20000",
        personId: "1",
    },
    {
        id: "4",
        year: "2019",
        make: "Acura ",
        model: "MDX",
        price: "60000",
        personId: "2",
    },
    {
        id: "5",
        year: "2018",
        make: "Ford",
        model: "Focus",
        price: "35000",
        personId: "2",
    },
    {
        id: "6",
        year: "2017",
        make: "Honda",
        model: "Pilot",
        price: "45000",
        personId: "2",
    },
    {
        id: "7",
        year: "2019",
        make: "Volkswagen",
        model: "Golf",
        price: "40000",
        personId: "3",
    },
    {
        id: "8",
        year: "2018",
        make: "Kia",
        model: "Sorento",
        price: "45000",
        personId: "3",
    },
    {
        id: "9",
        year: "2017",
        make: "Volvo",
        model: "XC40",
        price: "55000",
        personId: "3",
    },
];

const typeDefs = gql`
    type Person {
        id: String!
        firstName: String
        lastName: String
        cars: [Car]
    }

    type Car {
        id: String!
        personId: String!
        year: Int
        make: String
        model: String
        price: Float
    }

    type Query {
        people: [Person]
        person(id: String!): Person
        personWithCar(id: String!): Person
        cars: [Car]
    }

    type Mutation {
        addPerson(id: String!, firstName: String!, lastName: String!): Person
        updatePerson(id: String!, firstName: String, lastName: String): Person
        removePerson(id: String!): Person
        addCar(
            id: String!
            personId: String!
            year: Int!
            make: String!
            model: String!
            price: Float!
        ): Car
        updateCar(
            id: String!
            personId: String!
            year: Int
            make: String
            model: String
            price: Float
        ): Car
        removeCar(id: String!): Car
    }
`;

const resolvers = {
    Query: {
        people: () => people,
        personWithCar(parent, args, context, info) {
            return find(people, { id: args.id });
        },
        cars: () => cars,
    },
    Person: {
        cars: (person) => {
            return filter(cars, { personId: person.id });
        },
    },
    Mutation: {
        addPerson(parent, args, context, info) {
            const newPerson = {
                id: args.id,
                firstName: args.firstName,
                lastName: args.lastName,
                cars: [],
            };

            people.push(newPerson);

            return newPerson;
        },
        updatePerson(root, args) {
            const Person = find(people, { id: args.id });

            if (!Person) {
                throw new Error(`Person with id ${args.id} not found`);
            }

            Person.firstName = args.firstName;
            Person.lastName = args.lastName;

            return Person;
        },
        removePerson(root, args) {
            const removedPerson = find(people, { id: args.id });

            if (!removedPerson) {
                throw new Error(`Person with id ${args.id} not found`);
            }

            remove(people, (p) => {
                return p.id === removedPerson.id;
            });

            return removedPerson;
        },
        addCar(parent, args, context, info) {
            const newCar = {
                id: args.id,
                personId: args.personId,
                year: args.year,
                make: args.make,
                model: args.model,
                price: args.price,
            };

            cars.push(newCar);

            return newCar;
        },
        updateCar(root, args) {
            const Car = find(cars, { id: args.id });

            if (!Car) {
                throw new Error(`Car with id ${args.id} not found`);
            }

            Car.id = args.id;
            Car.personId = args.personId;
            Car.year = args.year;
            Car.make = args.make;
            Car.model = args.model;
            Car.price = args.price;

            return Car;
        },
        removeCar(root, args) {
            const removedCar = find(cars, { id: args.id });

            if (!removedCar) {
                throw new Error(`Car with id ${args.id} not found on ${cars}`);
            }

            remove(cars, (c) => {
                return c.id === removedCar.id;
            });

            return removedCar;
        },
    },
};

export { typeDefs, resolvers };
