import SubscriberMetrics from "../../../components/SubscriberMetrics";
import SubscriberTable from "../../../components/SubscriberTable";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { api } from "../../../trpc/server";

const AnalyticsPage = async () => {
  const subscriptions = await api.subscribe.getSubscriptions.query();
  const active = subscriptions.reduce((total, subscription) => {
    if (subscription.active) {
      return total + 1;
    }
    return total;
  }, 0);
  const cancelled = subscriptions.reduce((total, subscription) => {
    if (!subscription.active) {
      return total + 1;
    }
    return total;
  }, 0);
  const mrr = subscriptions.reduce((total, subscription) => {
    if (subscription.active) {
      return total + Number(subscription.amount);
    }
    return total;
  }, 0);
  return (
    <Card>
      <CardHeader className="text-xl font-semibold">
        View your Analytics
      </CardHeader>
      <CardContent>
        <SubscriberMetrics mrr={mrr} active={active} cancelled={cancelled} />
        <SubscriberTable subscriptions={subscriptions} />
      </CardContent>
    </Card>
  );
};

export default AnalyticsPage;
