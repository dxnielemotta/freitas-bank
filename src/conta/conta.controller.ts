import {
  Controller,
  Param,
  HttpException,
  HttpStatus,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { ContaService } from './conta.service';
import { TipoPagamento } from 'src/enums/tipo-pagamento.enum';

@Controller('contas')
export class ContaController {
  constructor(private readonly contaService: ContaService) {}

  @Get('/')
  listarContas() {
    try {
      const contas = this.contaService.listarContas();
      return {
        statusCode: HttpStatus.OK,
        message: 'Contas retornadas com sucesso',
        data: contas,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':contaID')
  obterContaPorId(@Param('contaID') contaID: string) {
    try {
      const conta = this.contaService.obterContaPorId(contaID);
      if (!conta) {
        throw new Error('Conta não encontrada');
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Conta retornada com sucesso',
        data: conta,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':contaID/pagar')
  fazerPagamento(
    @Param('contaID') contaID: string,
    @Body('valor') valor: number,
    @Body('tipoPagamento') tipoPagamento: TipoPagamento,
  ) {
    try {
      this.contaService.fazerPagamento(contaID, valor, tipoPagamento);
      return {
        statusCode: HttpStatus.CREATED,
        message: `Pagamento via ${tipoPagamento} realizado com sucesso!`,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
