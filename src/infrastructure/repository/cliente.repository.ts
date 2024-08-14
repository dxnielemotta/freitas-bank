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
      relations: ['contas', 'gerente'],
    });
  }

  async buscarPorId(id: string): Promise<Cliente | null> {
    // SELECT * FROM clientes WHERE id = ?;
    return this.clienteRepository.findOne({
      where: { id },
      relations: ['contas', 'gerente'],
    });
  }

  async cadastrarCliente(cliente: Cliente): Promise<Cliente> {
    // INSERT INTO clientes
    return await this.clienteRepository.save(cliente);
  }

  async excluirCliente(id: string): Promise<boolean> {
    //DELETE FROM clientes WHERE id
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
}
