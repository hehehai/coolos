-- CreateTable
CREATE TABLE "subscribe" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cancelId" TEXT,

    CONSTRAINT "subscribe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subscribe_email_key" ON "subscribe"("email");
