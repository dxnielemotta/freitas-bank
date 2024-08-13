import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from 'src/domain/entities/cliente.entity';
import { Conta } from 'src/domain/entities/conta.entity';
import { Gerente } from 'src/domain/entities/gerente.entity';
import { ContaRepository } from './repository/conta.repository';
import { ClienteRepository } from './repository/cliente.repository';
import { GerenteRepository } from './repository/gerente.repository';
import { Pagamento } from 'src/domain/entities/pagamento.entity';
import { PagamentoRepository } from './repository/pagamento.repository';
import { ContaService } from 'src/domain/services/conta.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Conta, Gerente, Pagamento])],
  providers: [
    ContaRepository,
    ClienteRepository,
    GerenteRepository,
    PagamentoRepository,
    { provide: 'IContaRepository', useClass: ContaRepository },
    { provide: 'IClienteRepository', useClass: ClienteRepository },
    { provide: 'IGerenteRepository', useClass: GerenteRepository },
    { provide: 'IPagamentoRepository', useClass: PagamentoRepository },
  ],

  exports: [
    'IContaRepository',
    'IClienteRepository',
    'IGerenteRepository',
    'IPagamentoRepository',
  ],
})
export class InfrastructureModule {}
