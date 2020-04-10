import request from 'request';
import url from 'url';
import crypto from 'crypto';

export const re = (src): Promise<any> => {
  return new Promise((resolve, reject): any => {
    const date = new Date().toUTCString()

// 这里填写AK和请求
    const ak_id = '203804092';
    const ak_secret = 'd4o4l58rel2h7uskrskj52j46lsm7aeg';
    let options = {
      url : 'http://tysbgpu.market.alicloudapi.com/api/predict/ocr_general',
      method: 'POST',
      body: JSON.stringify({
        "img": "",
        //图像url地址：图片完整URL，URL长度不超过1024字节，URL对应的图片base64编码后大小不超过4M，最短边至少15px，最长边最大4096px，支持jpg/png/bmp格式，和img参数只能同时存在一个
        "url": src,
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
      }),
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'date': date,
        'Authorization': 'APPCODE 734ddfa56cfb4f3f8752bc0d93c84e2c',
      },
    };
// 这里填写AK和请求
    const md5 = (buffer) => {
      let hash;
      hash = crypto.createHash('md5');
      hash.update(buffer);
      return hash.digest('base64');
    };
    const sha1 = (stringToSign, secret) => {
      let signature;
      return signature = crypto.createHmac('sha1', secret).update(stringToSign).digest().toString('base64');
    };
// step1: 组stringToSign [StringToSign = #{method}\\n#{accept}\\n#{data}\\n#{contentType}\\n#{date}\\n#{action}]
    let body = options.body || '';
    let bodymd5;
    if(body === void 0 || body === ''){
      bodymd5 = body;
    } else {
      bodymd5 = md5(new Buffer(body));
    }
    let stringToSign = options.method + "\n" + options.headers.accept + "\n" + bodymd5 + "\n" + options.headers['content-type'] + "\n" + options.headers.date + "\n" + url.parse(options.url).path;
// step2: 加密 [Signature = Base64( HMAC-SHA1( AccessSecret, UTF-8-Encoding-Of(StringToSign) ) )]
    let signature = sha1(stringToSign, ak_secret);
// console.log("step2-signature:", signature);
// step3: 组authorization header [Authorization =  Dataplus AccessKeyId + ":" + Signature]
    let authHeader = "Dataplus " + ak_id + ":" + signature;

    options.headers.Authorization = 'APPCODE 734ddfa56cfb4f3f8752bc0d93c84e2c';

// step4: send request
    function callback(error, response, body) {
      if (error) {
        console.log("error", error)
        reject(error)
      }

      resolve(body)
      console.log("step4-response body:", response.statusCode, body)
    }
    request(options, callback);
  })
}
