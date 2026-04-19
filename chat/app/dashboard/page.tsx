import { getServerSession } from "next-auth";
import { authOption, CustomSession } from "../api/auth/[...nextauth]/options";
import { ChatGroupType } from "@/types";
import { fetchChatGroups } from "@/src/fetch/groupFetch";
import DashNav from "@/components/dashboard/DashNav";
import CreateChat from "@/components/groupchat/CreateChat";
import GroupChatCard from "@/components/groupchat/GroupChatCard";

export default async function dashboard() {
  const session: CustomSession | null = await getServerSession(authOption);
  let groups: ChatGroupType[] = [];

  if (session?.user?.token) {
    groups = await fetchChatGroups(session.user.token);
  }
  return (
    <div>
      <DashNav
        name={session?.user?.name ?? "Guest"}
        image={session?.user?.image ?? undefined}
      />
      <div className="container">
        <div className="mt-6 text-end">
          {session?.user ? <CreateChat user={session.user} /> : null}
        </div>

        {/* If Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {groups.length > 0 &&
            session?.user &&
            groups.map((item, index) => (
              <GroupChatCard group={item} key={index} user={session.user!} />
            ))}
        </div>
      </div>
    </div>
  );
}
