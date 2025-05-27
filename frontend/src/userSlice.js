// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   user: JSON.parse(sessionStorage.getItem('user')) || null,
//   isLoggedIn: !!sessionStorage.getItem('user'),
//   token: sessionStorage.getItem('token') || ''
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//       state.token = action.payload.token;
//       state.isLoggedIn = true;
//       sessionStorage.setItem('user', JSON.stringify(action.payload));
//       sessionStorage.setItem('token', action.payload.token);
//     },
//     clearUser: (state) => {
//       state.user = null;
//       state.token = '';
//       state.isLoggedIn = false;
//       sessionStorage.removeItem('user');
//       sessionStorage.removeItem('token');
//     },
//   },
// });

// export const { setUser, clearUser } = userSlice.actions;
// export default userSlice.reducer;



import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;


