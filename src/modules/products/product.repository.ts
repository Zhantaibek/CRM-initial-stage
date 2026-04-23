import {prisma} from '@config/db'
import { create } from 'domain'

export const productRepository = {
    create : (data : { name : string , price : number}) => {
        return prisma.product.create({ data })
    },

    findAll : () => {
        return prisma.product.findMany()
    },

    findById : (id : number) => {
        return prisma.product.findUnique({
            where :{id}
        })
    },

    update : (id : number , data : {name? : string , price? : number}) => {
        return prisma.product.update({
            where : {id},
            data
        })
    },

    delete : (id : number) => {
        return prisma.product.delete({
            where : {id}
        })
    }
}