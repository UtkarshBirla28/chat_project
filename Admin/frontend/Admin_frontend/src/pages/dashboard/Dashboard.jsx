import { DataTable } from "../../components/custom/data-table";
import { useDashboard } from "../../hooks/use-dashboard";
import { dashboardColumn } from "../../utils/dashboardColumn";

export const Dashboard = () => {
  const { data, error, loading } = useDashboard();
  return (
    <div>
      <h1 className="text-red-500 text-3xl font-bold underline text-center mb-10">
        Admin portal
      </h1>
      {<DataTable tableData={data} column={dashboardColumn} />}
    </div>
  );
};
