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
import EndorseContainer from "@/components/endorse-container";
import { type Endorsement } from "@/actions/endorsements";
import { texts } from "@/utils/constants";
import LinkedInShareButton from "@/components/UI/linkedin-share-button";
import CopyUrlButton from "@/components/UI/copy-url-button";
import ToggleModalButton from "@/components/toggle-modal-button";

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
  const skillNames = skills.map((skill) => skill.name);

  const { skillCounts: endorsements, endorsers } = await getEndorsementsSummary(
    pageUserId,
    skillIds as string[],
    skillNames as string[]
  );

  //current user endorsements
  let sessionUserEndorsements = [] as Endorsement[];
  if (sessionUserId) {
    sessionUserEndorsements = await getUserEndorsements(
      sessionUserId,
      pageUserId
    );
  }
  // Endorsed skill ids from the industry of the page user
  const endorsedSkillsIds: string[] = sessionUserEndorsements
    .map((endorsement) => endorsement.skillId)
    .filter((skillId) => skillIds.includes(skillId));

  const profileNotCompleteText =
    sessionUserId === pageUserId
      ? texts.profileNotComplete.user
      : texts.profileNotComplete.visitor;

  const notEnoughEndorsementsText =
    sessionUserId === pageUserId
      ? texts.notEnoughEndorsements.user
      : texts.notEnoughEndorsements.visitor;

  if (user) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden relative">
          {/* Colored background section */}
          <div className="absolute top-0 left-0 right-0 h-30 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

          <div className="relative z-10 p-8">
            <div className="flex flex-col items-center space-y-6 mb-8">
              <div className="mt-4">
                <Image
                  className="rounded-full shadow-lg border-4 border-white ring-2 ring-blue-100"
                  src={user.image || "/default-avatar.svg"}
                  width={120}
                  height={120}
                  alt="user photo"
                />
              </div>
              <div className="text-center max-w-2xl">
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

            <div className="flex flex-col items-center space-y-8">
              {/* Skills Chart Section */}
              <div className="w-full max-w-2xl">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                    {user.firstName}&apos;s {industry?.name} skills
                  </h3>
                </div>
                <div className="flex justify-center">
                  <div className="w-11/12 max-w-lg">
                    {endorsers > 0 ? (
                      <RadarChartRounded data={endorsements} />
                    ) : (
                      <div className="text-center space-y-4">
                        <p className="text-gray-500">
                          {!industry
                            ? profileNotCompleteText
                            : notEnoughEndorsementsText}
                        </p>
                        {!industry && pageUserId === sessionUserId && <ToggleModalButton />}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {endorsers > 0 && <StatsCardContainer endorsers={endorsers} />}

              {/* Share Profile Section */}
              {session?.user?.id === pageUserId && (
                <div className="w-full max-w-md text-center space-y-4 pt-4 border-t border-gray-200">
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold text-gray-800">
                      Share Your Profile
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Share your profile with your network to get more
                      endorsements.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <LinkedInShareButton />
                    <CopyUrlButton />
                  </div>
                </div>
              )}

              {/* Endorse Section */}
              <div className="w-full max-w-md">
                <EndorseContainer
                  pageUserId={pageUserId}
                  sessionUserId={sessionUserId}
                  userName={user.firstName}
                  skills={skills}
                  endorsedSkillsIds={endorsedSkillsIds}
                  industrySelected={industry !== null}
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
