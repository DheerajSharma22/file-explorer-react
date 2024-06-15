import React, { useState } from "react";
import { BiSolidFilePlus } from "react-icons/bi";
import { FaFolderPlus } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";

const Folder = ({ explorer, addNodeHandler, editHandler, deleteHandler }) => {
  const [expand, setExpand] = useState(false);
  const [fileFolderName, setFileFolderName] = useState("");
  const [name, setName] = useState(explorer?.name);
  const [isEditActive, setIsEditActive] = useState(null);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const handleToggleEdit = (e, id) => {
    e.stopPropagation();
    setIsEditActive(id);
  };

  
  if (!explorer) return;

  if (explorer.isFolder) {
    return (
      <div className="">
        <div
          className="flex items-center bg-slate-200 px-4 py-2 w-fit rounded-sm gap-10 mb-2 cursor-pointer"
          onClick={() => setExpand(!expand)}
        >
          <span className="flex gap-2 items-center text-lg">
            📁
            {isEditActive === explorer.id ? (
              <form onSubmit={(e) => editHandler(e, explorer.id, name, setIsEditActive)}>
                <input
                  className="font-semibold rounded-sm px-2 bg-transparent border border-gray-400 outline-none"
                  value={name}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                  onBlur={() => {
                    setIsEditActive(null);
                    setName(explorer?.name);
                  }}
                />
              </form>
            ) : (
              <span>{explorer.name}</span>
            )}
          </span>
          <div className="flex items-center justify-center gap-1 text-lg">
            <FaFolderPlus
              className="cursor-pointer"
              onClick={(e) => handleNewFolder(e, true)}
            />
            <BiSolidFilePlus
              className="cursor-pointer"
              onClick={(e) => handleNewFolder(e, false)}
            />
            <MdEdit onClick={(e) => handleToggleEdit(e, explorer.id)} />
            <MdDelete onClick={(e) => deleteHandler(e, explorer.id)}/>
          </div>
        </div>

        <div className={`${expand ? "block" : "hidden"} ml-10`}>
          {showInput.visible && (
            <form
              className="mb-2 flex items-center gap-2"
              onSubmit={(e) => {
                setShowInput({ ...showInput, visible: false });
                setFileFolderName("");
                addNodeHandler(
                  e,
                  explorer.id,
                  fileFolderName,
                  showInput.isFolder
                );
              }}
            >
              <span className="text-xl">
                {showInput.isFolder ? "📁" : "📄"}
              </span>
              <input
                type="text"
                autoFocus
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                className="px-4 py-1 border border-gray-500 outline-none rounded-sm"
                value={fileFolderName}
                onChange={(e) => setFileFolderName(e.target.value)}
                placeholder={
                  showInput.isFolder ? "Enter folder name" : "Enter file name"
                }
              />
            </form>
          )}
          {explorer?.items?.map((expItem, index) => (
            <Folder
              key={index}
              explorer={expItem}
              addNodeHandler={addNodeHandler}
              editHandler={editHandler}
              deleteHandler={deleteHandler}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <span className="flex gap-2 items-center text-lg mb-2">
        📄<span className="font-semibold">{explorer.name}</span>
      </span>
    );
  }
};

export default Folder;
