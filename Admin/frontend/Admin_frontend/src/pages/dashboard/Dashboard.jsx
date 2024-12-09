import { DataTable } from "../../components/custom/data-table";
import { useDashboard } from "../../hooks/use-dashboard";
import { dashboardColumn } from "../../utils/dashboardColumn";

export const Dashboard = () => {
  const { data, error, loading } = useDashboard();
  return <div>{<DataTable tableData={data} column={dashboardColumn} />}</div>;
};
