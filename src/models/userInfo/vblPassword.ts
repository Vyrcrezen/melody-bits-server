import { Length } from 'class-validator';

export class VblPassword {
    @Length(8, 64)
    user_password: string;

    constructor(password: string) {
        this.user_password = password;
    }
}
