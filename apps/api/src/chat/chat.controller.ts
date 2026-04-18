import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { chatRequestSchema } from '@ai-platform/shared';
import { z } from 'zod';
import { AiService } from '../ai/ai.service';

class ChatDto {
  message: string;
}

@Controller('chat')
export class ChatController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  async chat(@Body() body: ChatDto) {
    const parsed = z.safeParse(chatRequestSchema, body);

    if (!parsed.success) {
      throw new BadRequestException(z.flattenError(parsed.error));
    }

    const reply = await this.aiService.generateText(body.message);

    return {
      reply,
    };
  }
}
