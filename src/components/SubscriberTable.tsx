import { CheckCheckIcon, XCircleIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { RouterOutputs } from "../trpc/shared";
type Props = {
  subscriptions: RouterOutputs["subscribe"]["getSubscriptions"];
};

const SubscriberTable = ({ subscriptions }: Props) => {
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
        {subscriptions.map((subscription) => (
          <TableRow key={subscription.id}>
            <TableCell>{subscription.profile?.name}</TableCell>
            <TableCell>{subscription.profile?.email}</TableCell>
            <TableCell>
              {subscription.active ? (
                <CheckCheckIcon className="text-green-500" />
              ) : (
                <XCircleIcon className="text-red-500" />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SubscriberTable;
