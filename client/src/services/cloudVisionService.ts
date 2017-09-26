import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { environment } from '../../environment';

@Injectable()
export class cloudVisionService {

  constructor(public http: Http) { }

  getText(base64Image) {
    const body = {
      "requests": [
        {
          "image": {
            "content": base64Image
          },
          "features": [
            {
              "type": "TEXT_DETECTION"
            }
          ]
        }
      ]
    };

    return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + environment.CV_API_KEY, body);
  }

}