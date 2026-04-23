"use client";
import { getSocket } from "@/lib/socket.config";
import React, { useEffect, useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import { Button } from "../ui/button";

export default function ChatBase({ groupId }: { groupId: string }) {
  const socket = useMemo(() => {
    const socket = getSocket();
    socket.auth = {
      room: groupId,
    };
    return socket.connect();
  }, [groupId]);

    useEffect(() => {
    // Register listener on mount
    socket.on("message", (data: unknown) => {
      console.log("The socket message is ", data);
    });

    // Cleanup: remove listener and close socket on unmount
    return () => {
      socket.off("message");
      socket.close();
    };
  }, [socket]);


  const handleClick = () => {
    // console.log("io click " + uuidV4());
    socket.emit("message", { name: "Rakib", id: uuidV4() });
  };
  return (
    <div>
      <Button onClick={handleClick}>Send Message</Button>
    </div>
  );
}
