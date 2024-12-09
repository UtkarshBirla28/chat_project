import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "../ui/table";

export const UserTable = ({ userData = [], userColumn = [] }) => {
  return (
    <div className="overflow-x-auto bg-gradient-to-r from-blue-50 to-indigo-100 p-6 rounded-lg shadow-lg mx-auto my-6 w-full max-w-screen-xl">
      <Table>
        <TableCaption className="text-lg text-center text-gray-600 mb-4 font-semibold">
          User Messages
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
            {userColumn.map((column) => (
              <TableHead
                key={column.accessor}
                className="p-3 text-left text-lg font-semibold"
              >
                {column.Header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {userData.map((data, index) => (
            <TableRow
              key={index}
              className="cursor-pointer hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 transition-all duration-200"
            >
              <TableCell className="p-3 text-gray-800">
                {data.receiverId.fullName || "Unknown"}
              </TableCell>
              <TableCell className="p-3 text-gray-800">
                {data.receiverId.username || "Unknown"}
              </TableCell>
              <TableCell className="p-3 text-center text-gray-800">
                {data.receiverId.gender || "Unknown"}
              </TableCell>
              <TableCell className="p-3 text-gray-800">
                {data.createdAt || "Unknown"}
              </TableCell>
              <TableCell className="p-3 text-gray-800">
                {data.message || "Unknown"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
