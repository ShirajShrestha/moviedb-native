import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Bookmark, BookmarkState} from '../interfaces';

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState: {
    bookmarks: [],
  } as BookmarkState,
  reducers: {
    addBookmark: (state, action: PayloadAction<Bookmark>) => {
      state.bookmarks.push(action.payload);
    },
    removeBookmark: (state, action: PayloadAction<{id: string | number}>) => {
      state.bookmarks = state.bookmarks.filter(
        bookmark => bookmark.id !== action.payload.id,
      );
    },
  },
});

export const {addBookmark, removeBookmark} = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
