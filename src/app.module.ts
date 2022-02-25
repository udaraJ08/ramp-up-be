import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './db/database.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: (configService: ConfigService) => ({
        playground: Boolean(configService.get('GRAPHQL_PLAYGROUND')),
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      }),
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        GRAPHQL_PLAYGROUND: Joi.number(),
      }),
    }),
    StudentModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
