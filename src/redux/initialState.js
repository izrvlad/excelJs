import {storageState} from '@core/utils';
import {defaultStyles, defaultTitle} from '@core/default';

const defaultState = {
  colState: {},
  rowstate: {},
  cellsState: {},
  title: defaultTitle,
  currentText: '',
  currentStyles: {...defaultStyles},
  applyStyles: {}
}

export const initialState = changeStorageStyles(storageState('excel-storage')) || defaultState

function changeStorageStyles(store) {
  if (store) {
    return {
      ...store,
      currentStyles: {...defaultStyles}
    }
  }
  return null
}
