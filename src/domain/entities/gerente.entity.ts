import { CriarClienteDto } from 'src/application/dtos/cliente.dto';
import { Cliente } from './cliente.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Gerentes')
export class Gerente {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column()
  public nomeCompleto: string;

  @OneToMany(() => Cliente, (cliente) => cliente.gerente)
  @JoinColumn()
  clientes?: Cliente[];

  constructor(nomeCompleto: string, id?: string, clientes?: Cliente[]) {
    this.nomeCompleto = nomeCompleto;

    if (!id) {
      this.id = id;
    }

    if (!clientes) {
      this.clientes = clientes;
    }
  }
}
