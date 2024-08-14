import { Inject, Injectable } from '@nestjs/common';
import { Gerente } from '../entities/gerente.entity';
import { TipoConta } from '../enums/tipo-conta.enum';
import { ContaService } from './conta.service';
import { Cliente } from '../entities/cliente.entity';
import { IGerenteRepository } from '../interfaces/gerente.repository.interface';
import { IClienteRepository } from '../interfaces/cliente.repository.interface';

@Injectable()
export class GerenteService {
  private gerentes: Gerente[] = [];

  constructor(
    @Inject('IGerenteRepository')
    private readonly gerenteRepository: IGerenteRepository,
    @Inject('IClienteRepository')
    private readonly clienteRepository: IClienteRepository,

    private contaService: ContaService,
  ) {}

  async criarGerente(nomeCompleto: string): Promise<Gerente> {
    const gerente = new Gerente(nomeCompleto);
    this.gerentes.push(gerente);
    await this.gerenteRepository.cadastrar(gerente);
    return gerente;
  }

  async obterGerente(gerenteId: string): Promise<Gerente> {
    const gerente = await this.gerenteRepository.buscarPorId(gerenteId);
    if (!gerente) {
      throw new Error('Gerente não encontrado');
    }
    return gerente;
  }

  async listarGerentes(): Promise<Gerente[]> {
    const gerentes = this.gerenteRepository.listarGerentes();
    return gerentes;
  }

  async abrirConta(tipo: TipoConta, cliente: Cliente) {
    const clienteEncontrado = await this.clienteRepository.buscarPorId(
      cliente.id,
    );

    if (tipo === TipoConta.CORRENTE && clienteEncontrado.rendaSalarial < 500) {
      throw new Error(
        'Cliente não possui os requisitos para abrir uma conta-corrente',
      );
    }

    const conta = await this.contaService.abrirConta(tipo, clienteEncontrado);
    return conta;
  }

  async mudarTipoConta(contaId: string, novoTipo: TipoConta) {
    const conta = await this.contaService.obterConta(contaId);

    if (conta.cliente.rendaSalarial < 600) {
      throw new Error(
        'Cliente não possui os requisitos para mudar o tipo da conta.',
      );
    }

    await this.contaService.mudarTipoConta(contaId, novoTipo);
  }

  async fecharConta(contaId: string) {
    this.contaService.fecharConta(contaId);
  }
}
