import { Injectable } from '@nestjs/common';
import OSS from 'ali-oss'
import { ConfigService } from 'src/config/config.service';
import {Price, PriceBody, PriceList, Tag} from './interfaces/price.interface';
import {re } from './re';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {PriceListInput} from './inputs/price.input';
import defineProperty = Reflect.defineProperty;
import axios from 'axios';

@Injectable()
export class PriceService {
    client: OSS.Cluster
    constructor(@InjectModel('Price') private readonly priceModel: Model<Price>, private readonly configServie: ConfigService) {
        const accessKeyId = configServie.get('ACCESS_KEY_ID')
        const accessKeySecret = configServie.get('ACCESS_KEY_SECRET')
        const bucket = configServie.get('BUCKET')
        this.client = new OSS({
            region: 'oss-cn-shenzhen',
            // 云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
            accessKeyId,
            accessKeySecret,
            bucket,
        });
    }
    // async getPut(name: string, type: string): Promise<Price> {
    //     const url = this.client.signatureUrl(`${type}/${name}`, {
    //         expires: 3600,
    //         method: 'PUT',
    //         'Content-Type': `${type}; charset=UTF-8`
    //     });
    //     const result: Price = {
    //         url
    //     }
    //     return result
    // }
    async addPrices(url: string): Promise<PriceBody> {
        const res = await axios.post('https://ocrapi-advanced.taobao.com/ocrservice/advanced?AppCode=734ddfa56cfb4f3f8752bc0d93c84e2c', {
            "img": "",
            //图像url地址：图片完整URL，URL长度不超过1024字节，URL对应的图片base64编码后大小不超过4M，最短边至少15px，最长边最大4096px，支持jpg/png/bmp格式，和img参数只能同时存在一个
            "url": url,
            //是否需要识别结果中每一行的置信度，默认不需要。 true：需要 false：不需要
            "prob": false,
            //是否需要单字识别功能，默认不需要。 true：需要 false：不需要
            "charInfo": false,
            //是否需要自动旋转功能，默认不需要。 true：需要 false：不需要
            "rotate": false,
            //是否需要表格识别功能，默认不需要。 true：需要 false：不需要
            "table": false,
            //字块返回顺序，false表示从左往右，从上到下的顺序，true表示从上到下，从左往右的顺序，默认false
            "sortPage": false
        }, {
            headers: {
                Authorization: 'APPCODE 734ddfa56cfb4f3f8752bc0d93c84e2c'
            }
        })
        interface R {
            errno: number;
            tags: Tag[];
        }
        console.log(res.data)
        const ress: R = res.data
        const cc = res.data.content.replace(/01393066/g, '').replace(/013930/g, '')
        const createPriceDto = {
            tags: cc,
            img: url,
            createdAt: +new Date(),
            updatedAt: 0,
            deletedAt: 0,
        }
        const postModel = new this.priceModel(createPriceDto);
        const result = await postModel.save()
        return await this.priceModel.findById(result.id).exec();
    }

    async find({ tag, limit = 30, offset = 0 }: PriceListInput): Promise<PriceList> {
        const ql = { tags: new RegExp(tag), deletedAt: 0 }
        const query = this.priceModel.find(ql)
        let list: any = await query.limit(limit).skip(offset * limit).sort('-createdAt').exec()
        const total = await this.priceModel.find(ql).count().exec()
        return {
            list,
            total
        }
    }

}
