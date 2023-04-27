import React, { useState } from "react";
import { DocumentIcon, FolderIcon } from "@heroicons/react/24/outline";
import LoadingSpinner from "../../../LoadingSpinner";
import ObjectUploadModal from "./ObjectUploadModal";
import ObjectUpdateModal from "./ObjectUpdateModal";
import FolderMakeModal from "./FolderMakeModal";
import GenerateUrlMakeModal from "./GenerateUrlMakeModal";

const ObjectArea = ({
  isLoading,
  folders,
  setFolders,
  files,
  setFiles,
  error,
  handleFolder,
  goToParentFolder,
  objectSelected,
  setObjectSelected,
  handleFolderProperties,
  handleObjectHeader,
  handleObjectVersion,
  handleObjectPermission,
  objectDelete,
  setFolderName,
  folderName,
  selected,
  objectDownload,
  fileSelected,
  setFileSelected,
  setFolderSelected,
  doubleClickSelected,
  objects,
  setObjects,
  upload_file,
  setUpload_file,
  getLastFolderName,
  getLastFileName,
  objectName,
  setObjectName,
  handleListUpdate,
  setSelected,
}) => {
  const [folderModalOpen, setFolderModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [generateModalOpen, setGenerateModalOpen] = useState(false);

  // const refreshApp = () => {
  //   window.location.reload();
  // };

  const handleFolderClick = (folder) => {
    setObjectSelected(folder);
    handleFolderProperties(folder);
    setFolderSelected(folder);
  };

  const handleObjectClick = (file) => {
    setObjectSelected(file.objectName);
    handleObjectHeader(file.objectName);
    handleObjectVersion(file.objectName);
    handleObjectPermission(file.objectName);
    setFileSelected(file.objectName);
  };

  return (
    <div className="w-4/5 px-4  ">
      <div className="flex justify-between py-2 ">
        <div className="flex">
          <div>
            <button
              className="w-28 text-xs mx-2 py-2 px-4 rounded-lg bg-slate-400 text-white font-bold text-center hover:bg-slate-500 hover:text-yellow-400"
              onClick={() => setFolderModalOpen(true)}
              type="submit"
            >
              New Folder
            </button>
            {folderModalOpen && (
              <FolderMakeModal
                folderModalOpen={folderModalOpen}
                setFolderModalOpen={setFolderModalOpen}
                setFolderName={setFolderName}
                folderName={folderName}
                selected={selected}
                objectSelected={objectSelected}
                folders={folders}
                setFolders={setFolders}
                handleListUpdate={handleListUpdate}
                setSelected={setSelected}
                doubleClickSelected={doubleClickSelected}
              />
            )}
          </div>
          <div>
            <div>
              <button
                className="w-24 text-xs mx-2 py-2 px-4 rounded-lg bg-slate-400 text-white font-bold text-center hover:bg-slate-500 hover:text-yellow-400"
                onClick={() => setUploadModalOpen(true)}
                type="submit"
              >
                Upload
              </button>
              {uploadModalOpen && (
                <ObjectUploadModal
                  uploadModalOpen={uploadModalOpen}
                  setUploadModalOpen={setUploadModalOpen}
                  objectName={objectName}
                  setObjectName={setObjectName}
                  selected={selected}
                  objectSelected={objectSelected}
                  folders={folders}
                  setFolders={setFolders}
                  objects={objects}
                  setObjects={setObjects}
                  upload_file={upload_file}
                  setUpload_file={setUpload_file}
                  files={files}
                  setFiles={setFiles}
                  handleListUpdate={handleListUpdate}
                  doubleClickSelected={doubleClickSelected}
                />
              )}
            </div>
          </div>

          <div>
            <div>
              <button
                className="w-24 text-xs mx-2 py-2 px-4 rounded-lg bg-slate-400 text-white font-bold text-center hover:bg-slate-500 hover:text-yellow-400"
                onClick={() => setUpdateModalOpen(true)}
                type="submit"
              >
                Update
              </button>
              {updateModalOpen && (
                <ObjectUpdateModal
                  updateModalOpen={updateModalOpen}
                  setUpdateModalOpen={setUpdateModalOpen}
                  selected={selected}
                  objectSelected={objectSelected}
                />
              )}
            </div>
          </div>

          <div>
            <button
              className={`w-24 text-xs mx-2 py-2 px-4 rounded-lg bg-slate-400 text-white font-bold text-center hover:bg-slate-500 hover:text-yellow-400`}
              type="submit"
              onClick={objectDownload}
            >
              {" "}
              Download{" "}
            </button>
          </div>
          <div>
            <button
              className="w-24 text-xs mx-2 py-2 px-4 rounded-lg bg-slate-400 text-white font-bold text-center hover:bg-slate-500 hover:text-yellow-400"
              onClick={() => objectDelete(objectSelected)}
            >
              Delete
            </button>
          </div>
          <div>
            <button className="w-32 text-xs mx-2 py-2 px-4 rounded-lg bg-slate-400 text-white font-bold text-center hover:bg-slate-500 hover:text-yellow-400"
                onClick={()=>setGenerateModalOpen(true)}
            >
              Generate URL
            </button>
            {generateModalOpen && (
              <GenerateUrlMakeModal
                generateModalOpen={generateModalOpen}
                setGenerateModalOpen={setGenerateModalOpen}
                selected={selected}
                objectSelected={objectSelected}
                fileSelected={fileSelected}
              />
            )}
          </div>
        </div>
        <div className="w-24 text-xs mx-2 py-2 px-4 rounded-lg bg-slate-400 text-white font-bold text-center hover:bg-slate-500 hover:text-yellow-400">
          <button onClick={() => window.location.reload()}>Refresh</button>
        </div>
      </div>

      <div className=" bg-gray-200 text-gray-700 px-4 py-1 border-2 border-purple-100 rounded-lg shadow-inner flex focus:outline-none focus:shadow-lg ">
        <p className="px-2 ">Path: &nbsp; /</p>
        <span className="text-blue-500">{doubleClickSelected}</span>
      </div>

      <div className="flex flex-col overflow-y-auto h-80 pt-2">
        <div className="inline-block min-w-full py-1 sm:px-1 lg:px-1">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <table className="min-w-full text-left text-sm font-light ">
              <thead className="border-b font-medium dark:border-neutral-400">
                <tr>
                  <th scope="col" className="w-5/12 px-2 py-1 ">
                    Name
                  </th>
                  <th scope="col" className="w-2/12 px-2 py-1">
                    Size
                  </th>
                  <th scope="col" className="w-3/12 px-2 py-1">
                    Last Modified
                  </th>
                  <th scope="col" className="w-2/12 px-2 py-1">
                    Storage Class
                  </th>
                </tr>
              </thead>

              <tbody>
                {error && <div>{error}</div>}
                {folders.map((folder) => (
                  folder !== " .  . " || (folder === " .  . " && doubleClickSelected !== "") ? (
                    <tr
                      className="border-b transition duration-300 ease-in-out hover:bg-neutral-100
                               dark:border-neutral-300 dark:hover:bg-neutral-100"
                      key={folder}
                    >
                      <td className="w-3/12  cursor-pointer font-medium">
                        {folder === " .  . " ? (
                          <div
                            className="flex px-2 hover:bg-red-400 "
                            onDoubleClick={goToParentFolder}
                          >
                            <span>
                              <FolderIcon className="w-5 mr-2 text-amber-600" />
                            </span>
                            <span>{folder}</span>
                          </div>
                        ) : (
                          <div
                            className={`flex px-2 py-1 ${
                              objectSelected === folder ? " bg-red-400  text-white" : ""
                            } `}
                            onDoubleClick={() => handleFolder(folder)}
                            onClick={() => handleFolderClick(folder)}
                          >
                            <span>
                              <FolderIcon className="w-5 mr-2 text-amber-600" />
                            </span>{" "}
                            <span>{getLastFolderName(folder)}</span>
                          </div>
                        )}
                      </td>
                
                      <td className="w-2/12  px-2 py-1"></td>
                      <td className="w-3/12  px-2 py-1"></td>
                      <td className="w-2/12  px-2 py-1"></td>
                      <td className="w-2/12  px-2 py-1"></td>
                    </tr>
                  ) : null
                ))}
                  
                {files.map((file, index) => (
                  <tr
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100
                  dark:border-neutral-300 dark:hover:bg-neutral-100"
                    key={file.objectName + "-" + index}
                  >
                    <td className="w-3/12 font-medium ">
                      <div
                        className={`flex px-2 py-1 hover:cursor-pointer ${
                          objectSelected === file.objectName
                            ? " bg-red-400  text-white"
                            : ""
                        }`}
                        onClick={() => handleObjectClick(file)}
                      >
                        <DocumentIcon className="w-5 mr-2 text-gray-500" />
                        <span className="mr-4">
                          {/* {file.objectName} */}
                          {getLastFileName(file.objectName)}
                        </span>
                      </div>
                    </td>
                    <td className="w-2/12  px-2 py-1">
                      {(file.fileSize / 1024).toFixed(2)}kb
                    </td>
                    <td className="w-3/12  px-2 py-1">{file.lastModified}</td>
                    <td className="w-2/12  px-2 py-1">{file.storageClass}</td>
                    <td className="w-2/12  px-2 py-1"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ObjectArea;
