import { DataTable } from "../../components/custom/data-table";
import { useDashboard } from "../../hooks/use-dashboard";
import { dashboardColumn } from "../../utils/dashboardColumn";

export const Dashboard = () => {
  const { data, error, loading } = useDashboard();
  <h1 className="text-center text-3xl ">Admin Portal </h1>;
  return <div>{<DataTable tableData={data} column={dashboardColumn} />}</div>;
};
