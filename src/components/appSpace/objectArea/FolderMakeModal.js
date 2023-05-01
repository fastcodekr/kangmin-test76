import axios from 'axios';
import { useEffect, useRef } from 'react';
import { BASE_URL } from '../../../api/Api';

const FolderMakeModal = ({
    folderModalOpen,
    setFolderModalOpen,
    folders,
    setFolderName,
    folderName,
    selected,
    setFolders,
    handleListUpdate,
    setSelected,
    doubleClickSelected,
}) => {
    const focusRef = useRef();
    const bucketName = selected;
    const folderNameRef = useRef();
    useEffect(() => {
        focusRef.current.focus();
    }, []);

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        if (inputValue.startsWith('/')) {
            event.target.value = inputValue.slice(1);
        }
    };

    const handleFolderMake = async () => {
        const folderName = doubleClickSelected + folderNameRef.current.value;
        try {
            if (folderName) {
                const response = await axios.post(BASE_URL + '/folder/make', {
                    bucketName,
                    folderName,
                });
                if (response.data.successYN === 'true') {
                    // console.log(response.data);
                    // setSelected(`${bucketName}/${folderName}`);
                    // setFolders([...folders, folderName]);
                    handleListUpdate();
                    // setFolderModalOpen(false)
                    alert('폴더가 성공적으로 생성되었습니다.');
                } else {
                    console.log('폴더 생성에 실패했습니다.');
                }
            }
        } catch (error) {
            console.log(error('Folder create error', error));
        }
    };
    const onSubmit = (e) => {
        e.preventDefault();
        handleFolderMake(folderName);
        setFolderModalOpen(false);
    };

    return (
        <div
            className=" z-20 w-64 text-xs  border absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-4 bg-white
    text-gray-600 rounded-md "
            style={{
                boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.1), 16px 16px 32px rgba(0, 0, 0, 0.1)',
            }}
        >
            {folderModalOpen && (
                <div className="modal">
                    <h1 className="mb-3 font-bold text-lg">New Folder</h1>
                    <div className="w-full items-center py-1 px-2 bg-white text-black flex mb-2">
                        <p className="w-1/3 text-gray-600 text-start">Bucket : </p>
                        <p className="w-2/3 text-blue-600 border py-2 text-start pl-2">{selected}</p>
                    </div>
                    <form onSubmit={onSubmit}>
                        <input
                            // ref={focusRef}
                            ref={(el) => {
                                focusRef.current = el;
                                folderNameRef.current = el;
                            }}
                            type="text"
                            placeholder="폴더명/"
                            name="folderName"
                            // value={folderName}
                            onChange={handleInputChange}
                            required
                            className="border w-full px-2 py-2 text-gray-700 text-xs"
                        />
                        <div className="my-4 flex justify-evenly ">
                            <button
                                // onClick={() => handleFolderMake(folderName)}
                                type="submit"
                                className=" border hover:text-yellow-500 px-2 py-1 mr-2"
                            >
                                생성
                            </button>
                            <button
                                onClick={() => setFolderModalOpen(false)}
                                className=" border hover:text-yellow-500 px-2 py-1"
                            >
                                취소
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default FolderMakeModal;
