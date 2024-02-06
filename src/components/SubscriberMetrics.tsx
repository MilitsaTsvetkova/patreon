import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CreditCardIcon, DeleteIcon, StoreIcon } from "lucide-react";

type Props = {
  mrr: number;
  active: number;
  cancelled: number;
};
const SubscriberMetrics = ({ mrr, active, cancelled }: Props) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      <Card className="h-auto p-0 shadow-md">
        <CardHeader className="gap-2 px-6 pb-3 pt-6">
          <CardTitle className="flex flex-row items-center text-sm text-gray-500">
            <StoreIcon className="mr-2 text-gray-500" /> Active Subscribers
          </CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-semibold">{active}</CardContent>
      </Card>
      <Card className="h-auto p-0 shadow-md">
        <CardHeader className="gap-2 px-6 pb-3 pt-6">
          <CardTitle className="flex flex-row items-center text-sm text-gray-500">
            <CreditCardIcon className="mr-2 text-gray-500" /> Monthly Recurring
            Revenue
          </CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-semibold">${mrr}</CardContent>
      </Card>
      <Card className="h-auto p-0 shadow-md">
        <CardHeader className="gap-2 px-6 pb-3 pt-6">
          <CardTitle className="flex flex-row items-center text-sm text-gray-500">
            <DeleteIcon className="mr-2 text-gray-500" /> Cancelled
          </CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-semibold">
          {cancelled}
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriberMetrics;
