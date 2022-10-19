import { beforeEach, afterEach } from 'jest';
import * as supertest from 'supertest'
import { app } from '../../src/app.module'
let server;
beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe('Teste de Integração 1 - conexão com o DB', ()=>{
  it('Deve retornar a conexão com banco - status 200',  async ()=>{
    await request(app).get('/users')
    .expect(200)
  })
})