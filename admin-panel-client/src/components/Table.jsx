export const Table = ({ tableHeaders = [], children }) => {
  return (
    <table className="min-w-full bg-white border rounded shadow-md">
      <thead>
        <tr>
          {tableHeaders.map((heading, index) => (
            <th key={index} className="py-2 px-4 border-b">
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export const Td = ({ children }) => {
  return <td className="py-2 px-4 border-b text-center">{children}</td>;
};
