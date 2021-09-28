import {
  APPLY_STYLE,
  CHANGE_STYLES,
  CHANGE_TITLE,
  TABLE_CHANGE,
  TABLE_RESIZE_COL,
  TABLE_RESIZE_ROW
} from '@/redux/types';

export function rootReducer(state, action) {
  switch (action.type) {
    case TABLE_RESIZE_COL:

      const newState = state.colState || {}
      newState[action.payload.id] = action.payload.width;
      return {...state, colState: newState}
    
    case TABLE_RESIZE_ROW:
      const rowState = state.rowState || {}
      rowState[action.payload.id] = action.payload.height;
      return {...state, rowState}
    
    case TABLE_CHANGE:
      const cellsState = state.cellsState || {}
      cellsState[action.payload.id] = action.payload.text
      return {...state, cellsState, currentText: action.payload.text}
    case CHANGE_STYLES:
      return {...state, currentStyles: action.payload}
    case APPLY_STYLE:

      const val = state.applyStyles || {}
      action.payload.ids.forEach(id => {
        val[id] = {...val[id], ...action.payload.value}
      })
      return {
        ...state,
        applyStyles: val,
        currentStyles: {...state.currentStyles, ...action.payload.value}
      }
    case CHANGE_TITLE:
      return {...state, title: action.payload}

    default: return state
  }
}
