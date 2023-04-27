import React, { useRef } from "react";
import { BASE_URL } from "../../../api/Api";
import axios from "axios";

const updateFile = async (bucketName, objectName, upload_file) => {
  const formData = new FormData();
  formData.append("bucketName", bucketName);
  formData.append("objectName", objectName);

  const encodedFileName = encodeURIComponent(upload_file.name);
  formData.append("upload_file", upload_file, encodedFileName);

  try {
    const response = await axios.put(BASE_URL + "/object/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    if (response.data.successYN === "true") {
      alert("Object 내용이 수정되었습니다.");
    } else {
      console.error("Error while saving file:", response.data.errorMsg || 'Unexpected error');
    }
  } catch (err) {
    console.error("Object Update Error", err);
  }
};

const ObjectUpdateModal = ({
  updateModalOpen,
  setUpdateModalOpen,
  selected,
  objectSelected,
}) => {
  const bucketName = selected;
  const objectName = objectSelected;
  const fileRef = useRef();

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.startsWith("/")) {
      event.target.value = inputValue.slice(1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const upload_file = fileRef.current.files[0];

    if (bucketName && objectName && upload_file) {
      updateFile(bucketName, objectName, upload_file);
      setUpdateModalOpen(false);
    } else {
      console.error("Please provide all required fields");
    }
  };
  return (
    <div className=" z-20 w-64 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border p-4 bg-white text-gray-600 rounded-md"
    style={{
      boxShadow:
        "8px 8px 16px rgba(0, 0, 0, 0.1), 16px 16px 32px rgba(0, 0, 0, 0.1)",
    }}>
      {updateModalOpen && (
        <div className="modal">
          <div className="modal-content flex flex-col">
            <h1 className="mb-3 font-bold text-lg">Update Object</h1>

            <form onSubmit={handleSubmit} className="flex flex-col ">
              <div className="flex text-xs items-center justify-between my-1">
                <label className="w-2/5 text-start">Bucket Name</label>
                <input
                  className="border w-3/5 text-blue-600 py-1 pl-2  text-start"
                  type="text"
                  placeholder="Bucket Name"
                  value={bucketName}
                  readOnly
                />
              </div>
              <div className=" flex items-center mt-1 mb-2 text-xs">
                <label className="w-2/5 text-start ">Object Name</label>
                <input
                  className="w-3/5 border text-blue-600 text-xs py-1 mt-1 px-2"
                  type="text"
                  value={objectName}
                  // placeholder="폴더명/폴더명/fileName.pdf"
                  //   ref={objectNameRef}
                  onChange={handleInputChange}
                />
              </div>
              <input
                type="file"
                ref={fileRef}
                className="border my-1 text-xs py-1 px-2 text-gray-500"
              />

              <div className="flex justify-evenly my-2 text-xs">
                <button
                  type="submit"
                  className="border px-2 py-1 rounded hover:text-yellow-500"
                >
                  파일변경
                </button>
                <button
                  onClick={() => setUpdateModalOpen(false)}
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

export default ObjectUpdateModal;
