import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAI;
  private model: string;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    this.model =
      this.configService.get<string>('OPENAI_MODEL') ?? 'gpt-4o-mini';

    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    this.openai = new OpenAI({ apiKey });
  }

  async generateText(prompt: string): Promise<string> {
    const response = await this.openai.responses.create({
      model: this.model,
      input: prompt,
    });

    return response.output_text;
  }
}
