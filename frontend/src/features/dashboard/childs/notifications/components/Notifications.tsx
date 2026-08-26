"use client";

import { useGetNotificationsQuery } from "../../dashboard/api/ApiDashboard";


export default function Notifications() {

  const NotificationsQuery = useGetNotificationsQuery()

  console.log(NotificationsQuery.data)
  
  
  return (
    <>
      
</>
  )
}
