import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
     items: [],
    // totalItemsCount: 0,
     quantity : 1
  },
  reducers: {
    addItem: (state, action) => {
      // Redux Toolkit uses immer BTS

        const isExist = state.items.find(cartItem =>{
          return  cartItem.id == action.payload.id ;
        })

      if(isExist){
          state.items = state.items.filter(cartItem =>{
           return  cartItem.id !== action.payload.id ;
          })
  
        isExist.quantity += 1;
        state.items.push(isExist); 
      }
       else
      {
        state.items.push({...action.payload, quantity : 1 });
      }
        
    },
    removeItem: (state, action) => {
      // state.items.pop();


    },
    //originalState = {items: ["pizza"]}
    clearCart: (state, action) => {
      //RTK - either Mutate the existing  state or return a new State
      // state.items.length = 0; // originalState = []

      return { items: [] }; // this new object will be replaced inside originalState = { items: [] }
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
