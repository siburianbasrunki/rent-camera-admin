import RecentOrders from "../../components/ecommerce/RecentOrders";
import PageMeta from "../../components/common/PageMeta";
import DashboardMetrics from "../../components/ecommerce/DashboardMetrics";
import { useAuth } from "../../context/AuthContext";

export default function Home() {
  const { token } = useAuth();
  console.log("token", token);

  return (
    <>
      <PageMeta title="Rent-Cam" description="This is Rent-Cam Management" />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <DashboardMetrics />
        </div>

        <div className="col-span-12 ">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}
