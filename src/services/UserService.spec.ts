import { User, UserService } from "./UserService";

describe('UserService', () => {
    const mockDb: User[] = []
    const userService = new UserService(mockDb);

    it('Deve adicionar um novo usuário', () => {
        const mockConsole = jest.spyOn(global.console, 'log')
        userService.createUser('nath', 'nath@test.com');
        expect(mockConsole).toHaveBeenCalledWith('DB atualizado', mockDb)
    })
    it('Deve remover o usuário com email correspondente e retornar verdadeiro', () => {
        const user =
        {
            name: "alex",
            email: "alex@dio.com",
        };
        userService.createUser(user.name,user.email);
        let lenghtDb = mockDb.length;
        const retorno = userService.deleteUser(user.email);

        expect(retorno).toBeTruthy();
        expect(mockDb.length).toBe(lenghtDb - 1);
    })
    it('E-mail inválido, nenhum usuário deve ser removido e deve retornar false', () => {
        const user =
        {
            name: "alex",
            email: "alex@dio.com",
        };
        
        userService.createUser(user.name,user.email);
        let lenghtDb = mockDb.length;
        const retorno = userService.deleteUser('email_invalido@dio.com');
        expect(retorno).toBeFalsy();

        expect(mockDb.length).toBe(lenghtDb);
    })

})
