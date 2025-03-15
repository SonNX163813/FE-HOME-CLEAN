import { useContext, useEffect } from "react";
import { WebSocketContext } from "./WebSocketContext";

const CleanerWebSocket = () => {
  const stompClient = useContext(WebSocketContext);

  useEffect(() => {
    const cleanerData = JSON.parse(localStorage.getItem("cleaner"));
    const cleanerId = cleanerData?.cleanerId;

    if (
      stompClient &&
      stompClient.connected &&
      typeof stompClient.publish === "function" &&
      cleanerId
    ) {
      stompClient.publish({
        destination: "/app/cleaner-online",  // Địa chỉ endpoint mà BE sẽ nhận
        body: JSON.stringify({ cleanerId: cleanerId })  // Gửi cleanerId dưới dạng JSON
      });


      console.log("📡 Sent cleaner-online with cleanerId:", cleanerId);
    }

    // Lắng nghe message từ backend
    if (stompClient && typeof stompClient.subscribe === "function") {
      const subscription = stompClient.subscribe("/topic/cleaner-status", (message) => {
        console.log("📩 Received message from BE:", message.body);
      });

      // Cleanup
      return () => {
        if (subscription && typeof subscription.unsubscribe === "function") {
          subscription.unsubscribe();
        }
      };
    }
  }, [stompClient]);

  return null;
};

export default CleanerWebSocket;