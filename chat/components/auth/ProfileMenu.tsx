"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "../common/UserAvatar";
import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
const LogoutModal = dynamic(() => import("../auth/LogoutModal"))

export default function ProfileMenu({
  name,
  image,
}: {
  name: string;
  image?: string;
}) {
  const [logoutOpen, setLogoutOpen] = useState(false);
  return (
    <>
      {logoutOpen && <Suspense fallback={<p>Loading...</p>}>
      <LogoutModal open={logoutOpen} setOpen={setLogoutOpen}/></Suspense>}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar name={name} image={image} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={()=> setLogoutOpen(true)}>Logout</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
