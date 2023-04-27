
const PerMissionsTable = ({ permissions }) => {
  // const checkbox = useRef();
  // const [checked, setChecked] = useState(false);
  return (
    <div className="flex flex-col border shadow-md">
      <div className="averflow-y-auto sm:-mx-6 lg:mx-8">
        <div className="inline-block min-w-full py-1 sm:px-4 lg:px-6">
          <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="w-2/12 px-2 py-1 ">
                  User Name
                </th>
                <th scope="col" className="w-2/12 px-2 py-1">
                  권한1(Full Control)
                </th>
                <th scope="col" className="w-2/12 px-2 py-1">
                권한2(Read)
                </th>
                <th scope="col" className="w-2/12 px-2 py-1">
                  권한3(Write)
                </th>
                <th scope="col" className="w-2/12 px-2 py-1">
                  권한4(Read Permissions)
                </th>
                <th scope="col" className="w-2/12 px-2 py-1">
                  권한5(Write Permissions)
                </th>
              </tr>
            </thead>
            <tbody>
            {Object.entries(permissions).map(([key, value]) => (
              <tr
                key={key}
                className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-200 dark:hover:bg-neutral-200"
              >
                <td className="w-2/12  px-2 py-1 font-medium">{key}</td>
                {value.map((permission, index) => (
                  <td key={index}>{permission}</td>
                ))}
                {/* <td className="w-2/12  px-2 py-1">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-600 rounded"
                    ref={checkbox}
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                  />
                </td>
                <td className="w-2/12  px-2 py-1">

                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-600 rounded"
                    ref={checkbox}
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                  />
                </td>
                <td className="w-2/12  px-2 py-1">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-600 rounded"
                    ref={checkbox}
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                  />
                </td>
                <td className="w-2/12  px-2 py-1">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-600 rounded"
                    ref={checkbox}
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                  />
                </td>
                <td className="w-2/12  px-2 py-1">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-600 rounded"
                    ref={checkbox}
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                  />
                </td> */}
              </tr>
               ))} 

             
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PerMissionsTable;
