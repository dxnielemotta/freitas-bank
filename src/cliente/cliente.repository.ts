import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';

@Injectable()
export class ClienteRepository {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async findAll(): Promise<Cliente[]> {
    // SELECT * FROM clientes
    return await this.clienteRepository.find({
      relations: ['gerenteID', 'contas'],
    });
  }

  async findById(id: string): Promise<Cliente | null> {
    // SELECT * FROM clientes WHERE id = ?;
    return this.clienteRepository.findOne({
      where: { id },
      relations: ['gerenteID', 'contas'],
    });
  }

  async save(cliente: Cliente): Promise<Cliente> {
    // INSERT INTO clientes
    return await this.clienteRepository.save(cliente);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.clienteRepository.delete(id);
    return result.affected > 0;
  }
}
