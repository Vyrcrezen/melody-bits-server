import { validate } from "class-validator";
import { VblPassword } from "../../models/userInfo/vblPassword";

export async function validatePassword(password: string) {

    const vblPassword = new VblPassword(password);

    const validationResult = await validate(vblPassword);

    return validationResult;
}
