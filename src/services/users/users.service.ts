import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {
  prisma = new PrismaClient()
  async create(username: string, password: string, name:string) {
    

    const user = await this.prisma.users.create({
      data:{
        username:username, 
        password: password,
        name: name
      }
    })
    return user
  }

  async findOne(username){
    console.log(username)
    const email = await this.prisma.users.findUnique({
      where:{
        username:username,
        

      }
    })
    return email;
  }

  async userDetails(userId) {
    const user = await this.prisma.users.findFirst({
      where:{
        id: +userId
      },
     
    })
    return user;
  }

 



  
}
