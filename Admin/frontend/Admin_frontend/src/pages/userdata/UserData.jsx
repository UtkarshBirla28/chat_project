import { useState } from "react";
import { UserTable } from "../../components/custom/user-table";
import { useParams } from "react-router-dom";
import { useUserData } from "../../hooks/use-user-data";
import { userTableColumns } from "../../utils/usersColumn";

export const UserData = () => {
  const { id } = useParams();
  console.log(id);
  const data = useUserData(id);
  console.log(data);
  return (
    <>
      <UserTable userData={data} userColumn={userTableColumns} />
    </>
  );
};
