import {
  APPLY_STYLE,
  CHANGE_STYLES,
  CHANGE_TITLE,
  TABLE_CHANGE,
  TABLE_RESIZE_COL,
  TABLE_RESIZE_ROW
} from '@/redux/types';

export function tableResize(data) {
  if(data.width){
    return {
      type: TABLE_RESIZE_COL,
      payload: {...data}
    }
  }
  return {
    type: TABLE_RESIZE_ROW,
    payload: {...data}
  }
}

export function tableChange(data) {
  return {
    type: TABLE_CHANGE,
    payload: {...data}
  }
}
export function changeCurrentStyles(data) {
  return {
    type: CHANGE_STYLES,
    payload: {...data}
  }
}
export function applyStyles(data) {
  return {
    type: APPLY_STYLE,
    payload: {...data}
  }
}
export function changeTitle({title}) {
  return {
    type: CHANGE_TITLE,
    payload: title
  }
}
