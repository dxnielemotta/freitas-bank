import { Conta } from 'src/conta/conta.model';
import { TipoConta } from 'src/enums/tipo-conta.enum';
import { Gerente } from 'src/gerente/gerente.model';
import { v4 as uuidv4 } from 'uuid';

export class Cliente {
  public contas: Conta[] = [];
  public id: string;

  constructor(
    public nomeCompleto: string,
    public endereco: string,
    public telefone: string,
    public rendaSalarial: number,
    public gerente: Gerente,
  ) {
    this.id = uuidv4();
    this.gerente = gerente;
    // this.nomeCompleto = nomeCompleto;
    // this.endereco = endereco;
    // this.telefone = telefone;
    // this.rendaSalarial = rendaSalarial;
  }

  abrirConta(conta: Conta): void {
    this.contas.push(conta);
  }

  fecharConta(conta: Conta): void {
    this.contas = this.contas.filter((item) => item.id !== conta.id);
  }

  mudarTipoConta(conta: Conta, novoTipo: TipoConta): void {
    let contaEncontrada = this.contas.find((item) => item === conta);

    if (!contaEncontrada) {
      throw new Error('Conta não encontrada');
    }

    contaEncontrada.tipo = novoTipo;
  }
}
