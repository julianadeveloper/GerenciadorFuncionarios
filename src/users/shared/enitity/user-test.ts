import { User } from "./user";



export const userStub = (): User=>{
return{
_id: '1d32s1d32a',
username: 'testeDb',
name: 'testedbName',
password: '123',
role: 'operador',
WebSocket: 'mywebsocket'
}
}