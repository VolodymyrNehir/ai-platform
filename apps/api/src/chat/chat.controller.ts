import { Body, Controller, Post } from "@nestjs/common";
import { AiService } from "src/api/ai.service";

class ChatDto {
 message: string;
}

@Controller("chat")
class ChatController {
   
    constructor(private readonly aiServer: AiService) {}

    @Post()
    async chat(@Body() Body: ChatDto) {
        const reply = await this.aiServer.generateText(Body.message);

        return {
            reply,
        }
    }
}
