import { 
  WebSocketGateway, 
  SubscribeMessage, 
  MessageBody, 
} from "@nestjs/websockets"; 
import { createUser } from "src/users/shared/dto/create-user.dto";
import { SocketTestService } from "./socket-test.service"; 
// import { CreateSocketTestDto } from "./dto/create-socket-test.dto"; 
// import { UpdateSocketTestDto } from "./dto/update-socket-test.dto"; 

/** @WebSocketGateway O decorador pode passar algumas opções de configuração, como o exemplo a seguir: 
 * @WebSocketGateway(80, { 
 * namespace: 'events', 
 * transports: ['websocket'] 
 * cors: { 
 * origin: ' *' 
 * }, 
 * ... 
 * }) 
 **/ 
@WebSocketGateway( 3001, {
cors:{
  origin: '*'
}
})

export class SocketTestGateway { 

  // @SubscribeMessage("createSocketTest") 
  // create(@MessageBody() createSocketTestDto: createUser) { 
  //   return this.socketTestService.registerNewUser(createSocketTestDto); 
  // } 
}

