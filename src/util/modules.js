// @flow
import * as React from 'react';
import { lang, en, no } from './lang';

// prints name of month
let switchMonth = (month: number) => {
  switch (month) {
    case 1: return lang.jan.slice(0, 3);
    case 2: return lang.feb.slice(0, 3);
    case 3: return lang.mar.slice(0, 3);
    case 4: return lang.apr.slice(0, 3);
    case 5: return lang.may.slice(0, 3);
    case 6: return lang.jun.slice(0, 3);
    case 7: return lang.jul.slice(0, 3);
    case 8: return lang.aug.slice(0, 3);
    case 9: return lang.sep.slice(0, 3);
    case 10: return lang.oct.slice(0, 3);
    case 11: return lang.nov.slice(0, 3);
    case 12: return lang.dec.slice(0, 3);
  }
}

export { switchMonth }
