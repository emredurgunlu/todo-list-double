import { useState } from "react";
import TodoModel from "../models/TodoModel.js";
// https://www.youtube.com/watch?v=bhDlzl_GPoU
let subIndex = -1;
function TodoApp() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  function addItem() {
    if (!newItem) {
      alert("enter an item");
      return;
    }
    let isWritten = true;
    items.map((item) => {
      if (item.title === newItem) {
        alert("already written");
        isWritten = false;
      }
    });
    if (isWritten) {
      const item = new TodoModel(newItem, []);
      setItems((oldItems) => [...oldItems, item]);
      setNewItem("");
    }
  }

  function deleteItem(value) {
    const newArray = items.filter((item) => item.title !== value);
    setSubTitle("Sub");
    setItems(newArray);
  }

  // below for sub
  const [newSubItem, setNewSubItem] = useState("");
  const [subTitle, setSubTitle] = useState("Sub");
  const [deletedSubItem, setDeletedSubItem] = useState("");
  function addSubItem() {
    if (!newSubItem) {
      alert("enter an item");
      return;
    }
    let isWritten = true;
    if (items[subIndex] !== undefined) {
      items[subIndex].sub.map((item) => {
        if (item === newSubItem) {
          alert("already written");
          isWritten = false;
        }
      });
    }

    if (isWritten && items[subIndex] !== undefined) {
      items[subIndex].sub.push(newSubItem);
      setNewSubItem(""); //just to refresh
    } else if (items[subIndex] !== undefined) {
      return;
    } else {
      alert("please select an item from main todo list");
    }
  }

  function showSubList(title, index) {
    subIndex = index;
    setSubTitle(title);
  }

  function deleteSubItem(index) {
    setDeletedSubItem(items[subIndex].sub.splice(index, 1));
  }
  // above for sub
  return (
    <div className="row" >
      <div className="col-md-6  col-sm-12">
        <h1>Main Todo List</h1>
        <input
          type="text"
          placeholder="add an item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        ></input>
        <button className="btn-indigo" onClick={() => addItem()}>Add</button>

        {items.map((item, index) => {
          return (
            <div className="row align-items-center" key={item.title}>
              <div
                className="col-6 align-middle"
                onClick={() => showSubList(item.title, index)}
              >
                {item.title}{" "}
              </div>
              <button className="col-6  btn-red" onClick={() => deleteItem(item.title)}>
                X
              </button>
            </div>
          );
        })}
      </div>
      <div className="col-md-6  col-sm-12">
        <h1>{subTitle} Todo List</h1>
        <input
          type="text"
          placeholder="add a sub item"
          value={newSubItem}
          onChange={(e) => setNewSubItem(e.target.value)}
        ></input>
        <button className="btn-indigo" onClick={() => addSubItem(subIndex)}>Add</button>
        {items[subIndex]?.sub.map((item, index) => {
          return (
            <div className="row align-items-center" key={item}>
              <div className="col-6">{item} </div>
              <button className="col-6  btn-red" onClick={() => deleteSubItem(index)}>
                X
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TodoApp;
