import DashNav from "@/components/dashboard/DashNav";
import { authOption, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import CreateChat from "@/components/groupchat/CreateChat";
import { ChatGroupType } from "@/types";
import { fetchChatGroups } from "@/src/fetch/groupFetch";

export default async function dashboard() {
  const session: CustomSession | null = await getServerSession(authOption);
  let groups: ChatGroupType[] = [];

  if (session?.user?.token) {
    groups = await fetchChatGroups(session.user.token);
  }
console.log(groups);
  return (
    <div>
      <DashNav
        name={session?.user?.name ?? "Guest"}
        image={session?.user?.image ?? undefined}
      />
      <div className="container">
        <div className="flex justify-end mt-10">
          {session?.user ? <CreateChat user={session.user} /> : null}
        </div>
      </div>
    </div>
  );
}
