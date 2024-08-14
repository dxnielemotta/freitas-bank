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

  //rever parametros
  @OneToMany(() => Conta, (conta) => conta.cliente, { cascade: true })
  @JoinColumn()
  public contas: Conta[];

  // @ManyToOne(() => Gerente, (gerente) => gerente.id, {
  //   nullable: true,
  // })
  // @JoinColumn({ name: 'gerente_id' })
  // public gerenteId: string;
  @ManyToOne(() => Gerente, (gerente) => gerente.clientes)
  public gerente: Gerente;

  constructor(
    nomeCompleto: string,
    endereco: string,
    telefone: string,
    rendaSalarial: number,
    gerente: Gerente,
    id?: string,
  ) {
    this.nomeCompleto = nomeCompleto;
    this.endereco = endereco;
    this.telefone = telefone;
    this.rendaSalarial = rendaSalarial;
    this.gerente = gerente;

    if (!id) {
      this.id = id;
    }
  }
}
