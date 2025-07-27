/*
  Warnings:

  - You are about to drop the `Experience` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Skill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ExperienceToSkill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SkillToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `accessToken` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `idToken` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `tokenType` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `company` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `currentPosition` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `headline` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `industry` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `publicProfileUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `User` table. All the data in the column will be lost.
  - Added the required column `type` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Skill_name_key";

-- DropIndex
DROP INDEX "_ExperienceToSkill_B_index";

-- DropIndex
DROP INDEX "_ExperienceToSkill_AB_unique";

-- DropIndex
DROP INDEX "_SkillToUser_B_index";

-- DropIndex
DROP INDEX "_SkillToUser_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Experience";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Skill";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ExperienceToSkill";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_SkillToUser";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "access_token" TEXT,
    "refresh_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Account" ("createdAt", "id", "provider", "providerAccountId", "scope", "updatedAt", "userId") SELECT "createdAt", "id", "provider", "providerAccountId", "scope", "updatedAt", "userId" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT,
    "linkedInId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "emailVerified", "firstName", "id", "image", "lastName", "linkedInId", "name", "updatedAt") SELECT "createdAt", "email", "emailVerified", "firstName", "id", "image", "lastName", "linkedInId", "name", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_linkedInId_key" ON "User"("linkedInId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
