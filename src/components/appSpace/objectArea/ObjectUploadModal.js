import axios from "axios";
import { useRef } from "react";
import { BASE_URL } from "../../../api/Api";

const ObjectUploadModal = ({
  selected,
  uploadModalOpen,
  setUploadModalOpen,
  handleListUpdate,
  doubleClickSelected,
}) => {
  const bucketName = selected;
  const objectNameRef = useRef(null);
  const fileRef = useRef();

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.startsWith("/")) {
      event.target.value = inputValue.slice(1);
    }
  };

  const saveFile = async (bucketName, objectName, file) => {
    const formData = new FormData();
    formData.append("bucketName", bucketName);
    formData.append("objectName", objectName);

    const encodedFileName = encodeURIComponent(file.name);
    formData.append("upload_file", file, encodedFileName);

    try {
      const response = await axios.post(BASE_URL + "/object/make", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);
      if (response.data.successYN === "true") {
        handleListUpdate();
        alert("File successfully saved");
      } else {
        console.error(
          "Error while saving file:",
          response.data.errorMsg || "Unexpected error"
        );
      }
    } catch (error) {
      console.error("Request error:", error);
      if (error.response) {
        console.error(
          "Server response error:",
          error.response.status,
          error.response.data
        );
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const objectName = doubleClickSelected + objectNameRef.current.value;
    const file = fileRef.current.files[0];

    if (bucketName && objectName && file) {
      saveFile(bucketName, objectName, file);
      setUploadModalOpen(false);
    } else {
      console.error("Please provide all required fields");
    }
  };

  return (
    <div
      className=" z-20 w-64 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border p-4 bg-white text-gray-600 rounded-md"
      style={{
        boxShadow:
          "8px 8px 16px rgba(0, 0, 0, 0.1), 16px 16px 32px rgba(0, 0, 0, 0.1)",
      }}
    >
      {uploadModalOpen && (
        <div className="modal">
          <div className="modal-content flex flex-col">
            <h1 className="mb-3 font-bold text-lg">Upload Object</h1>

            <form onSubmit={handleSubmit} className="flex flex-col ">
              <div className="flex text-xs items-center justify-between my-1">
                <label className="w-2/5">Bucket Name</label>
                <input
                  className="border w-3/5 text-blue-600 py-1 pl-2  text-start"
                  type="text"
                  placeholder="Bucket Name"
                  value={bucketName}
                  readOnly
                />
              </div>
              <input
                type="file"
                ref={fileRef}
                className="border my-1 text-xs py-1 px-2 text-gray-500"
              />
              <div className=" flex flex-col mt-4 mb-2 text-xs">
                <label className="text-start ">Object Name</label>
                <input
                  className=" border text-blue-600 text-xs py-1 mt-1 px-2"
                  type="text"
                  placeholder="object명"
                  ref={objectNameRef}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-evenly my-2 text-xs">
                <button
                  type="submit"
                  className="border px-2 py-1 rounded hover:text-yellow-500"
                >
                  Upload
                </button>
                <button
                  onClick={() => setUploadModalOpen(false)}
                  className="border px-2 py-1 rounded hover:text-yellow-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ObjectUploadModal;
