import { Injectable } from '@nestjs/common';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}
  async create(createStudentInput: CreateStudentInput): Promise<Student> {
    const student = this.studentRepository.create(createStudentInput);
    return await this.studentRepository.save(student);
  }

  async findAll(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  async findOne(id: string): Promise<Student> {
    return await this.studentRepository.findOne(id);
  }

  async update(id: string, updateStudentInput: UpdateStudentInput) {
    await this.studentRepository.update({ id }, updateStudentInput);
    return await this.studentRepository.findOne({ id });
  }

  async remove(id: string) {
    await this.studentRepository.delete({ id });
    return { deleted: true };
  }
}
