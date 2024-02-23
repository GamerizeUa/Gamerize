import OrderHistory from "../components/OrderHistory/OrderHistory.jsx";
import { NavigationTabs } from "../components/common-components/NavigationTabs/NavigationTabs.jsx";

export default function OrderHistoryPage() {
  return (
    <div>
      <NavigationTabs />
      <OrderHistory />
    </div>
  );
}
