"use client"
import { getSocket } from "@/lib/socket.config";
import React, { useEffect, useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import { Button } from "../ui/button";

export default function ChatBase() {
  let socket = useMemo(() => {
    const socket = getSocket();
    return socket.connect();
  }, []);

  useEffect(() => {
    return () => {
      socket.on("message", (data: unknown) => {
        console.log("The socket message is ", data);
      });
      socket.close();
    };
  }, []);

  const handleClick = () => {
    // console.log("io click " + uuidV4());
    socket.emit("message", { name: "Rakib", id: uuidV4() });
  };
  return <div>
    <Button onClick={handleClick}>Send Message</Button>
  </div>;
}
