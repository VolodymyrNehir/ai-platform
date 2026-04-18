import { Module } from '@nestjs/common';
import { AiModule } from '../api/ai.module';
import { ChatController } from './chat.controller';

@Module({
  imports: [AiModule],
  controllers: [ChatController],
})
export class ChatModule {}
