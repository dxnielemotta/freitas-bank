import { Conta } from 'src/conta/conta.model';
import { v4 as uuidv4 } from 'uuid';

export class Cliente {
  public id: string;
  public contas: Conta[];

  constructor(
    public nomeCompleto: string,
    public endereco: string,
    public telefone: string,
    public rendaSalarial: number,
    public gerenteID: string,
  ) {
    this.id = uuidv4();
  }
}
