import Image from "next/image";

import { getUser } from "@/actions/users";

type Params = Promise<{ userId: string }>;

export default async function UserPage({ params }: { params: Params }) {
  const { userId } = await params;
  const user = await getUser(userId);
  console.log(user);
  if (user) {
    return (
      <div className="flex flex-col items-center">
        <div className=" flex flex-row gap-6 justify-center mt-6">
          <div>
            <Image
              className="border-2 border-stone-500 rounded-full"
              src={user.image as string}
              width={120}
              height={120}
              alt="user photo"
            />
          </div>
          <div className="flex flex-col justify-center items-start">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-md">Fullstack Engineer</p>
            <p className="text-sm text-gray-500">Berlin, Germany</p>
          </div>
        </div>
        <div>GRAPH GOES HERE</div>
      </div>
    );
  }
  return <div>User Not Found</div>;
}
