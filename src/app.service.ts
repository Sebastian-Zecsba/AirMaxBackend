import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const numberOne = 7
    const numberTwo = 2
    const example = numberOne + numberTwo
    const message = `La suma de ${numberOne} + ${numberTwo} es: ${example}`

    return message;
  }
}
