import {Body, Controller, Delete, Get, Patch, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {WatchlistService} from "./watchlist.service";
import {WatchListDto} from "./dto";
import {JwtAuthGuard} from "../../guards/jwt-guard";

@Controller('watchlist')
export class WatchlistController {
    constructor(private readonly watchListService: WatchlistService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    createAsset(@Body() assetDto: WatchListDto, @Req() request){
        const user = request.user
        return this.watchListService.createAsset(user, assetDto)
    }

    @Get('get-all')
    getAllAsset(){
        return
    }

    @Patch('update')
    updateAsset(){
        return
    }

    @Delete()
    deleteAsset(@Query('id') id:string){
        return
    }
}
