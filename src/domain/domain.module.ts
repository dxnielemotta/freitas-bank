import { Module } from '@nestjs/common';
import { ContaService } from './services/conta.service';
import { ClienteService } from './services/cliente.service';
import { GerenteService } from './services/gerente.service';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conta } from './entities/conta.entity';
import { Cliente } from './entities/cliente.entity';
import { Gerente } from './entities/gerente.entity';
import { Pagamento } from './entities/pagamento.entity';
import { Transacao } from './entities/transacao.entity';

@Module({
  imports: [
    InfrastructureModule,
    TypeOrmModule.forFeature([Conta, Cliente, Gerente, Pagamento, Transacao]),
  ],
  providers: [ContaService, ClienteService, GerenteService],
  exports: [ContaService, ClienteService, GerenteService],
})
export class DomainModule {}
