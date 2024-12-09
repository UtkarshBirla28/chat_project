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
import { useNavigate } from "react-router-dom";
export const DataTable = ({ tableData = [], column = [] }) => {
  const navigate = useNavigate();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {column.map((column) => (
            <TableHead key={column.accessor}>{column.Header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((data, index) => (
          <TableRow
            onClick={() => {
              navigate(`/user/${data._id}`);
            }}
          >
            <TableCell key={index}>{data.fullName || "Unknown"}</TableCell>
            <TableCell key={index}>{data.username || "Unknown"}</TableCell>
            <TableCell key={index}>{data.gender || "Unknown"}</TableCell>
            <TableCell key={index}>{data.createdAt || "Unknown"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
