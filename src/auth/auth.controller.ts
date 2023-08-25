import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  

  @Post('signup')
  signup(
    @Body('username') username: string,
     @Body('password') password: string,
     @Body('name') name: string,
                       
    
    ){
    return this.authService.signUp(username, password, name)
  }

  @Post('login')
  login(@Body('username') username: string, @Body('password') password: string){
    return this.authService.signIn(username, password)
  }

  



}
