import { Cliente } from 'src/cliente/cliente.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Gerentes')
export class Gerente {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public nomeCompleto: string;

  @Column()
  public clientes: Cliente[] = [];

  constructor(nomeCompleto: string, clientes: Cliente[] = [], id?: string) {
    this.nomeCompleto = nomeCompleto;
    this.clientes = clientes;
    if (!id) {
      this.id = id;
    }
  }

  adicionarCliente(cliente: Cliente) {
    return this.clientes.push(cliente);
  }

  removerCliente(cliente: Cliente) {
    const index = this.clientes.findIndex((item) => item.id === cliente.id);
    if (index < 0) {
      throw new Error('Cliente não encontrado');
    }

    return this.clientes.splice(index, 1);
  }
}
