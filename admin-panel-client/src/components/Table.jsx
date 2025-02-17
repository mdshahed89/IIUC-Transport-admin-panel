export const Table = ({ tableHeaders = [], children }) => {
  return (
    <table className="min-w-full bg-white border ">
      <thead>
        <tr>
          {tableHeaders.map((heading, index) => (
            <th
              key={index}
              className="py-2 px-4 border-b bg-gray-100 text-gray-700 "
            >
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export const Td = ({ classes, children }) => {
  return (
    <td className={` p-2 border text-gray-700 text-center ${classes}`}>
      {children}
    </td>
  );
};
