import { ClienteModule } from 'src/cliente/cliente.module';
import { ContaController } from './conta.controller';
import { ContaService } from './conta.service';
import { Module, forwardRef } from '@nestjs/common';

@Module({
  imports: [forwardRef(() => ClienteModule)],
  controllers: [ContaController],
  providers: [ContaService],
  exports: [ContaService],
})
export class ContaModule {}
