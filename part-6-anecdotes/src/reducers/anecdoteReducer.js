import { createSlice } from '@reduxjs/toolkit';
import anecdoteServer from '../services/anecdotes'

// const anecdotesAtStart = [
//   "If it hurts, do it more often",
//   "Adding manpower to a late software project makes it later!",
//   "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//   "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//   "Premature optimization is the root of all evil.",
//   "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
// ];

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote: (state, action) => {
      const id = action.payload;
      const anecdote = state.find(a => a.id === id);
      if (anecdote) {
        anecdote.votes += 1;
      }
    },
    // addNew: (state, action) => {
    //   state.push(action.payload);
    // },
    setAnecdote(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
});

export const { addVote, setAnecdote, appendAnecdote } = anecdoteSlice.actions;

export const  initAnecdotes = ()=> {
  return async dispatch => {
    const anecdotes = await anecdoteServer.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const addNew = content => {
  return async dispatch => {
    const newNote = await anecdoteServer.createNew(content)
    dispatch(appendAnecdote(newNote))
  }
}

export const updateVote = data => {
  return  async dispatch => {
    const currentVote = await anecdoteServer.updateAnecdoteVote(data)
    dispatch(addVote(currentVote))
  }
}

export default anecdoteSlice.reducer;
