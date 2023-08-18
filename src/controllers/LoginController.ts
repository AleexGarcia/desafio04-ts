import{Request, Response} from 'express'
import {sign} from 'jsonwebtoken';
import { UserService } from '../services/UserService';


export class LoginController {

    userService: UserService;

    constructor(
        userService = new UserService()
    ){
        this.userService = userService;
    }

    login = async (request: Request, response: Response) => {
        const {email, password} = request.body;
        
        try{
            if(!email || !password){
              throw new Error('Email e password devem ser informados');
            } 
            const token = await this.userService.getToken(email, password);
            return response.status(200).json({token});
        }catch(err){
            return response.status(500).json({message: 'Email/password invalid'});
        }

    }
    
}