import uuid from "react-uuid";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from "../actions/types";

const initialState = {
  items: [
    {
      id: uuid(),
      name: "Eggs",
      category: "1",
      stock: "10",
      cost: "200",
      image: "",
      asl_image: "",
      audio: ""
    },
    {
      id: uuid(),
      name: "Eggs",
      category: "1",
      stock: "10",
      cost: "200",
      image: "",
      asl_image: "",
      audio: ""
    },
    {
      id: uuid(),
      name: "Eggs",
      category: "1",
      stock: "10",
      cost: "200",
      image: "",
      asl_image: "",
      audio: ""
    }
  ]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state
      };

    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(items => items.id !== action.payload)
      };

    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items]
      };

    default:
      return state;
  }
}
