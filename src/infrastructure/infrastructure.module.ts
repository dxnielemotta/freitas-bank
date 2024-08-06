import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from 'src/domain/entities/cliente.entity';
import { Conta } from 'src/domain/entities/conta.entity';
import { Gerente } from 'src/domain/entities/gerente.entity';
import { ContaRepository } from './repository/conta.repository';
import { ClienteRepository } from './repository/cliente.repository';
import { GerenteRepository } from './repository/gerente.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Conta, Gerente])],
  providers: [
    ContaRepository,
    ClienteRepository,
    GerenteRepository,
    { provide: 'IContaRepository', useClass: ContaRepository },
    { provide: 'IClienteRepository', useClass: ClienteRepository },
    { provide: 'IGerenteRepository', useClass: GerenteRepository },
  ],

  exports: ['IContaRepository', 'IClienteRepository', 'IGerenteRepository'],
})
export class InfrastructureModule {}
