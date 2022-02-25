import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('student')
export class Student {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field()
  @Column()
  name: string;
  @Field()
  @Column()
  gender: string;
  @Field()
  @Column()
  address: string;
  @Field()
  @Column()
  mobile_no: string;
  @Field()
  @Column()
  dob: Date;
}
