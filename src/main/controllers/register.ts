import "reflect-metadata"; 
import {Request, Response} from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/user';
import { Role } from '../entity/role';
import * as bcrypt from 'bcryptjs';

interface registrationForm {
    firstname: string;
    lastname: string;
    email: string;
    mobile: string;
    username: string;
    password: string;
}
export async function userRegistration(req: Request<{}, {}, registrationForm>, res: Response) {

    let { firstname, lastname, email, mobile ,username, password } = req.body;
    
    const userRepository = AppDataSource.getRepository(User);
    const roleRepository = AppDataSource.getRepository(Role);

    
    try {

        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        const userEmail = userRepository.findOneBy({ email: email });        
        if (!userEmail) {
            res.status(404).json({
                message: 'Email Address is already taken.'
              });
        }

        const userName = userRepository.findOneBy({username: username});
        if (!userName) {
            res.status(404).json({
                message: 'Username is already taken.'
              });
        }

        let adminRole = await roleRepository.findOneBy({ name: 'ROLE_USER' });
        if (!adminRole) {
            adminRole = await roleRepository.save(roleRepository.create({ name: 'ROLE_USER' }));
        }

        const user = new User();
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        user.mobile = mobile;
        user.username = username;
        user.password = hash;
        user.isactivated = true;
        user.isblocked = false;
        user.roles = [adminRole]; 
        user.userpic = 'pix.png';
        await userRepository.save(user);

        res.status(200).json({
            message: 'You have registered successfully, please login now.'
          });
  
    } catch(error: any) {
        res.status(400).json({
            message: error.message
          });
    }

}

