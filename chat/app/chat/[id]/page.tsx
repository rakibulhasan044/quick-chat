import ChatBase from "@/components/chat/ChatBase";

export default async function Chat({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  console.log("the group id is", id);

  return (
    <div>
      <h1>Hello!!</h1>
      <ChatBase />
    </div>
  );
}