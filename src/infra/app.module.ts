import { Module } from '@nestjs/common'
import { AppController } from './controllers/service-request.controller'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
