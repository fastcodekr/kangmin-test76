import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../../../api/Api";

const GenerateUrlMakeModal = ({
  setGenerateModalOpen,
  selected,
  objectSelected,
  fileSelected,
}) => {
  const [urlData, setUrlData] = useState("");
  const [extendTab, setExtendTab] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const timeRef = useRef();

  useEffect(() => {
    timeRef.current.focus();
  }, []);

  const closeModal = () => {
    setGenerateModalOpen(false);
  };

  const handleCopy = async () => {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(urlData);
        setIsCopied(true);
      } catch (err) {
        console.error("Error copying text: ", err);
      }
    } else {
      // Fallback for browsers that don't support the Clipboard API
      const textarea = document.createElement("textarea");
      textarea.value = urlData;
      textarea.style.position = "fixed"; // This will prevent the textarea from causing any layout changes.
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      try {
        const successful = document.execCommand("copy");
        setIsCopied(successful);
      } catch (err) {
        console.error("Error copying text: ", err);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };

  const handleGURL = (e) => {
    e.preventDefault();
    const form = e.currentTarget.elements;
    const formInputs = {
      expirationHour: form.expirationHour.value,
    };
    if (e.currentTarget.checkValidity() === true) {
      generalMake(formInputs);
      // closeModal();
    }
  };

  const generalMake = async (formInput) => {
    const bucketName = selected;
    const objectName = objectSelected;
    const fileName = fileSelected;
    console.log(objectName, fileName);
    if (objectName) {
      try {
        await axios
          .post(BASE_URL + "/object/signedGetUrl", {
            bucketName,
            objectName,
            ...formInput,
          })
          .then((res) => {
            console.log(res.data.returnVal);
            setExtendTab(true);
            const generalUrlResult = res.data.returnVal;
            setUrlData(generalUrlResult);
          });
      } catch (err) {
        console.log(err("Generate URL 처리 Error"));
      }
    } else {
      alert("Object 명을 선택하세요.");
    }
  };

  return (
    <div
      className=" z-20 w-64 px-4 text-xs  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border p-4 bg-white text-gray-600 rounded-md"
      style={{
        boxShadow:
          "8px 8px 16px rgba(0, 0, 0, 0.1), 16px 16px 32px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 className=" mb-3 font-bold text-lg">Generate URL</h1>
      <div className=" flex  ">
        <p className="  w-1/3 text-start ">Bucket명 : </p>
        <p className="w-2/3 text-blue-500 text-start ml-2">{selected}</p>
      </div>
      <div className="flex mb-2">
        <p className="w-1/3 text-start ">Object명 : </p>
        <p className="w-2/3 text-blue-500 text-start ml-2">{objectSelected}</p>
      </div>
      <form onSubmit={handleGURL} className="w-full">
        <div className="flex justify-center items-center">
          <input
            type="text"
            ref={timeRef}
            name="expirationHour"
            required
            className="w-10 border px-2 py-1 text-gray-700"
          />
          <span className="ml-4">시간</span>
        </div>
        <div className="my-3 flex justify-evenly ">
          <button
            type="submit"
            className="border px-2 py-1 mr-2 hover:text-yellow-500 "
          >
            URL생성
          </button>
          <button
            onClick={closeModal}
            className=" border px-2 py-1 hover:text-yellow-500"
          >
            닫기
          </button>
        </div>
      </form>
      <div className="border">
        {extendTab && (
          <div className=" flex flex-col bg-white text-black">
            <p
              className="border text-xs text-blue-500 text-start p-2"
              style={{ overflowWrap: "break-word" }}
            >
              {urlData}{" "}
            </p>
            <div className="flex justify-evenly my-4">
              <button
                className="bg-blue-500 px-2 py-1 text-white"
                onClick={handleCopy}
              >
                {isCopied ? "Copied!" : "Copy"}
              </button>
              <button onClick={closeModal} className="border py-1 px-2">
                닫기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateUrlMakeModal;
