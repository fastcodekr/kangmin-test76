import React from "react";

const PropertiesTable = ({ properties }) => {
  return (
    <div className="flex flex-col border shadow-md">
      <div className="averflow-y-auto sm:-mx-6 lg:mx-8">
        <div className="inline-block min-w-full py-1 sm:px-4 lg:px-6">
          <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="w-1/5 px-2 py-1 ">
                  Property
                </th>
                <th scope="col" className="w-4/5 px-2 py-1">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(properties).map(([key,value]) => (

                <tr key={key} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-200 dark:hover:bg-neutral-200">
                  <td className="w-1/5  px-2 py-1 font-medium">{key}</td>
                  <td className="w-4/5  px-2 py-1">{value}</td>
                  </tr>
              ))}
            </tbody>


          </table>
        </div>
      </div>
    </div>
  );
};

export default PropertiesTable;
