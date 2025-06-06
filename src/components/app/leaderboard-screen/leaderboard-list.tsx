import { getLeaderboardWithUserInfo } from "@/lib/supabase-client";
import { formatTime } from "@/utils/format-time";
import { Loader, Trophy } from "lucide-react";
import useSWR from "swr";
import Top3List from "./top3-list";

function LeaderboardTop3({ data }: { data: LeaderboardData[] }) {
  const topPlayers = data.slice(0, 3);

  if (!topPlayers.length) return;

  return (
    <div className="relative bg-[#FF630F] rounded-t-xl rounded-b-lg rounded-lg pt-6 border-2 border-[#FF630F]">
      <div className="absolute -top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-max">
        <div className="ls-top3-heading text-white">
          <Trophy />
          <div className="font-[630] text-xl">Top 3 Klasemen</div>
        </div>
      </div>

      <div className="mt-3 space-y-0.5 w-full">
        {topPlayers.map((player, index) => (
          <Top3List
            key={index}
            position={index + 1}
            name={`@${player.username_ig}`}
            duration={player.duration}
          />
        ))}
      </div>
    </div>
  );
}

function LeaderboardListContent({ data }: { data: LeaderboardData[] }) {
  if (!data.slice(3).length) return;
  return (
    <div className="space-y-4 py-5 ls-board-others">
      {data.slice(3).map((item, index) => (
        <div
          key={index}
          className={`rounded-lg px-2 pb-3 flex items-start justify-between border-b-[0.2px] border-b-[#D1D1D1] overflow-hidden`}
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-7 h-7 flex items-center justify-center font-bold text-sm text-white drop-shadow-md bg-[#FF630F] rounded-full flex-shrink-0">
              {index + 4}
            </div>
            <span className="font-[520] text-[#222222] truncate min-w-0">
              @{item.username_ig}
            </span>
          </div>
          <div className="ls-time-box-other text-right flex-shrink-0 ml-2">
            {formatTime(item.duration)}
          </div>
        </div>
      ))}
    </div>
  );
}

interface LeaderboardData {
  username_ig: string | null;
  duration: number;
  score: number | null;
  finish_at: string;
  start_at: string;
}

export default function LeaderboardList() {
  const { data } = useSWR("leaderboard", getLeaderboardWithUserInfo);

  if (data?.data) {
    return (
      <div className="flex flex-col gap-7 w-full">
        <LeaderboardTop3 data={data.data as any} />
        <LeaderboardListContent data={data.data as any} />
      </div>
    );
  }
  return <Loader className="size-6 mx-auto animate-spin" />;
}
