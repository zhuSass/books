import { 
    Dimensions,
} from 'react-native';

import * as Uis from './ui';

export const windowDevice =  Dimensions.get('window');
export let contentFormat = (content:string) => {
    let fontCount = parseInt((windowDevice.width - 32)/ 18 - 1 + '');
    let fontLines = parseInt((windowDevice.height - 100) / 34 + '');

    const length = content.length
    let array = []
    let x = 0, y, m = 0
    while (x < length) {
      let _array = []
      for (var i = 0; i <= fontLines; i++) {
        let str = content.substring(x, x + fontCount)
        if (str.indexOf('@') != -1) {
          y = x + str.indexOf('@') + 1
          _array[i] = content.substring(x, y).replace('@', '')
          x = y
          continue
        } else {
          y = x + fontCount
          _array[i] = content.substring(x, y)
          x = y
          continue
        }
      }
       array[m] = _array
      m++
    }
    return array
}
export type formatChapterResulteTypes = Array<string>[];
export let formatChapter = (content:string):formatChapterResulteTypes => {
    let _arr:formatChapterResulteTypes =[];
    let _content = '\u3000\u3000' + content.trim().replace(/\n[\n]+/g, '@')
    let _arrTemp = contentFormat(_content)
    _arrTemp.forEach(function(element) {
        let _chapterInfo:string[] = element;
        _arr.push(_chapterInfo);
    });
    return _arr;
}
export let timeFormat = () => {
    let temp = new Date();
    let h = temp.getHours();
    let minute = temp.getMinutes();
    let minutes = minute < 10 ? ('0' + minute) : minute
    return h + ':' + minutes;
}
export let Ui = Uis;

