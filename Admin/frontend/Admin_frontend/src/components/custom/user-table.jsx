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
    <Table>
      <TableHeader>
        <TableRow>
          {userColumn.map((column) => (
            <TableHead className="text-center" key={column.accessor}>
              {column.Header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {userData.map((data) => (
          <TableRow>
            <TableCell className="w-96">
              {data.receiverId.fullName || "Unknown"}
            </TableCell>
            <TableCell className="w-96">
              {data.receiverId.username || "Unknown"}
            </TableCell>
            <TableCell className="w-96 text-center">
              {data.receiverId.gender || "Unknown"}
            </TableCell>
            <TableCell className="w-96">
              {data.createdAt || "Unknown"}
            </TableCell>
            <TableCell className="">{data.message || "Unknown"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
