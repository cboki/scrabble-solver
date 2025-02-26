import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Result } from '@scrabble-solver/types';

import { ResultColumn, SortDirection } from 'types';

import resultsInitialState from './resultsInitialState';

const toggleDirection = (direction: SortDirection): SortDirection => {
  return direction === SortDirection.Ascending ? SortDirection.Descending : SortDirection.Ascending;
};

const resultsSlice = createSlice({
  initialState: resultsInitialState,
  name: 'results',
  reducers: {
    applyResult: (_state, _action: PayloadAction<Result>) => {
      return resultsInitialState;
    },

    changeResultCandidate: (state, action: PayloadAction<Result | null>) => {
      const candidate = action.payload;
      return { ...state, candidate };
    },

    changeResults: (state, action: PayloadAction<Result[]>) => {
      const newResults = action.payload;
      return { ...state, results: newResults };
    },

    sort: (state, action: PayloadAction<ResultColumn>) => {
      const columndId = action.payload;
      const { column, direction } = state.sort;

      return {
        ...state,
        sort: {
          column: columndId,
          direction: column === columndId ? toggleDirection(direction) : direction,
        },
      };
    },

    reset: () => resultsInitialState,
  },
});

export default resultsSlice;
