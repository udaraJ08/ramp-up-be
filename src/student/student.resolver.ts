import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import * as Joi from '@hapi/joi';
import { HttpStatus } from '@nestjs/common';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => Student, { name: 'createStudent' })
  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    const schema = Joi.object({
      name: Joi.string().required(),
      gender: Joi.string().required(),
      address: Joi.string().required(),
      mobile_no: Joi.string().required(),
      dob: Joi.date().iso(),
    });
    const validation = schema.validate(createStudentInput);
    if (validation.error) {
      // response.status(401).send(validation.error);
      return validation.error;
    } else {
      const studentModal: CreateStudentInput = validation.value;
      try {
        const student = await this.studentService.create(studentModal);
        if (student) {
          return student;
        }
      } catch (error) {
        console.log(error);
        return error;
      }
    }
  }

  @Query(() => [Student], { name: 'getAllStudent' })
  async findAll() {
    try {
      return await this.studentService.findAll();
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Query(() => [Student], { name: 'findOneStudent' })
  async findOne(@Args('id') id: string) {
    try {
      return await this.studentService.findOne(id);
    } catch (error) {
      return error;
    }
  }

  @Mutation(() => Student, { name: 'updateStudent' })
  async updateStudent(
    @Args('updateStudentInput') updateStudentInput: UpdateStudentInput,
  ) {
    const schema = Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      gender: Joi.string().required(),
      address: Joi.string().required(),
      mobile_no: Joi.string().required(),
      dob: Joi.date().iso(),
    });
    const validation = schema.validate(updateStudentInput);
    if (validation.error) {
      // response.status(401).send(validation.error);
      return validation.error;
    } else {
      const studentModal: UpdateStudentInput = validation.value;
      try {
        const updateStudent = await this.studentService.update(
          studentModal.id,
          studentModal,
        );
        if (updateStudent) {
          return updateStudent;
        }
      } catch (error) {
        console.log(error);
        return error;
      }
    }
  }

  @Mutation(() => Student, { name: 'deleteStudent' })
  async removeStudent(@Args('id') id: string) {
    try {
      const deleteUser = await this.studentService.remove(id);
      if (deleteUser) {
        return deleteUser;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
