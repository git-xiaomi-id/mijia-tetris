import { getLeaderboardWithUserInfo } from "@/lib/supabase-client";
import { formatTime } from "@/utils/format-time";
import { Loader, Trophy } from "lucide-react";
import useSWR from "swr";

function LeaderboardTop3({ data }: { data: LeaderboardData[] }) {
  const medalsIcon = [
    "/icon/icon-medal-gold.webp",
    "/icon/icon-medal-silver.webp",
    "/icon/icon-medal-bronze.webp",
  ];

  const topPlayers = data.slice(0, 3);

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
          <div
            key={index}
            className={`ls-board-${
              index + 1
            } rounded-lg flex items-center justify-between shadow-sm py-3 px-2`}
          >
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <img
                  src={medalsIcon[index]}
                  alt={`Medal for position ${index + 1}`}
                  width="40"
                  height="40"
                  className="object-contain"
                  loading="eager"
                />
                <span className="absolute inset-0 -top-2 flex items-center justify-center font-bold text-lg text-white drop-shadow-md">
                  {index + 1}
                </span>
              </div>
              <span className="font-semibold text-gray-800">
                @{player.user.username_ig}
              </span>
            </div>
            <div className="ls-time-box-top3 text-right">
              {formatTime(player.duration)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LeaderboardListContent({ data }: { data: LeaderboardData[] }) {
  return (
    <div className="space-y-4 py-5 ls-board-others">
      {data.slice(3).map((item, index) => (
        <div
          key={index}
          className={`rounded-lg px-2 pb-3 flex items-start justify-between border-b-[0.2px] border-b-[#D1D1D1]`}
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 flex items-center justify-center font-bold text-sm text-white drop-shadow-md bg-[#FF630F] rounded-full">
              {index + 4}
            </div>
            <span className="font-semibold text-gray-800">
              @{item.user.username_ig}
            </span>
          </div>
          <div className="ls-time-box-other text-right">
            {formatTime(item.duration)}
          </div>
        </div>
      ))}
    </div>
  );
}

interface LeaderboardData {
  user: {
    username_ig: string | null;
  };
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
        <LeaderboardTop3 data={data.data} />
        <LeaderboardListContent data={data.data} />
      </div>
    );
  }
  return <Loader className="size-6 mx-auto animate-spin" />;
}
