import Image from "next/image";

import { getUser } from "@/actions/users";
import { RadarChartRounded } from "@/components/radar-chart";
import UserInfo from "@/components/user-info";

type Params = Promise<{ userId: string }>;

export default async function UserPage({ params }: { params: Params }) {
  const { userId } = await params;
  const user = await getUser(userId);

  if (user) {
    return (
      <div className="flex flex-col items-center bg-amber-50 sm:w-8/12 mx-auto sm:p-6 rounded-lg shadow-sm sm:my-8">
        <div className=" flex flex-row gap-6 justify-center mt-6">
          <div>
            <Image
              className="border-1 border-stone-500 rounded-full"
              src={user.image as string}
              width={100}
              height={100}
              alt="user photo"
            />
          </div>
          <UserInfo
            userId={user.id}
            name={user.name || ""}
            location={user.location || ""}
            title={user.title || ""}
          />
        </div>
        <div className="w-full max-w-2xl mt-10">
          <RadarChartRounded />
        </div>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-3xl font-bold text-center m-8">User Not Found</h1>
    </div>
  );
}
