import {prisma} from '@config/db'

export const userService = {
    createUser: async (name: string, email: string) => {
        if (!name || !email) {
            throw new Error('Name and email are required');
        }

        return prisma.user.create({
            data: {
                name: name,
                email: email, 
            }
        });
    },

    getUsers : async() => {
        return prisma.user.findMany()
    },

    getUserById : async (id : number) => {
        return prisma.user.findUnique({
            where : {id} 
        })
    },

    updateUser : async (id : number , data : {name?: string , email? : string}) =>{

        const user = await prisma.user.findUnique({where : {id}})

        if (!user) {
            throw new Error ('user not found')
        }
        return prisma.user.update({
            where : {id},
            data
        })
    },
    deleteUser : async (id : number) => {

        const user = await prisma.user.findUnique({where : {id}})

        if (!user) {
            throw new Error ('user not found')
        }
        return prisma.user.delete({
            where : {id}
        })
    }
}