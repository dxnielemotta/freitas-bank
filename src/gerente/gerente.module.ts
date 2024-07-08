import { Module, forwardRef } from '@nestjs/common';
import { GerenteController } from './gerente.controller';
import { GerenteService } from './gerente.service';
import { ClienteModule } from 'src/cliente/cliente.module';

@Module({
  imports: [forwardRef(() => ClienteModule)],
  controllers: [GerenteController],
  providers: [GerenteService],
  exports: [GerenteService],
})
export class GerenteModule {}
