import MessageDashboard from "@/components/sms/MessageDashboard";
import SendSMSForm from "@/components/sms/SendSMSForm";
import React from "react";

const MessagesDashboardPage = () => {
  return (
    <main>
      <SendSMSForm />
      <div className="">
        <MessageDashboard />
      </div>
    </main>
  );
};

export default MessagesDashboardPage;
