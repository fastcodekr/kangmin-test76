import { FolderIcon, TrashIcon } from "@heroicons/react/24/outline";
import LoadingSpinner from "../../../LoadingSpinner";
import BucketMake from "./BucketMake";

const BucketList = ({
  setDoubleClickSelected,
  setObjectSelected,
  setFileSelected,
  isLoading,
  selected,
  setSelected,
  buckets,
  makeBucket,
  handleListObject,
  handleDelete,
  handleBucketProperties,
  handleBucketHeaders,
  handleBucketVersions,
  handleBucketPermission,
}) => {

  const handleBucketClick = (bucket) => {
    setSelected(bucket.name);
    handleListObject(bucket.name);
    handleBucketProperties(bucket.name);
    handleBucketHeaders(bucket.name);
    handleBucketVersions(bucket.name);
    handleBucketPermission(bucket.name)
    setObjectSelected("");
    setFileSelected("");
    setDoubleClickSelected("");
  };

  return (
    <div className="w-1/5  py-2 px-4  ">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div >
          <div >
            <BucketMake makeBucket={makeBucket} isLoading={isLoading} />
          </div>
          <div className="mt-6 overflow-y-auto h-80">
            {buckets.map((bucket) => (
              <div
                key={bucket.name}
                onClick={() => handleBucketClick(bucket)}
                className={`flex items-center px-1 w-full hover:cursor-pointer `}
              >
                <div
                  className={`flex w-5/6 hover:bg-red-200 px-2 py-1 ${
                    selected === bucket.name
                      ? "bg-red-400 text-white  hover:text-black"
                      : ""
                  } `}
                >
                  <FolderIcon className="w-5 mr-2 text-amber-700" />
                  <p className={``}> {bucket.name} </p>
                </div>
                <div className="w-1/6">
                  <TrashIcon
                    className="w-5 text-gray-400 hover:text-red-400"
                    onClick={() => handleDelete(bucket.name)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BucketList;
