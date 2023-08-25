import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './services/users/users.module';
import { AppointmentModule } from './services/appointment/appointment.module';

@Module({
  imports: [AuthModule, UsersModule, AppointmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
