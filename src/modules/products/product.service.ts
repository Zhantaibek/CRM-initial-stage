import {prisma} from '@config/db'

export const productService = {
    createProduct : async (name : string , price : number ) => {
        if (!name || price === undefined) {
            throw new Error('name and price are required')
        }

        return prisma.product.create({
            data : {
                name : name , 
                price : price
            }
        })
    },

    getProducts : async () => {
        return prisma.product.findMany()
    },

    getProductById : async (id : number) => {
        return prisma.product.findUnique({
            where : {id}
        })
    },

    updateProduct : async (id : number , data : {name? : string ,price? : number}) => {

        const product = await prisma.product.findUnique({where : {id}})

        if (!product) {
            throw new Error('product not found')
        }

        return prisma.product.update({
            where : {id} ,
            data
        })
    },

    deleteProduct : async (id : number ) => {

        const product = await prisma.product.findUnique({where : {id}})

        if (!product) {
            throw new Error ('product not found')
        }
        return prisma.product.delete({
            where : {id}
        })
    }
}