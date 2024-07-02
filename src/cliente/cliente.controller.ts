import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.model';
import { TipoConta } from 'src/enums/tipo-conta.enum';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get()
  listarClientes(): Cliente[] {
    return this.clienteService.listarClientes();
  }

  @Get(':id')
  obterCliente(@Param('id') id: string): Cliente {
    return this.clienteService.obterCliente(id);
  }

  @Post('cadastrar')
  cadastrarCliente(
    @Body('nomeCompleto') nomeCompleto: string,
    @Body('endereco') endereco: string,
    @Body('telefone') telefone: string,
    @Body('rendaSalarial') rendaSalarial: number,
    @Body('gerenteID') gerenteID: string,
  ): Cliente {
    return this.clienteService.cadastrarCliente(
      nomeCompleto,
      endereco,
      telefone,
      rendaSalarial,
      gerenteID,
    );
  }

  @Put(':id/mudar')
  mudarTipoConta(
    @Param('id') id: string,
    @Body('contaID') contaID: string,
    @Body('novoTipo') novoTipo: TipoConta,
  ): void {
    const cliente = this.clienteService.obterCliente(id);
    const conta = cliente.contas.find((c) => c.id === contaID);
    if (!conta) {
      throw new Error('Conta não encontrada para o cliente.');
    }
    cliente.mudarTipoConta(conta, novoTipo);
  }

  @Delete(':id/excluir/:contaID')
  fecharConta(
    @Param('id') id: string,
    @Param('contaID') contaID: string,
  ): void {
    const cliente = this.clienteService.obterCliente(id);
    const conta = cliente.contas.find((c) => c.id === contaID);
    if (!conta) {
      throw new Error('Conta não encontrada para o cliente.');
    }
    cliente.fecharConta(conta);
  }
}
