"use client";

import { useGetNotificationsQuery } from "../../dashboard/api/ApiDashboard";


export default function Notifications() {

  const NotificationsQuery = useGetNotificationsQuery({type : ""})

  console.log("this is notifications",NotificationsQuery.data)
  
  
  return (
    <>
      
</>
  )
}
