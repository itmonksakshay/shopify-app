-- CreateTable
CREATE TABLE "stores" (
    "shop" TEXT NOT NULL,
    "isActive" BOOLEAN DEFAULT false,

    CONSTRAINT "stores_pkey" PRIMARY KEY ("shop")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "content" TEXT,
    "shop" TEXT,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countdownWidget" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "shop" TEXT NOT NULL,

    CONSTRAINT "countdownWidget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "datePickerWidget" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "shop" TEXT NOT NULL,

    CONSTRAINT "datePickerWidget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dayDelivery" (
    "content" TEXT NOT NULL,
    "shop" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "stores_shop_idx" ON "stores"("shop");

-- CreateIndex
CREATE INDEX "session_id_idx" ON "session"("id");

-- CreateIndex
CREATE INDEX "session_shop_idx" ON "session"("shop");

-- CreateIndex
CREATE INDEX "countdownWidget_shop_idx" ON "countdownWidget"("shop");

-- CreateIndex
CREATE INDEX "datePickerWidget_shop_idx" ON "datePickerWidget"("shop");

-- CreateIndex
CREATE UNIQUE INDEX "dayDelivery_shop_key" ON "dayDelivery"("shop");

-- CreateIndex
CREATE INDEX "dayDelivery_shop_idx" ON "dayDelivery"("shop");
