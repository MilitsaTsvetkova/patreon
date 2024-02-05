import SubscriberMetrics from "../../../components/SubscriberMetrics";
import SubscriberTable from "../../../components/SubscriberTable";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";

const AnalyticsPage = () => {
  return (
    <Card>
      <CardHeader className="text-xl font-semibold">
        View your Analytics
      </CardHeader>
      <CardContent>
        <SubscriberMetrics />
        <SubscriberTable />
      </CardContent>
    </Card>
  );
};

export default AnalyticsPage;
