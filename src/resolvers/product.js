const Product = require("../models/Product");
Product.sync();

const productResolvers = {
    Query: {
        // Obtiene todos los productos
        getProducts: async () => {
            const products = await Product.findAll();
            return products;
        },
        // Obtiene un producto por id
        getProduct: async (_, { id }) => {
            try {
                const product = await Product.findOne({
                    where: {
                        id
                    }
                });

                // Verifica que el producto exista
                if (!product) {
                    throw new Error('Product no find');
                }

                return product;
            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
        }
    },
    Mutation: {
        // Crea un nuevo producto
        createProduct: async (_, { input }) => {
            try {
                const product = await Product.create(input);
                return product;
            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
        },
        // Actualiza un producto por id
        updateProduct: async (_, { id, input }) => {
            try {
                const { name, price, description } = input;

                let product = await Product.findOne({
                    where: {
                        id
                    }
                });

                // Verifica que el producto exista
                if (!product) {
                    throw new Error('Product no find');
                }

                // product = await Product.update(input, {
                //     where: {
                //         id
                //     }
                // });
                product.name = name;
                product.price = price;
                product.description = description;

                await product.save();

                return product;
            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
        },
        // Elimina un producto por id
        deleteProduct: async (_, { id }) => {
            try {
                let product = await Product.findOne({
                    where: {
                        id
                    }
                });

                // Verifica que el producto exista
                if (!product) {
                    throw new Error('Product no find');
                }

                await Product.destroy({
                    where: {
                        id
                    }
                });

                return `The product ${product.name} was removed`;
            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
        }
    }
}

module.exports = productResolvers;