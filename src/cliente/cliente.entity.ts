import { Conta } from 'src/conta/conta.entity';
import { Gerente } from 'src/gerente/gerente.entity';
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
  @OneToMany(() => Conta, (conta) => conta.clienteID, { cascade: true })
  @JoinColumn()
  public contas: Conta[];

  @ManyToOne(() => Gerente, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn()
  public gerenteID: string;

  constructor(
    nomeCompleto: string,
    endereco: string,
    telefone: string,
    rendaSalarial: number,
    gerenteID: string,
    id?: string,
  ) {
    this.nomeCompleto = nomeCompleto;
    this.endereco = endereco;
    this.telefone = telefone;
    this.rendaSalarial = rendaSalarial;
    this.gerenteID = gerenteID;

    if (!id) {
      this.id = id;
    }
  }
}
