import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AddressService {

    constructor(private readonly prisma: PrismaService) { }

    async createAddress(address: string) {
        return this.prisma.address.create({
            data: {
                address,
            },
        });
    }

    async getAllAddresses() {
        return this.prisma.address.findMany();
    }

    async updateAddress(id: string, address: string) {
        return this.prisma.address.update({
            where: { id },
            data: { address },
        });
    }

    async deleteAddress(id: string) {
        return this.prisma.address.delete({
            where: { id },
        });
    }
    
}
