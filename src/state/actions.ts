// actions.ts
import { Dispatch } from "redux";
import axios from "axios";
import { ToDoItemProps } from "../components/ToDoItem";

// Action types
export const ADD_ITEM = "ADD_ITEM";
export const CREATE_ITEM = "CREATE_ITEM";
export const CANCEL_ITEM = "CANCEL_ITEM";
export const START_EDITING_ITEM = "START_EDITING_ITEM";
export const SAVE_ITEM = "SAVE_ITEM";
export const EDIT_ITEM = "EDIT_ITEM";

// Async-related action types
export const FETCH_ITEMS_REQUEST = "FETCH_ITEMS_REQUEST";
export const FETCH_ITEMS_SUCCESS = "FETCH_ITEMS_SUCCESS";
export const FETCH_ITEMS_FAILURE = "FETCH_ITEMS_FAILURE";

// Synchronous Action Creators
export const addItem = () => ({ type: ADD_ITEM });

export const createItem = () => ({ type: CREATE_ITEM });

export const cancelItem = () => ({ type: CANCEL_ITEM });

export const startEditingItem = (targetItemId: number) => ({
  type: START_EDITING_ITEM,
  targetItemId,
});

export const saveItem = (targetItemId: number) => ({
  type: SAVE_ITEM,
  targetItemId,
});

export const editItem = (payload: string, targetItemId?: number) => ({
  type: EDIT_ITEM,
  payload,
  targetItemId,
});

export const fetchItems = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_ITEMS_REQUEST });
    try {
      const response = await axios.get<ToDoItemProps[]>(
        "http://localhost:8000/lists/1"
      );
      console.log("Response", response.data);
      dispatch({ type: FETCH_ITEMS_SUCCESS, payload: response.data });
    } catch (error: any) {
      dispatch({ type: FETCH_ITEMS_FAILURE, payload: error.message });
      console.log("Error", error.message);
    }
  };
};
