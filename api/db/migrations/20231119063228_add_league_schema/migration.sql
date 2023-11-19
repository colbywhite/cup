-- CreateTable
CREATE TABLE "League" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "commissionerEmail" TEXT NOT NULL,

    CONSTRAINT "League_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Season" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "leagueId" TEXT NOT NULL,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "seasonId" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Round" (
    "id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "differential" DECIMAL(65,30) NOT NULL,
    "grossScore" INTEGER NOT NULL,
    "teeSetRating" DOUBLE PRECISION NOT NULL,
    "teeSetSlope" INTEGER NOT NULL,
    "courseName" TEXT NOT NULL,
    "teeSetName" TEXT NOT NULL,
    "gender" "Sex" NOT NULL,
    "golferEmail" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,

    CONSTRAINT "Round_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GolferToSeason" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "League_commissionerEmail_id_idx" ON "League"("commissionerEmail", "id");

-- CreateIndex
CREATE INDEX "League_commissionerEmail_idx" ON "League"("commissionerEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Session_seasonId_startDate_key" ON "Session"("seasonId", "startDate");

-- CreateIndex
CREATE UNIQUE INDEX "_GolferToSeason_AB_unique" ON "_GolferToSeason"("A", "B");

-- CreateIndex
CREATE INDEX "_GolferToSeason_B_index" ON "_GolferToSeason"("B");

-- AddForeignKey
ALTER TABLE "League" ADD CONSTRAINT "League_commissionerEmail_fkey" FOREIGN KEY ("commissionerEmail") REFERENCES "Golfer"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Season" ADD CONSTRAINT "Season_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_golferEmail_fkey" FOREIGN KEY ("golferEmail") REFERENCES "Golfer"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GolferToSeason" ADD CONSTRAINT "_GolferToSeason_A_fkey" FOREIGN KEY ("A") REFERENCES "Golfer"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GolferToSeason" ADD CONSTRAINT "_GolferToSeason_B_fkey" FOREIGN KEY ("B") REFERENCES "Season"("id") ON DELETE CASCADE ON UPDATE CASCADE;
