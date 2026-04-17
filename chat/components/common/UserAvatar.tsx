import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserAvatar({
  name,
  image,
}: {
  name: string;
  image?: string;
}) {
  return (
    <Avatar>
      <AvatarImage src={image} alt="profile" className="grayscale" />
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
  );
}
