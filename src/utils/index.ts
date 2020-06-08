import { 
    Dimensions,
} from 'react-native';
import { TSFontInfo } from 'react-native-text-size';

import * as Uis from './ui';

export const windowDevice =  Dimensions.get('window');
export const screen = Dimensions.get("screen");
type ContentFormatType = {
  content:string, 
  title: string,
  titleHeight: number,
  width:number, 
  height:number,
  contentInfo: TSFontInfo,
}

export let contentFormat = (data: ContentFormatType) => {
  const {
    width,
    height,
    content,
    title,
    titleHeight,
    contentInfo,
  } = data;
  let fontHeight = (contentInfo.lineHeight + (contentInfo.bottom || 0));
  let fontCount = parseInt((width - contentInfo.fontSize) / 18 - 1 + '');
  let fontLines = parseInt(height / fontHeight + '') + 1;
  let titleLins = parseInt((height - titleHeight) / fontHeight+ '') + 1;

  const length = content.length
  let array = []
  let x = 0, y, m = 0;
  while (x < length) {
    let _array = []
    for (var i = 0; i <= (m === 0 ? titleLins : fontLines); i++) {
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
export let formatChapter = (data: ContentFormatType):formatChapterResulteTypes => {
    let _arr:formatChapterResulteTypes =[];
    let _content = '\u3000\u3000' + data.content.trim().replace(/\n[\n]+/g, '@').replace(/\s+/g, '').replace(/\@/g, '@\u3000\u3000');
    
    let _arrTemp = contentFormat({
      ...data,
      ...{
        content: _content,
      }
    });
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

