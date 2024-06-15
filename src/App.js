import React, { useState } from "react";
import Folder from "./components/Folder";
import explorer from "./data/folderData";

const App = () => {
  const [explorerData, setExplorerData] = useState(explorer);

  const addNode = (id, data, name, isFolder) => {
    if (!data) return;
    if (data.id === id) {
      data.items.push({
        name: name,
        id: new Date(),
        isFolder,
        items: [],
      });

      return data;
    }

    let latestItems = data.items?.map((dataItem) =>
      addNode(id, dataItem, name, isFolder)
    );
    return { ...data, items: latestItems };
  };

  const addNodeHandler = (e, id, name, isFolder) => {
    e.preventDefault();
    if (name.length === 0) return;
    const data = addNode(id, explorerData, name, isFolder);
    console.log(name, isFolder);
    setExplorerData(data);
  };

  const editNode = (data, id, newName) => {
    if (!data) return;
    if (data.id === id) {
      data.name = newName;
      return data;
    }
    let latestItems = data.items?.map((dataItem) =>
      editNode(dataItem, id, newName)
    );
    return { ...data, items: latestItems };
  };

  const editHandler = (e, id, newName, setIsEditActive) => {
    e.preventDefault();
    if (newName.length === 0) return;
    const data = editNode(explorerData, id, newName);
    setExplorerData(data);
    setIsEditActive(null);
  };

  const deleteNode = (data, id) => {
    if (!data) return;
    if (data.id === id) return null;
    let latestItems = data.items?.map((dataItem) => deleteNode(dataItem, id));
    return { ...data, items: latestItems };
  };

  const deleteHandler = (e, id) => {
    e.preventDefault();
    const data = deleteNode(explorerData, id);
    console.log(data);
    setExplorerData(data);
  };

  return (
    <div>
      <div className="w-11/12 mx-auto mt-10">
        <Folder
          explorer={explorerData}
          addNodeHandler={addNodeHandler}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
        />
      </div>
    </div>
  );
};

export default App;
