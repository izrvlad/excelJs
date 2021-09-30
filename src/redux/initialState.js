
import {defaultStyles, defaultTitle} from '@core/default';

const defaultState = {
  colState: {},
  rowstate: {},
  cellsState: {},
  title: defaultTitle,
  currentText: '',
  currentStyles: {...defaultStyles},
  applyStyles: {},
  lastSeen: null
}

export const initialState = state=> {
  return changeStorageStyles(state) || JSON.parse(JSON.stringify(defaultState))
}

function changeStorageStyles(store) {
  if (store) {
    return {
      ...store,
      currentStyles: {...defaultStyles}
    }
  }
  return null
}
