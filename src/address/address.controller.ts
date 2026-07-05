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

    @MessagePattern('address.getAll')
    async getAllAddresses(@Ctx() context: RmqContext) {
        const result = await this.addressService.getAllAddresses();
        const channel=context.getChannelRef();
        const originalMessage=context.getMessage();
        channel.ack(originalMessage);
        return result;
    }

    @MessagePattern('address.update')
    async updateAddress(@Payload() data: { id: string, address: string }, @Ctx() context: RmqContext) {
        const result = await this.addressService.updateAddress(data.id, data.address);
        const channel=context.getChannelRef();
        const originalMessage=context.getMessage();
        channel.ack(originalMessage);
        return result;
    }

    @MessagePattern('address.delete')
    async deleteAddress(@Payload() data: { id: string }, @Ctx() context: RmqContext) {
        const result = await this.addressService.deleteAddress(data.id);
        const channel=context.getChannelRef();
        const originalMessage=context.getMessage();
        channel.ack(originalMessage);
        return result;
    }
}