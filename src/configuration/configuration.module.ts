import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';


const CONFIG_DYNAMIC_MODULE = ConfigModule.forRoot({
  isGlobal: true,
});

const MONGOOSE_DYNAMIC_MODULE = MongooseModule.forRoot(
    //  "mongodb://juliana:root1@db:30000/api-mongo/funcionarios?authSource=admin",
    // 'mongodb+srv://juliana:root1@cluster0.1tqbr.mongodb.net/funcionarios?retryWrites=true&w=majority',
    process.env.MONGODB,
    
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    );

@Global()
@Module({
  imports: [CONFIG_DYNAMIC_MODULE, MONGOOSE_DYNAMIC_MODULE],
  exports: [CONFIG_DYNAMIC_MODULE, MONGOOSE_DYNAMIC_MODULE]
})
export class ConfigurationModule {}
