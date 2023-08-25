import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppointmentService {
  prisma = new PrismaClient();
  create(createAppointmentDto: CreateAppointmentDto, userId: number) {
    return this.prisma.appointment.create({
      data: {
        name: createAppointmentDto.name,
        datetime: createAppointmentDto.date,
        users_id:+userId

      }
    })
  }

  async findAll(userId) {
    return await this.prisma.appointment.findMany({
      where:{
        users_id : +userId
      }
    })
  }

 
  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.prisma.appointment.findFirst({
      where:{
        id:id
      }
    })
    if(!appointment) {
      throw new Error("Appointment not found")
      return;
    }

    const updateAppointment = await this.prisma.appointment.update({
      where:{
        id: +appointment.id
      },
      data: {
        datetime: updateAppointmentDto.date,
        name: updateAppointmentDto.name
      }
      
    })

    return updateAppointment

  }

  async remove(id: number) {
    return await this.prisma.appointment.delete({
      where:{
        id:+id
      }
    })
  }
}
