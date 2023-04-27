import { useEffect, useRef } from "react";

const BucketMakeModal = ({ setModalOpen, makeBucket }) => {
  // const [alert, setAlert] = useState(null);

  const bucketRef = useRef();
  useEffect(() => {
    bucketRef.current.focus();
  },[])

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleMake = async(e) => {
    e.preventDefault();
  
    const form = e.currentTarget.elements;
    const formInputs = {
      bucketName: form.bucketName.value,
    };
    if (e.currentTarget.checkValidity() === true) {
      const response = await makeBucket(formInputs); 
      console.log('response:' , response);
      if (response && response.data.successYN === "false") { 
        console.log("Condition is true");
        if (response.data.errorMsg ) {
          alert(response.data.errorMsg);
        } else {
          alert("An error occurred while creating the bucket");
        }
      } else if (response && response.data.successYN === "true") {
        closeModal();
      }
    }
  };

  return (
    <div className=" z-20 w-64 text-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-4 bg-white
     text-gray-600 rounded-md "   style={{
      boxShadow:"8px 8px 16px rgba(0, 0, 0, 0.1), 16px 16px 32px rgba(0, 0, 0, 0.1)",
    }}>
      <h1 className="mb-3 text-center font-bold text-lg">New Bucket</h1>
      {/**
      {alert && (
        <div className="mb-3 text-center text-red-500">{alert}</div>
      )}
      */ }
      <form onSubmit={handleMake}>
        <input 
          ref={bucketRef}
          type="text"
          name="bucketName"
          placeholder="bucket name"
          required
          className="border w-full px-2 py-2 text-gray-700"

        />
        <div className="my-4 flex justify-evenly ">
          <button type="submit" 
            className=" border hover:text-yellow-500 px-2 py-1 mr-2"
          >
            생성
          </button>
          <button
            onClick={closeModal}
            className=" border hover:text-yellow-500 px-2 py-1"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default BucketMakeModal;
