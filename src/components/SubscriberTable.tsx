import { CheckCheckIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const SubscriberTable = () => {
  return (
    <Table className="mt-6">
      <TableCaption>All current/past subscribers</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Active</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Tim Dillon</TableCell>
          <TableCell>timdillon@gmail.com</TableCell>
          <TableCell>
            <CheckCheckIcon className="text-green-500" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default SubscriberTable;
