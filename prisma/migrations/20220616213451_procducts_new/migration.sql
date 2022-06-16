/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Products_title_key" ON "Products"("title");
