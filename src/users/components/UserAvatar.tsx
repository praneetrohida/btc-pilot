import gravatarUrl from "gravatar-url";
import { Avatar, em } from "@mantine/core";

export const UserAvatar: React.FC<{ email: string; size: number }> = ({ email, size }) => {
  return (
    <Avatar
      radius="xl"
      size={size}
      src={gravatarUrl(email, {
        size: 60,
        default: `https://source.boringavatars.com/beam/60/${email}`,
      })}
    />
  );
};
