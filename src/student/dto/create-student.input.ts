import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateStudentInput {
  @Field()
  name: string;
  @Field()
  gender: string;
  @Field()
  address: string;
  @Field()
  mobile_no: string;
  @Field()
  dob: Date;
}
