"use client";
import useUsersApi from "@/app/lib/useUsersApi";
import { UserDetailDto } from "@/app/types/users";
import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";

const AdminHomePage = () => {
  const usersApi = useUsersApi();
  const [user, setUser] = useState<UserDetailDto>();

  const getUser = (id: number) => {
    usersApi.getById(id).then((data) => {
      setUser(data);
    }).catch((e) =>{
    
    });
  };

  return (
    <div className="card">
      <div className="flex gap-2">
        <Button label="Fetch User 1" onClick={() => getUser(1)}></Button>
        <Button label="Fetch User 2" onClick={() => getUser(2)}></Button>
      </div>
      {JSON.stringify(user)}
    </div>
  );
};

export default AdminHomePage;
