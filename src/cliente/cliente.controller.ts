import {
  Controller,
  Param,
  Post,
  HttpException,
  HttpStatus,
  Inject,
  forwardRef,
  Get,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ContaService } from '../conta/conta.service';
import { ClienteService } from './cliente.service';
import { TipoConta } from 'src/enums/tipo-conta.enum';

@Controller('clientes')
export class ClienteController {
  constructor(
    @Inject(forwardRef(() => ContaService))
    private readonly contaService: ContaService,
    private readonly clienteService: ClienteService,
  ) {}

  @Get()
  listarClientes() {
    const clientes = this.clienteService.listarClientes();
    return {
      statusCode: HttpStatus.OK,
      message: 'Clientes retornados com sucesso',
      data: clientes,
    };
  }

  @Get(':id')
  obterCliente(@Param('id') id: string) {
    try {
      const cliente = this.clienteService.obterCliente(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Cliente retornado com sucesso',
        data: cliente,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
  @Post(':clienteID/corrente')
  criarContaCorrente(@Param('clienteID') clienteID: string) {
    try {
      this.contaService.criarContaCorrente(clienteID);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Conta corrente criada com sucesso',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':clienteID/poupanca')
  criarContaPoupanca(@Param('clienteID') clienteID: string) {
    try {
      this.contaService.criarContaPoupanca(clienteID);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Conta poupança criada com sucesso',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('cadastrar')
  cadastrarCliente(
    @Body('nomeCompleto') nomeCompleto: string,
    @Body('endereco') endereco: string,
    @Body('telefone') telefone: string,
    @Body('rendaSalarial') rendaSalarial: number,
    @Body('gerenteID') gerenteID: string,
  ) {
    try {
      const cliente = this.clienteService.cadastrarCliente(
        nomeCompleto,
        endereco,
        telefone,
        rendaSalarial,
        gerenteID,
      );
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Cliente cadastrado com sucesso',
        data: cliente,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id/mudar')
  mudarTipoConta(
    @Param('id') id: string,
    @Body('contaID') contaID: string,
    @Body('novoTipo') novoTipo: TipoConta,
  ) {
    try {
      const cliente = this.clienteService.obterCliente(id);
      if (!cliente) {
        throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
      }
      const conta = cliente.contas.find((c) => c.id === contaID);
      if (!conta) {
        throw new HttpException(
          'Conta não encontrada para o cliente',
          HttpStatus.NOT_FOUND,
        );
      }

      cliente.mudarTipoConta(conta, novoTipo);

      return {
        statusCode: HttpStatus.OK,
        message: 'Mudança de conta feita com sucesso',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id/excluir/:contaID')
  fecharConta(@Param('id') id: string, @Param('contaID') contaID: string) {
    try {
      const cliente = this.clienteService.obterCliente(id);
      if (!cliente) {
        throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
      }
      const conta = cliente.contas.find((c) => c.id === contaID);
      if (!conta) {
        throw new HttpException(
          'Conta não encontrada para o cliente',
          HttpStatus.NOT_FOUND,
        );
      }

      cliente.fecharConta(conta);
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Conta fechada com sucesso',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
