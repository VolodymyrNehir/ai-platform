import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from '../api/ai.service';

class ChatDto {
  message: string;
}

@Controller('chat')
export class ChatController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  async chat(@Body() body: ChatDto) {
    const reply = await this.aiService.generateText(body.message);

    return {
      reply,
    };
  }
}
