import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { AddressService } from './address.service';

@Controller()
export class AddressController {
    constructor(private readonly addressService: AddressService) { }

    @MessagePattern('address.create')
    async createAddress(@Payload() data: { address: string }, @Ctx() context: RmqContext) {
        const result = await this.addressService.createAddress(data.address);
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        channel.ack(originalMessage);
        return result;
    }
}