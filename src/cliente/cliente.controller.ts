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
}
