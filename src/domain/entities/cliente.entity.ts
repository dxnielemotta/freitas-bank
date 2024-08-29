import { Conta } from './conta.entity';
import { Gerente } from './gerente.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Clientes')
export class Cliente {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public nomeCompleto: string;

  @Column()
  public endereco: string;

  @Column()
  public telefone: string;

  @Column()
  public rendaSalarial: number;

  @OneToMany(() => Conta, (conta) => conta.cliente, { cascade: true })
  @JoinColumn()
  public contas: Conta[];

  @ManyToOne(() => Gerente, (gerente) => gerente.id)
  @JoinColumn({ name: 'gerente_id' })
  public gerente?: Gerente;

  constructor(
    nomeCompleto: string,
    endereco: string,
    telefone: string,
    rendaSalarial: number,
    contas: Conta[],
    gerente: Gerente,
  ) {
    this.nomeCompleto = nomeCompleto;
    this.endereco = endereco;
    this.telefone = telefone;
    this.rendaSalarial = rendaSalarial;
    this.contas = contas;
    this.gerente = gerente;
  }
}
