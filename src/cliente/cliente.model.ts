import { Conta } from 'src/conta/conta.model';
import { TipoConta } from 'src/enums/tipo-conta.enum';
import { Gerente } from 'src/gerente/gerente.model';
import { v4 as uuidv4 } from 'uuid';

export class Cliente {
  public contas: Conta[] = [];
  public id: string;
  public gerente: Gerente;

  constructor(
    public nomeCompleto: string,
    public endereco: string,
    public telefone: string,
    public rendaSalarial: number,
  ) {
    this.id = uuidv4();
    this.nomeCompleto = nomeCompleto;
    this.endereco = endereco;
    this.telefone = telefone;
    this.rendaSalarial = rendaSalarial;
  }

  abrirConta(conta: Conta): void {
    this.contas.push(conta);
  }

  fecharConta(conta: Conta): void {
    this.contas = this.contas.filter((item) => item !== conta);
  }

  mudarTipoConta(conta: Conta, novoTipo: TipoConta): void {
    let contaEncontrada = this.contas.find((item) => item === conta);

    if (!contaEncontrada) {
      console.log('Conta não encontrada');
      return;
    }

    contaEncontrada.tipo = novoTipo;
  }
}
