import ApiError from '../../common/utils/api-error.js';
import { generateResetToken } from '../../common/utils/jwt.utils.js';
import User from './auth.model.js';


const register = async({name, email, password, role}) => {
    const existing = await User.findOne({email})

    if(existing) throw ApiError.conflict("Email( with this user already exists!");

    const {rawToken, hashedToken} = generateResetToken();

    const user = await User.create({
        name, 
        email,
        password,
        role,
        verificationToken: hashedToken
    })

    //TODO : send an email to the user with token : rawToken

    //if there's some data about user that i don't want from the DB
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.verificationToken;

    return user;
}

export { register };