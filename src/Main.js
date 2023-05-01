import axios from 'axios';
import { useEffect, useState } from 'react';
import AppBottom from './components/appBottom/AppBottom';
import AppHeader from './components/appHeader/AppHeader';
import ObjectArea from './components/appSpace/objectArea/ObjectArea';
import BucketList from './components/appSpace/bucketArea/BucketList';
import TableArea from './components/appSpace/tablesArea/TableArea';
import { BASE_URL } from './api/Api';

function Main() {
    const [isLoading, setIsLoading] = useState(false);
    const [currentUrl, setCurrentUrl] = useState('');
    const [error, setError] = useState(null);
    const [buckets, setBuckets] = useState([]);
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);
    const [properties, setProperties] = useState({});
    const [headers, setHeaders] = useState({});
    const [versions, setVersions] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [selected, setSelected] = useState();
    const [objectSelected, setObjectSelected] = useState('');
    const [folderSelected, setFolderSelected] = useState('');
    const [fileSelected, setFileSelected] = useState('');
    const [folderName, setFolderName] = useState('');
    const [upload_file, setUpload_file] = useState({});
    const [doubleClickSelected, setDoubleClickSelected] = useState('');
    const [objectName, setObjectName] = useState('');
    const [objectList, setObjectList] = useState([]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(BASE_URL + '/bucket/list');
            setBuckets(res.data.returnVal);
            setIsLoading(false);
        } catch (error) {
            console.log('Bucket List Error', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const fetchUrl = async () => {
            await axios.get(BASE_URL + '/storage/url').then((res) => setCurrentUrl(res.data.returnVal));
        };
        fetchUrl();
    }, [currentUrl]);

    const makeBucket = async (formInput) => {
        setIsLoading(true);
        let response;
        try {
            response = await axios.post(BASE_URL + '/bucket/make', { ...formInput });
            fetchData();
        } catch (error) {
            console.log('Bucket Make Error', error);
            response = error.response;
        }
        setIsLoading(false);
        return response;
    };

    const objectDownload = async () => {
        const bucketName = selected;
        const objectName = fileSelected;
        if (objectName) {
            try {
                const response = await axios.post(
                    BASE_URL + '/object/download',
                    { bucketName, objectName },
                    {
                        headers: { 'Content-Type': 'application/json' },
                        responseType: 'blob',
                    },
                );
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', objectName);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            } catch (error) {
                console.error('Download 할 Object를 선택하세요 !! ', error);
                alert('Download 할 Object를 선택하세요 !!');
            }
            setFileSelected('');
        } else {
            alert('Object를 선택해야합니다');
        }
    };

    const handleDelete = async (bucketName) => {
        const deleteConfirmation = window.confirm(`Are you sure you want to delete " ${bucketName} " ?`);

        if (deleteConfirmation) {
            try {
                await axios.delete(BASE_URL + '/bucket/delete', {
                    params: { bucketName },
                });
                if (buckets) {
                    setBuckets((prevElement) => {
                        return prevElement.filter((bucket) => bucket.name !== bucketName);
                    });
                }
            } catch (error) {
                console.error('Error during deletion:', error);
            }
        }
        setObjectSelected('');
    };

    const objectDelete = async (objectName) => {
        const bucketName = selected;
        if (objectName) {
            console.log(objectName);
            if (window.confirm(`Are you sure you want to delete " ${objectName} " ?`)) {
                try {
                    await axios.delete(BASE_URL + '/object/delete', {
                        data: { bucketName, objectName },
                    });

                    setFolders((prevElement) => {
                        return prevElement.filter((folder) => folder !== objectName);
                    });
                    setFiles((prevElement) => {
                        return prevElement.filter((file) => file.objectName !== objectName);
                    });
                } catch (error) {
                    console.error('Error during deletion:', error);
                }
            } else {
                console.log('삭제가 취소됨');
                setObjectName('');
            }
        } else {
            alert('삭제할 폴더명이나 파일명을 선택하세요.');
        }
    };

    // const listAllFolders = (results) => {
    //   let foldersArr = [];

    //   if (doubleClickSelected !== "") {
    //     foldersArr.push(" .  . ");
    //   }

    //   results.map((result) => {
    //     if (result.isFolder) {
    //       foldersArr.push(result.fullObjectName);
    //     }
    //   });

    //   setFolders(foldersArr);
    // };

    const handleListObject = async (bucketName) => {
        try {
            if (bucketName) {
                setIsLoading(true);
                await axios
                    .get(BASE_URL + '/bucket/listObject', {
                        params: { bucketName },
                    })
                    .then((res) => {
                        const newFolders = res.data.returnVal.folders || [];
                        const newFiles = res.data.returnVal.files || [];
                        setFolders(newFolders);
                        setFiles(newFiles);
                        setIsLoading(false);
                    });
            }
        } catch (error) {
            console.error(error);
            setError(' Error가 발생하였습니다.');
        }
    };

    const handleListUpdate = async () => {
        const bucketName = selected;
        try {
            const updateList = await handleListObject(bucketName);
            setObjectList(updateList);
            console.log(objectList);
        } catch (error) {
            console.error('Error fetching updated list', error);
        }
    };

    useEffect(() => {
        // const bucketName = selected;
        handleListObject();
    }, [folders, files]);

    const getLastFolderName = (folderPath) => {
        const pathArray = folderPath.split('/');
        const result = pathArray[pathArray.length - 2];
        return result;
    };

    const getLastFileName = (filePath) => {
        const pathArray = filePath.split('/');
        return pathArray.pop();
    };

    const handleFolder = async (folderName) => {
        const folderNames = doubleClickSelected.split('/').filter((name) => name !== '');
        const bucketName = selected;
        await axios
            .post(BASE_URL + '/folder/list', {
                bucketName,
                folderName,
            })

            .then((res) => {
                const aafolders = res.data.returnVal.folders || [];
                const aafiles = res.data.returnVal.files || [];

                if (folderNames !== null) {
                    console.log('folderNames', folderNames);
                    console.log('folderNames.length', folderNames.length);
                    aafolders.unshift(' .  . ');
                }
                setFolders(aafolders);

                const filteredFiles = aafiles.filter((aafile) => aafile.fileSize > 0);
                setFiles(filteredFiles);

                setDoubleClickSelected(folderName);
            })
            .catch((error) => {
                console.error('Error fetching folder list:', error);
            });
    };

    const goToParentFolder = () => {
        const folderNames = doubleClickSelected.split('/').filter((name) => name !== '');
        const parentFolderPath = folderNames.slice(0, -1).join('/');
        console.log('parentFolderPath', parentFolderPath);
        handleFolder(parentFolderPath);
    };

    const handleBucketProperties = async (bucketName) => {
        if (bucketName) {
            await axios.get(BASE_URL + '/bucket/totalSize', { params: { bucketName } }).then((res) => {
                const propertyData = res.data.returnVal || [];
                setProperties(propertyData);
                // console.log("totalsize",propertyData)
            });
        }
    };

    const handleFolderProperties = async (folderName) => {
        const bucketName = selected;
        if (bucketName) {
            await axios
                .post(BASE_URL + '/folder/totalSize', {
                    bucketName,
                    folderName,
                })
                .then((res) => {
                    const folderPropertyData = res.data.returnVal || [];
                    setProperties(folderPropertyData);
                });
        }
    };

    const handleBucketHeaders = async (bucketName) => {
        if (bucketName) {
            await axios.get(BASE_URL + '/bucket/header', { params: { bucketName } }).then((res) => {
                const headerData = res.data.returnVal || [];
                setHeaders(headerData);
                // console.log("headers",headerData)
            });
        }
    };

    const handleObjectHeader = async (objectName) => {
        const bucketName = selected;
        if (bucketName) {
            await axios
                .post(BASE_URL + '/object/header', {
                    bucketName,
                    objectName,
                })
                .then((res) => {
                    const objectHeaderData = res.data.returnVal || [];
                    setHeaders(objectHeaderData);
                });
        }
    };

    const handleBucketVersions = async (bucketName) => {
        if (bucketName) {
            await axios.get(BASE_URL + '/bucket/version', { params: { bucketName } }).then((res) => {
                const versionData = res.data.returnVal || [];
                setVersions(versionData);
                // console.log("version",versionData)
            });
        }
    };

    const handleObjectVersion = async (objectName) => {
        const bucketName = selected;
        // const objectName = objectSelected;
        if (bucketName) {
            await axios
                .post(BASE_URL + '/object/version', {
                    bucketName,
                    objectName,
                })
                .then((res) => {
                    const objectVersionData = res.data.returnVal || [];
                    setVersions(objectVersionData);
                });
        }
    };

    const handleBucketPermission = async (bucketName) => {
        // const bucketName = selected;
        try {
            await axios.get(BASE_URL + '/bucket/permission', { params: { bucketName } }).then((res) => {
                const permissionData = res.data.returnVal || [];
                setPermissions(permissionData);
                // console.log(permissionData)
            });
        } catch (err) {
            console.log(error('Bucket Permission Error', error));
        }
    };

    const handleObjectPermission = async (objectName) => {
        const bucketName = selected;
        // const objectName = objectSelected;
        try {
            await axios
                .post(BASE_URL + '/object/permission', {
                    bucketName,
                    objectName,
                })
                .then((res) => {
                    const permissionData = res.data.returnVal || [];
                    setPermissions(permissionData);
                    // console.log(permissions)
                });
        } catch (err) {
            console.log(error('Object Permission Error', error));
        }
    };

    return (
        <div className="flex flex-col h-screen w-screen border border-gray-400">
            <AppHeader />
            <div className="spaceAll">
                <div className="spaceUp">
                    <div className="flex w-screen max-h-96 ">
                        <BucketList
                            selected={selected}
                            setSelected={setSelected}
                            isLoading={isLoading}
                            buckets={buckets}
                            setObjectSelected={setObjectSelected}
                            setFileSelected={setFileSelected}
                            makeBucket={makeBucket}
                            handleListObject={handleListObject}
                            handleBucketProperties={handleBucketProperties}
                            handleBucketHeaders={handleBucketHeaders}
                            handleBucketVersions={handleBucketVersions}
                            handleBucketPermission={handleBucketPermission}
                            handleDelete={handleDelete}
                            setDoubleClickSelected={setDoubleClickSelected}
                        />
                        <ObjectArea
                            folderSelected={folderSelected}
                            setFolderSelected={setFolderSelected}
                            doubleClickSelected={doubleClickSelected}
                            setFileSelected={setFileSelected}
                            folders={folders}
                            setFolders={setFolders}
                            setFolderName={setFolderName}
                            objectSelected={objectSelected}
                            setObjectSelected={setObjectSelected}
                            files={files}
                            setFiles={setFiles}
                            error={error}
                            folderName={folderName}
                            selected={selected}
                            isLoading={isLoading}
                            handleFolder={handleFolder}
                            goToParentFolder={goToParentFolder}
                            handleFolderProperties={handleFolderProperties}
                            handleObjectHeader={handleObjectHeader}
                            handleObjectVersion={handleObjectVersion}
                            handleObjectPermission={handleObjectPermission}
                            objectDelete={objectDelete}
                            objectDownload={objectDownload}
                            upload_file={upload_file}
                            setUpload_file={setUpload_file}
                            getLastFolderName={getLastFolderName}
                            getLastFileName={getLastFileName}
                            objectName={objectName}
                            setObjectName={setObjectName}
                            handleListUpdate={handleListUpdate}
                        />
                    </div>
                </div>
                <div className="spaceDown">
                    <TableArea
                        properties={properties}
                        headers={headers}
                        versions={versions}
                        permissions={permissions}
                        selected={selected}
                        objectSelected={objectSelected}
                        currentUrl={currentUrl}
                    />
                </div>
            </div>
            <AppBottom />
        </div>
    );
}

export default Main;
