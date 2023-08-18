import { UserController } from "./UserController";
import { UserService } from '../services/UserService'
import { Request, response } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import { makeMockRequest } from "../__mocks__/mockRequest.mock";

const mockUserService = {
    createUser: jest.fn(),
    getUser: jest.fn()
}

jest.mock('../services/UserService', () =>{
    return {
        UserService: jest.fn().mockImplementation(() => {
            return mockUserService;
        })
    }
});
const mockResponse = makeMockResponse();

describe('UserController', () => {

    const userController = new UserController();

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Nath',
                email: 'nath@test.com',
                password: '12345'
            }
        } as Request
        
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
    })
    it('Erro ao não informar o name', () => {
        const mockRequest = {
            body: {
                name: '',
                email: 'nath@test.com',
                password: '12345'
            }
        } as Request

        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Name, email e password obrigatórios!' })
    })
    it('Erro ao não informar o email', () => {
        const mockRequest = {
            body: {
                name: 'Nath',
                email: '',
                password: '12345'
            }
        } as Request
       
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Name, email e password obrigatórios!' })
    })
    it('Erro ao não informar o password', () => {
        const mockRequest = {
            body: {
                name: 'Nath',
                email: 'nath@test.com',
                password: ''
            }
        } as Request
       
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Name, email e password obrigatórios!' })
    })
   
    it('Deve retomar o usuário com o userId informado',()=>{
        const mockRequest = makeMockRequest({
            params: {
                userId:'123',
            }
        })
     
        userController.getUser(mockRequest, mockResponse);
        expect(mockUserService.getUser).toHaveBeenCalledWith('123');
        expect(mockResponse.state.status).toBe(200);
        
    })
})
