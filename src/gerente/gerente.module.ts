import { Module, forwardRef } from '@nestjs/common';
import { GerenteController } from './gerente.controller';
import { GerenteService } from './gerente.service';
import { ClienteModule } from 'src/cliente/cliente.module';
import { ContaModule } from 'src/conta/conta.module';

@Module({
  imports: [forwardRef(() => ClienteModule), forwardRef(() => ContaModule)],
  controllers: [GerenteController],
  providers: [GerenteService],
  exports: [GerenteService],
})
export class GerenteModule {}
