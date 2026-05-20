// main/authHandler.ts (or inside main.ts)
import { ipcMain } from 'electron';
import * as bcrypt from 'bcryptjs';
import { AppDataSource } from '../data-source'; // Assuming this exists
import { User } from '../entity/user';
import { generateToken } from '../utils/jwt.utils';

// Interfaces remain relevant
interface LoginForm {
    username: string;
    password: string;
}

export function userLogin() {
    ipcMain.handle('auth:login', async (event, credentials: LoginForm) => {
        const { username, password } = credentials;

        try {
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({
                where: { username: username },
                relations: { roles: true },
            });

            if (!user) {
                throw new Error('Username not found');
            }

            const isMatch: boolean = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error('Invalid Password please try again.');
            }

            const roleNames = user.roles ? user.roles.map(role => role.name).join(',') : '';
            const userInfo = {
                id: user.id,
                email: user.email,
                roles: roleNames,
            };

            const token = generateToken(userInfo);

            // Return success data directly to renderer
            return {
                success: true,
                message: 'You have successfully logged-in.',
                user: {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    username: user.username,
                    roles: roleNames,
                    isactivated: user.isactivated,
                    isblocked: user.isblocked,
                    userpic: user.userpic,
                    qrcodeurl: user.qrcodeurl,
                    token: token
                }
            };
        } catch (error) {
            // Return error to renderer to handle
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Login failed'
            };
        }
    });
}


// import * as bcrypt from 'bcryptjs';
// import {Request, Response} from 'express';
// import { AppDataSource } from '../data-source';
// import { User } from '../entity/user';

// import { generateToken } from '../utils/jwt.utils';

// interface loginForm {
//     username: string;
//     password: string;
// }

// interface JwtPayload {
//     id : number,
//     email: string,
//     roles: string
// }

// export async function userLogin(req: Request<{}, {}, loginForm>, res: Response) {

//     let {username, password } = req.body;
//     const userRepository = AppDataSource.getRepository(User);
//     const user = await userRepository.findOne({
//         where: { username: username },
//         relations: { roles: true },
//     });

//     if (user) {

//         const roleNames = user.roles ? user.roles.map(role => role.name).join(',') : '';                

//         const isMatch: boolean = await bcrypt.compare(password, user.password);
//         if (isMatch) {
//             const userInfo: JwtPayload = {
//                 id: user.id,
//                 email: user.email,
//                 roles: roleNames,
//             };
            
//               const token = generateToken(userInfo);

//             const data = {
//                 message: 'You have successfully logged-in.',
//                 id: user['id'],
//                 firstname: user['firstname'],
//                 lastname: user['lastname'],
//                 email: user['email'],
//                 username: user['username'],
//                 roles: roleNames,
//                 isactivated: user['isactivated'],
//                 isblocked: user['isblocked'],
//                 userpic: user['userpic'],
//                 qrcodeurl: user['qrcodeurl'],
//                 token: token
//             }
//             res.status(200).json(data);    
//         } else {
//             res.status(404).json({
//                 message: 'Invalid Password please try again.'
//               });    
//         }
    
//     } else {
//         res.status(404).json({
//             message: 'Username does not exists, please register.'
//           });
//     }
// }