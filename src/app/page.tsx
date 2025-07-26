// import { auth } from "@/auth";
import HomepageAuth from "@/components/homepage-auth";

export default async function Home() {
  // const session = await auth();
  // console.log("Session:", session);
  return (
    <div>
      <h1 className="text-4xl font-bold text-center m-4">Skills Map</h1>
      <p className="text-center text-lg mt-6">
        Get endorsed for your skills and showcase your expertise to the world.
      </p>
      <div className="flex justify-center mt-8">
        <HomepageAuth />
      </div>
    </div>
  );
}
