import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../../domain/entities/cliente.entity';
import { IClienteRepository } from 'src/domain/interfaces/cliente.repository.interface';
import { Conta } from 'src/domain/entities/conta.entity';

@Injectable()
export class ClienteRepository implements IClienteRepository {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async listarClientes(): Promise<Cliente[]> {
    // SELECT * FROM clientes
    return await this.clienteRepository.find({
      relations: ['gerente', 'contas'],
    });
  }

  async buscarPorId(id: string): Promise<Cliente | null> {
    // SELECT * FROM clientes WHERE id = ?;
    return this.clienteRepository.findOne({
      where: { id },
      relations: ['gerente', 'contas'],
    });
  }

  async cadastrarCliente(cliente: Cliente): Promise<Cliente> {
    // INSERT INTO clientes
    return await this.clienteRepository.save(cliente);
  }

  async excluirCliente(id: string): Promise<boolean> {
    const result = await this.clienteRepository.delete(id);
    return result.affected > 0;
  }

  async removerContaDoCliente(contaId: string, clienteId: string) {
    const cliente = await this.buscarPorId(clienteId);

    const conta = cliente.contas.find((conta) => conta.id === contaId);

    if (!conta) {
      throw new Error('Conta não encontrada para o cliente');
    }

    cliente.contas = cliente.contas.filter((conta) => conta.id !== contaId);

    await this.clienteRepository.save(cliente);
  }

  async listarContasDoCliente(clienteId: string): Promise<Conta[]> {
    const cliente = await this.buscarPorId(clienteId);
    const contasDoCliente = cliente.contas;
    return contasDoCliente;
  }
}
