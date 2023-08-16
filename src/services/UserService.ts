export interface User {
    name: string
    email: string
}

const db = [
    {
        name: "Joana",
        email: "joana@dio.com",
    }
]

export class UserService {
    db: User[]

    constructor(
        database = db
    ){
        this.db = database
    }

    createUser = (name: string, email: string) => {
        const user = {
            name,
            email
        }

        this.db.push(user)
        console.log('DB atualizado', this.db)
    }

    getAllUsers = () => {
        return this.db
    }

    deleteUser = (email: string): boolean => {
        let userIndex = this.getAllUsers().findIndex(dbUser => dbUser.email === email);
        if(userIndex !== -1){
            this.getAllUsers().splice(userIndex,1);
            return true;
        }
        return false
    }
}

