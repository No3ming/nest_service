import { Injectable } from '@nestjs/common';
import OSS from 'ali-oss'
import { ConfigService } from 'src/config/config.service';
import { Oss } from './interfaces/oss.interface';

@Injectable()
export class OssService {
    client: OSS.Cluster
    constructor(private readonly configServie: ConfigService) {
        const accessKeyId = configServie.get('ACCESS_KEY_ID')
        const accessKeySecret = configServie.get('ACCESS_KEY_SECRET')
        const bucket = configServie.get('BUCKET')
        this.client = new OSS({
            region: 'oss-cn-shenzhen',
            //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
            accessKeyId,
            accessKeySecret,
            bucket
        })
    }
    async getPut(name: string, type: string): Promise<Oss> {
        const url = this.client.signatureUrl(`${type}/${name}`, {
            expires: 3600,
            method: 'PUT',
            'Content-Type': `${type}; charset=UTF-8`
        });
        const result: Oss = {
            url
        }
        return result
    }
}
