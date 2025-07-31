import Image from "next/image";

import { auth } from "@/auth";
import { getUser } from "@/actions/users";
import { RadarChartRounded } from "@/components/radar-chart";
import UserInfo from "@/components/user-info";
import StatsCardContainer from "@/components/stats-card-container";
import { getIndustryDetails } from "@/actions/industries";
import { getIndustrySkills } from "@/actions/skills";
import { getUserEndorsements } from "@/actions/endorsements";
import { getEndorsementsSummary } from "@/actions/endorsements";
import UserNotFound from "@/components/user-not-found";
import { EndorseButton } from "@/components/endorse-button";
import { type Endorsement } from "@/actions/endorsements";

type Params = Promise<{ userId: string }>;

export default async function UserPage({ params }: { params: Params }) {
  const { userId: pageUserId } = await params;
  const user = await getUser(pageUserId); //User of the profile page
  const session = await auth();
  const sessionUserId = session?.user?.id;

  //Industry of the page user
  const industry = user?.industryId
    ? await getIndustryDetails(user.industryId)
    : null;

  // Skills related to the page user's industry
  const skills = industry ? await getIndustrySkills(industry.id) : [];
  const skillIds = skills.map((skill) => skill.id);

  const { skillCounts: endorsements, endorsers } = await getEndorsementsSummary(
    pageUserId,
    skillIds as string[]
  );
  console.log("Endorsements:", endorsements, endorsers);

  //current user endorsements
  let sessionUserEndorsements = [] as Endorsement[];
  if (sessionUserId) {
    sessionUserEndorsements = await getUserEndorsements(
      sessionUserId,
      pageUserId
    );

    console.log("Session User Endorsements:", sessionUserEndorsements);
  }
  const endorsedSkillsIds: string[] = sessionUserEndorsements.map(
    (endorsement) => endorsement.skillId
  );

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-8">
              <div>
                <Image
                  className="rounded-full shadow-lg border-4 border-white ring-2 ring-blue-100"
                  src={user.image as string}
                  width={120}
                  height={120}
                  alt="user photo"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <UserInfo
                  userId={user.id}
                  name={user.name || ""}
                  location={user.location || ""}
                  title={user.title || ""}
                  industry={industry?.name}
                />
              </div>
            </div>

            <div className="border-t border-gray-200 mb-8"></div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <h3 className="text-3xl font-bold text-gray-800 mb-2 text-center">
                    {user.firstName}&apos;s {industry?.name} skills
                  </h3>
                </div>
                <div className="flex justify-center">
                  <div className="w-full max-w-md">
                    {endorsements.length > 2 ? (
                      <RadarChartRounded data={endorsements} />
                    ) : (
                      <p className="text-gray-500 text-center">
                        Not enough endorsements yet. Share your profile and get
                        endorsed by your peers!
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <StatsCardContainer endorsers={endorsers} profileViews={34} />
                <EndorseButton
                  pageUserId={pageUserId}
                  sessionUserId={sessionUserId}
                  userName={user.firstName}
                  skills={skills}
                  endorsedSkillsIds={endorsedSkillsIds}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <UserNotFound />;
}
