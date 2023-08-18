import { makeMockRequest } from "../__mocks__/mockRequest.mock";
import { UserService } from "./UserService";
import * as jwt from 'jsonwebtoken';

jest.mock('../repositories/UserRepository');
jest.mock('../database', () => {
    initialize: jest.fn()
})
jest.mock('jsonwebtoken');


const mockUserRepository = require('../repositories/UserRepository');

const mockUser = {
    user_id: '123',
    name: 'nath',
    password: '12345',
    email: 'nath@test.com'
}


describe('UserService', () => {

    const userService = new UserService(mockUserRepository);

    it('Deve adicionar um novo usuário', async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve({
            user_id: '123',
            name: 'nath',
            password: '12345',
            email: 'nath@test.com'
        }))
        const response = await userService.createUser('nath', 'nath@test.com', '12345');
        expect(mockUserRepository.createUser).toHaveBeenCalled();
        expect(response).toMatchObject({
            user_id: '123',
            name: 'nath',
            password: '12345',
            email: 'nath@test.com'
        })
    })

    it('Deve retornar um token de usuário', async () => {
        jest.spyOn(userService, 'getAutheticatedUser').mockImplementation(() => Promise.resolve(mockUser));
        jest.spyOn(jwt, 'sign').mockImplementation(() => 'token');
        const token = await userService.getToken('nath@test.com', '123456');
        expect(token).toBe('token');
    })

    it('Deve retornar um erro, caso não encontre um user', async ()=>{
        jest.spyOn(userService, 'getAutheticatedUser').mockImplementation(() => Promise.resolve(null));
        await expect(userService.getToken('invalid@test.com','password')).rejects.toThrow(new Error('Email/password invalid'))
    })
   
})
