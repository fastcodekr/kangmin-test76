import React from "react";

const VersionTable = ({ versions }) => {
  return (
    <div className="flex flex-col border shadow-md">
      <div className="averflow-y-auto sm:-mx-6 lg:mx-8">
        <div className="inline-block min-w-full py-1 sm:px-4 lg:px-6">
          <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="w-2/12 px-2 py-1 ">
                  Key
                </th>
                <th scope="col" className="w-2/12 px-2 py-1">
                  Last Modified
                </th>
                <th scope="col" className="w-3/12 px-2 py-1">
                  E Tag
                </th>
                <th scope="col" className="w-1/12 px-2 py-1">
                  Size
                </th>
                <th scope="col" className="w-1/12 px-2 py-1">
                  Storage Class
                </th>
                <th scope="col" className="w-2/12 px-2 py-1">
                  Owner
                </th>
                <th scope="col" className="w-1/12 px-2 py-1">
                  Version Id
                </th>
              </tr>
            </thead>
            <tbody>
              {versions.map((item, i) => (
                <tr
                  key={i}
                  className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-200 dark:hover:bg-neutral-200"
                >
                  <td className="w-2/12  px-2 py-1 font-medium">{item.key}</td>
                  <td className="w-2/12  px-2 py-1">{item.lastModified}</td>
                  <td className="w-3/12  px-2 py-1">{item.etag}</td>
                  <td className="w-1/12  px-2 py-1">{item.size}</td>
                  <td className="w-1/12  px-2 py-1">{item.storageClass}</td>
                  <td className="w-2/12  px-2 py-1">{item.owner.displayName}({item.owner.id})</td>
                  <td className="w-1/12  px-2 py-1">{item.versionId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VersionTable;
