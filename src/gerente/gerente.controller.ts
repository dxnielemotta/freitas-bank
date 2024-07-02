import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { GerenteService } from './gerente.service';
import { TipoConta } from 'src/enums/tipo-conta.enum';

@Controller('gerentes')
export class GerenteController {
  constructor(private readonly gerenteService: GerenteService) {}

  @Get()
  listarGerentes() {
    try {
      const gerentes = this.gerenteService.listarGerentes();
      return {
        statusCode: HttpStatus.OK,
        message: 'Gerentes retornados com sucesso',
        data: gerentes,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  criarGerente(@Body('nomeCompleto') nomeCompleto: string) {
    const gerente = this.gerenteService.criarGerente(nomeCompleto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Gerente criado com sucesso',
      data: gerente,
    };
  }

  @Post(':id/clientes')
  adicionarCliente(
    @Param('id') id: string,
    @Body('nomeCompleto') nomeCompleto: string,
    @Body('endereco') endereco: string,
    @Body('telefone') telefone: string,
    @Body('rendaSalarial') rendaSalarial: number,
  ) {
    try {
      const cliente = this.gerenteService.adicionarCliente(
        id,
        nomeCompleto,
        endereco,
        telefone,
        rendaSalarial,
      );

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Cliente adicionado com sucesso',
        data: cliente,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id/mudar/:clienteID')
  mudarTipoConta(
    @Param('id') id: string,
    @Param('clienteID') clienteID: string,
    @Body('contaID') contaID: string,
    @Body('novoTipo') novoTipo: TipoConta,
  ) {
    // const gerente = this.gerenteService.obterGerente(id);
    // if (!gerente) {
    //   throw new HttpException('Gerente não encontrado', HttpStatus.NOT_FOUND);
    // }

    // const cliente = gerente.clientes.find((c) => c.id === clienteID);
    // if (!cliente) {
    //   throw new HttpException(
    //     'Cliente não encontrado para o gerente',
    //     HttpStatus.NOT_FOUND,
    //   );
    // }

    // const conta = cliente.contas.find((c) => c.id === contaID);
    // if (!conta) {
    //   throw new HttpException(
    //     'Conta não encontrada para o cliente',
    //     HttpStatus.NOT_FOUND,
    //   );
    // }

    // gerente.mudarTipoConta(cliente, conta, novoTipo);
    try {
      this.gerenteService.mudarTipoConta(id, clienteID, contaID, novoTipo);
      return {
        statusCode: HttpStatus.OK,
        message: 'Mudança de conta feita com sucesso',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id/excluir/:clienteID/:contaID')
  fecharConta(
    @Param('id') id: string,
    @Param('clienteID') clienteID: string,
    @Param('contaID') contaID: string,
  ) {
    //     const gerente = this.gerenteService.obterGerente(id);
    //     if (!gerente) {
    //       throw new HttpException('Gerente não encontrado', HttpStatus.NOT_FOUND);
    //     }

    //     const cliente = gerente.clientes.find((c) => c.id === clienteID);
    //     if (!cliente) {
    //       throw new HttpException(
    //         'Cliente não encontrado para o gerente',
    //         HttpStatus.NOT_FOUND,
    //       );
    //     }

    //     const conta = cliente.contas.find((c) => c.id === contaID);
    //     if (!conta) {
    //       throw new HttpException(
    //         'Conta não encontrada para o cliente',
    //         HttpStatus.NOT_FOUND,
    //       );
    //     }

    //     gerente.fecharConta(cliente, conta);
    //   }
    try {
      this.gerenteService.fecharConta(id, clienteID, contaID);
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Conta fechada com sucesso',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
