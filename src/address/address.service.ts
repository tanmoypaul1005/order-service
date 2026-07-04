import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AddressService {
    constructor(private readonly prisma:PrismaService) {}

    async createAddress(address: string) {
        return this.prisma.address.create({
            data: {
                address,
            },
        });
    }
}
