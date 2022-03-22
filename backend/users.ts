export class User {
    constructor(public email: string, public name: string, private password: string){}

    matches(another: User): boolean {
        return another !== undefined && another.email === this.email && another.password === this.password
    }

}

// para como chave e valor
export const users: { [key: string]: User } = {
    "juliana@email.com": new User('juliana@email.com', 'Juliana', 'juliana23'),
    "amanda@email.com": new User('amanda@email.com', 'Amanda', 'amanda21'),

}