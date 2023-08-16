import { UserController } from "./UserController";
import { UserService } from '../services/UserService'
import { Request, response } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn(),
        deleteUser: jest.fn()
       
    }

    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Nath',
                email: 'nath@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
    })
    it('Erro ao não informar o name', () => {
        const mockRequest = {
            body: {
                name: '',
                email: 'nath@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Name obrigatório' })
    })
    it('Erro ao não informar o email', () => {
        const mockRequest = {
            body: {
                name: 'Alex',
                email: ''
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Email obrigatório' })
    })
    it('A função getAllUser do userService deve ser chamada ', () => {

        const mockRequest = {
            body: {
                name: 'Nath',
                email: 'nath@test.com'
            }
        } as Request

        const mockResponse = makeMockResponse();
        userController.getAllUsers(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(200);
        expect(mockUserService.getAllUsers).toBeCalled;

    })
    it('A função deve deletar um usuario se email válido e estar no db', () => {
        const mockRequest = {
            body: {
                name: 'Alex',
                email: 'alex@test.com'
            }
        } as Request
       
        mockUserService.deleteUser = jest.fn().mockReturnValue(true)
         
        const mockResponse = makeMockResponse();
        userController.deleteUser(mockRequest, mockResponse);
        expect(mockUserService.deleteUser).toBeCalledWith(mockRequest.body.email);
        expect(mockResponse.state.status).toBe(200);
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário deletado' });
    })
    it('A função não deve deletar um usuario se email válido e não estar no db', () => {
        const mockRequest = {
            body: {
                name: 'Alex',
                email: 'alex@test.com'
            }
        } as Request
       
        mockUserService.deleteUser = jest.fn().mockReturnValue(false)
         
        const mockResponse = makeMockResponse();
        userController.deleteUser(mockRequest, mockResponse);
        expect(mockUserService.deleteUser).toBeCalledWith(mockRequest.body.email);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário não encontrado' });
    })
    it('A função não deve deletar usuário caso não informe o email', () => {
        const mockRequest = {
            body: {
                name: 'Alex',
                email: ''
            }
        } as Request
       
        const mockResponse = makeMockResponse();
        userController.deleteUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Email obrigatório' });
        expect(mockUserService.deleteUser).not.toBeCalledWith(mockRequest.body.email);
    })
})
