import DashNav from "@/components/dashboard/DashNav";
import { authOption, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function dashboard() {
  const session: CustomSession | null = await getServerSession(authOption);
  return (
    <div>
      <DashNav
        name={session?.user?.name ?? "Guest"}
        image={session?.user?.image ?? undefined}
      />
    </div>
  );
}
