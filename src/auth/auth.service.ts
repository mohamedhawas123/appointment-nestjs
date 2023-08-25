import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { UsersService } from 'src/services/users/users.service';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  private generateToken(userId) {
    const payload = { userId };
    const token = sign(payload, '654987')
    return token
  }


  async signUp(username: string, password: string, name: string) {
    const existUser=  await this.userService.findOne(username)
    if(existUser) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'User with the given username already exists',
        },
        HttpStatus.CONFLICT,
      );
    }else {
      const hashedPassword = await hash(password, 10)
      const newUser = await this.userService.create(username, hashedPassword, name);
      const token = this.generateToken(newUser.id)
      return {
        
        id:newUser.id,
        accessToken: token,
        name: newUser.name,
        username:newUser.username,
      

      }
    }
  }


  async signIn(username: string, password: string) {

    const user = await this.userService.findOne(username)

    if(!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User Not Found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const isPsswordValid = await compare(password, user.password)
    if(!isPsswordValid) {
      throw new Error("Wrong password")
    }
    const token  = this.generateToken(user.id)
    return {
      id:user.id,

      accessToken: token,
      name: user.name,
      username:user.username,
   


    }

  }
}
