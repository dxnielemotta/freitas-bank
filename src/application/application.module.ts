import { Module } from '@nestjs/common';
import { ContaController } from './controllers/conta.controller';
import { ClienteController } from './controllers/cliente.controller';
import { GerenteController } from './controllers/gerente.controller';
import { DomainModule } from 'src/domain/domain.module';

@Module({
  imports: [DomainModule],
  controllers: [ContaController, ClienteController, GerenteController],
  providers: [],
  exports: [],
})
export class ApplicationModule {}
