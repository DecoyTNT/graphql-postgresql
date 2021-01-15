const { gql } = require('apollo-server');

// Product Schema
const productTypeDefs = gql`

    type Product {
        id: ID
        name: String
        price: Float
        description: String
    }

    input ProductInput {
        name: String!
        price: Float!
        description: String
    }

    type Query {
        getProducts: [Product]
        getProduct(id: ID!): Product
    }

    type Mutation {
        createProduct(input: ProductInput): Product
        updateProduct(id: ID!, input: ProductInput): Product
        deleteProduct(id: ID!): String
    }
`;

module.exports = productTypeDefs;