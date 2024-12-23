import { createStore } from "redux";
import { test, expect } from "vitest";
import { State, toDoListReducer } from "./store";
import { ToDoItemProps } from "../components/ToDoItem";

test("should define empty item when adding item", () => {
  const initialState: State = {
    items: [],
    newItem: null,
  };
  const store = createStore(toDoListReducer, initialState);
  store.dispatch({ type: "ADD_ITEM" });

  const state = store.getState();

  const expectedNewItem: ToDoItemProps = { text: "", isEditing: true };

  expect(state?.newItem).toEqual(expectedNewItem);
});

test("should change new item's text when edit new action is run", () => {
  const initialState: State = {
    items: [],
    newItem: { text: "", isEditing: true },
  };

  const store = createStore(toDoListReducer, initialState);
  store.dispatch({ type: "EDIT_NEW_ITEM", payload: "Clean up your room" });

  const state = store.getState();

  const expectedNewItem: ToDoItemProps = {
    text: "Clean up your room",
    isEditing: true,
  };

  expect(state?.newItem).toEqual(expectedNewItem);
});

test("should add new item to the items list when create item is run", () => {
  const initialState: State = {
    items: [],
    newItem: {
      text: "Clean up your room",
      isEditing: true,
    },
  };

  const store = createStore(toDoListReducer, initialState);
  store.dispatch({ type: "CREATE_ITEM" });

  const state = store.getState();

  const expectedState: State = {
    items: [
      {
        text: "Clean up your room",
        isEditing: true,
      },
    ],
    newItem: null,
  };

  expect(state).toEqual(expectedState);
});

test("should empty new item when CANCEL_ITEM is run", () => {
  const initialState: State = {
    items: [],
    newItem: {
      text: "Clean up your room",
      isEditing: true,
    },
  };

  const store = createStore(toDoListReducer, initialState);
  store.dispatch({ type: "CANCEL_ITEM" });

  const state = store.getState();

  const expectedState: State = {
    items: [],
    newItem: null,
  };

  expect(state).toEqual(expectedState);
});
