import { MainContext } from "@/context/State.js";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Admin = () => {
  const { getToken } = useContext(MainContext);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;
  const navigate = useNavigate();
  const [queries, setQueries] = useState();

  useEffect(() => {
    const getQueries = async () => {
      try {
        const token = getToken();
        const res = await axios.get(`${BACKEND_URL}/user/getQuery`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setQueries(res.data);
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    };
    getQueries();
  }, []);

  console.log(queries);

  return (
    <div className="p-10">
      <Table>
        <TableCaption>
          A list of your recent Queries made by users.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/2">Email</TableHead>
            <TableHead className="w-1/2">Query</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {queries &&
            queries.reverse().map(({ email, query, _id }) => (
              <TableRow key={_id}>
                <TableCell className="font-medium w-1/2">{email}</TableCell>
                <TableCell>{query}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Admin;
