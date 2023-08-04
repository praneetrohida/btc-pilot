import { useQuery } from "@blitzjs/rpc";
import getLeaderboard from "../queries/getLeaderboard";
import { Text, Group, Table } from "@mantine/core";
import { UserAvatar } from "src/users/components/UserAvatar";

export const Leaderboard: React.FC = () => {
  const [leaderboard] = useQuery(getLeaderboard, null);
  return (
    <Table withColumnBorders>
      <thead>
        <tr>
          <th style={{ width: 30 }}>Rank</th>
          <th>Name</th>
          <th style={{ width: 30 }}>Points</th>
        </tr>
      </thead>
      <tbody>
        {leaderboard.map((user, index) => (
          <tr key={user.id}>
            <td>{index + 1}</td>
            <td>
              <Group>
                <UserAvatar email={user.email} size={20} /> <Text>{user.name} </Text>
              </Group>
            </td>
            <td>{user.score}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
