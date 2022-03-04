import { gql } from "@apollo/client";

export const GET_PEOPLE = gql`
    {
        people {
            id
            firstName
            lastName
            cars {
                id
                personId
                year
                make
                model
                price
            }
        }
    }
`;

export const ADD_PERSON = gql`
    mutation AddPerson($id: String!, $firstName: String!, $lastName: String!) {
        addPerson(id: $id, firstName: $firstName, lastName: $lastName) {
            id
            firstName
            lastName
        }
    }
`;

export const ADD_CAR = gql`
    mutation addCar(
        $addCarId: String!
        $personId: String!
        $year: Int!
        $make: String!
        $model: String!
        $price: Float!
    ) {
        addCar(
            id: $addCarId
            personId: $personId
            year: $year
            make: $make
            model: $model
            price: $price
        ) {
            price
            model
            make
            year
            personId
            id
        }
    }
`;

export const UPDATE_PERSON = gql`
    mutation UpdatePerson(
        $id: String!
        $firstName: String!
        $lastName: String!
    ) {
        updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
            id
            firstName
            lastName
        }
    }
`;

export const REMOVE_PERSON = gql`
    mutation RemovePerson($id: String!) {
        removePerson(id: $id) {
            id
            firstName
            lastName
        }
    }
`;
