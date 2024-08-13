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

  constructor(nomeCompleto: string, id?: string) {
    this.nomeCompleto = nomeCompleto;
  }
}
