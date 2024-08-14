import { Inject, Injectable } from '@nestjs/common';
import { Cliente } from '../entities/cliente.entity';
import { Conta } from '../entities/conta.entity';
import { TipoConta } from '../enums/tipo-conta.enum';
import { ContaService } from './conta.service';
import { TipoPagamento } from '../enums/tipo-pagamento.enum';
import { IGerenteRepository } from '../interfaces/gerente.repository.interface';
import { IClienteRepository } from '../interfaces/cliente.repository.interface';
import { IContaRepository } from '../interfaces/conta.repository.interface';
import { CriarClienteDto } from 'src/application/dtos/cliente.dto';
import { Gerente } from '../entities/gerente.entity';

@Injectable()
export class ClienteService {
  private clientes: Cliente[] = [];
  private contas: Conta[] = [];

  constructor(
    @Inject('IContaRepository')
    private readonly contaRepository: IContaRepository,
    @Inject('IClienteRepository')
    private readonly clienteRepository: IClienteRepository,
    @Inject('IGerenteRepository')
    private readonly gerenteRepository: IGerenteRepository,

    private contaService: ContaService,
  ) {}

  async cadastrarCliente(criarClienteDto: CriarClienteDto): Promise<Cliente> {
    const {
      nomeCompleto,
      endereco,
      telefone,
      rendaSalarial,
      contas,
      gerenteId,
    } = criarClienteDto;

    const gerenteEncontrado =
      await this.gerenteRepository.buscarPorId(gerenteId);

    if (!gerenteEncontrado) {
      throw new Error('Gerente não encontrado');
    }

    const cliente = new Cliente(
      nomeCompleto,
      endereco,
      telefone,
      rendaSalarial,
      contas,
      gerenteEncontrado,
    );

    this.clientes.push(cliente);
    await this.gerenteRepository.cadastrar(gerenteEncontrado);
    return await this.clienteRepository.cadastrarCliente(cliente);
  }

  async obterCliente(clienteId: string): Promise<Cliente> {
    const cliente = await this.clienteRepository.buscarPorId(clienteId);
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }
    return cliente;
  }

  async listarClientes(): Promise<Cliente[]> {
    return await this.clienteRepository.listarClientes();
  }

  async adicionarContaAoCliente(tipo: TipoConta, cliente: Cliente) {
    const clienteEncontrado = await this.obterCliente(cliente.id);

    if (!clienteEncontrado.contas) {
      cliente.contas = [];
    }

    if (tipo === TipoConta.CORRENTE && cliente.rendaSalarial < 500) {
      throw new Error(
        'Cliente não possui os requisitos para abrir uma conta-corrente',
      );
    }

    const conta = await this.contaService.abrirConta(tipo, cliente);

    cliente.contas.push(conta);
    this.contas.push(conta);
    return;
  }

  async mudarTipoConta(contaId: string, novoTipo: TipoConta) {
    await this.contaService.mudarTipoConta(contaId, novoTipo);
  }

  async fecharConta(contaId: string) {
    this.contaRepository.excluirConta(contaId);
  }

  async removerContaDoCliente(clienteId: string, contaId: string) {
    const cliente = await this.clienteRepository.buscarPorId(clienteId);

    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    const conta = await this.contaRepository.buscarPorId(contaId);
    if (!conta) {
      throw new Error('Conta não encontrada');
    }

    this.clienteRepository.removerContaDoCliente(contaId, clienteId);
    await this.contaRepository.excluirConta(contaId);
  }

  async fazerPagamento(
    contaId: string,
    valor: number,
    tipoPagamento: TipoPagamento,
  ) {
    await this.contaService.fazerPagamento(contaId, valor, tipoPagamento);
  }
}
