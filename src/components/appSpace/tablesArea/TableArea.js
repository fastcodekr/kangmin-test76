import { useEffect, useState } from "react";
import HeadersTable from "./tables/HeadersTable";
import PerMissionsTable from "./tables/PerMissionsTable";
import PropertiesTable from "./tables/PropertiesTable";
import VersionTable from "./tables/VersionTable";

const tabs = ["Headers", "Properties", "Version", "Permissions"];

const TableArea = ({
  properties,
  headers,
  versions,
  selected,
  objectSelected,
  currentUrl,
  permissions,
  // setPermissions,
}) => {
  const [tabNames, setTabNames] = useState([]);
  const [activeTab, setActiveTab] = useState();

  let currentURL = currentUrl;

  if (selected) {
    currentURL = currentURL + "/" + selected;
  }
  if (objectSelected) {
    currentURL = currentURL + "/" + objectSelected;
  }

  useEffect(() => {
    setTabNames(tabs);
    // console.log(tabs)
  }, []);

  const renderTab = () => {
    switch (activeTab) {
      case "Headers":
        return <HeadersTable headers={headers} />;
      case "Properties":
        return <PropertiesTable properties={properties} />;
      case "Version":
        return <VersionTable versions={versions} />;
      case "Permissions":
        return <PerMissionsTable permissions={permissions} />;
      default:
        return null;
    }
  };

  return (
    <div className="profileMenu w-screen px-4  ">
      <div className="bg-slate-300 rounded-md text-gray-700 text-sm my-1 px-4 py-2  shadow-inner flex focus:outline-none  ">
        <p className="px-2">URL : </p>
        <span className="text-blue-600">{currentURL}</span>
      </div>
      <ul className="flex py-1 px-1 bg-gray-200 items-center w-full rounded-md border-gray-300 hover:ring-indigo-500   ">
        {tabNames.map((tabName) => (
          <li
            key={tabName}
            onClick={() => setActiveTab(tabName)}
            className={` cursor-pointer text-sm h-7 border border-gray-300 mx-1 px-4 hover:bg-red-400 hover:text-white 
          ${activeTab === tabName ? "bg-red-400 text-white" : "bg-slate-200"}`}
          >
            {tabName}
          </li>
        ))}
      </ul>

      <div className="overflow-y-auto h-80 ">{renderTab()}</div>
    </div>
  );
};

export default TableArea;
