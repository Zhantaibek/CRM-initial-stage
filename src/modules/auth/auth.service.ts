import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { env }from '@config/env'
import { prisma } from '@config/db'


export const authService = {

  signup : async (name : string , email : string , password : string) => {
   const hashedPassword = await bcrypt.hash(password , 10)
   return prisma.user.create({
    data : {name , email , password : hashedPassword}
   })
  },

  login : async (email : string , password : string) => {
    const user = await prisma.user.findUnique({where : {email}})
    if (!user || !user.password) {
      throw new Error ('invalid credential')
    }

    const isValid = await bcrypt.compare(password , user.password)
    if (!isValid) {
      throw new Error ('invalid credential')
    }

    const token = jwt.sign({userId : user.id} , env.JWT_SECRET , {expiresIn : '1h'})
    return {user , token}
  }
}