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

    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteAsset(@Query('id') assetId:string, @Req() request): Promise<boolean>{
        const {id} = request.user
        return this.watchListService.deleteAsset(id, assetId)
    }
}
