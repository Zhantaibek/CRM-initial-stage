  import { Request , Response , NextFunction} from "express";
  import * as UserModel from '../models/userModel'


  export const authMiddleware = async (
      req : Request ,
      res : Response,
      next : NextFunction
  ) => {
      try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
          return res.status(401).json({error : 'no authorization'})
        }

        if (!authHeader.startsWith('basic ')) {
          return res.status(401).json({error : 'invalid auth format'})
        }

        const base64 = authHeader.split(' ')[1]
        const decode = Buffer.from(base64 , 'base64').toString('utf-8')

        const [username , password] = decode.split(':')

        if (!username || !password){
          return res.status(401).json({error : 'invalid credential format'})
        }

        const user = await UserModel.getUserByName(username)

        if (!user)  {
          return res.status(401).json({error : 'user not found'})
        }
          
        if (user.password !== password) {
          return res.status(401).json({error : 'invalid password'})
        }

        req.user = user;

        next()
      }
      catch(err) {
          return res.status(401).json({error : 'Auth error' , detail : err})
      }
  }