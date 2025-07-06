-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'ADMIN', 'SUPERADMIN') NOT NULL DEFAULT 'USER',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `accessToken` VARCHAR(191) NULL,
    `subscriptionId` VARCHAR(191) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscriptions` (
    `id` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `brands` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `nameAr` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NOT NULL,
    `logoAr` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sections` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `nameAr` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `menuId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menus` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `nameAr` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `brandId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `labels` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `brandId` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,
    `sectionId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `label_options` (
    `id` VARCHAR(191) NOT NULL,
    `labelId` VARCHAR(191) NOT NULL,
    `vitamin_d` BOOLEAN NOT NULL DEFAULT false,
    `vitamin_b5` BOOLEAN NOT NULL DEFAULT false,
    `vitamin_b7` BOOLEAN NOT NULL DEFAULT false,
    `vitamin_b9` BOOLEAN NOT NULL DEFAULT false,
    `vitamin_a` BOOLEAN NOT NULL DEFAULT false,
    `vitamin_c` BOOLEAN NOT NULL DEFAULT false,
    `vitamin_e` BOOLEAN NOT NULL DEFAULT false,
    `vitamin_k` BOOLEAN NOT NULL DEFAULT false,
    `vitamin_b1` BOOLEAN NOT NULL DEFAULT false,
    `vitamin_b2` BOOLEAN NOT NULL DEFAULT false,
    `vitamin_b3` BOOLEAN NOT NULL DEFAULT false,
    `vitamin_b6` BOOLEAN NOT NULL DEFAULT false,
    `vitamin_b12` BOOLEAN NOT NULL DEFAULT false,
    `folic_acid` BOOLEAN NOT NULL DEFAULT false,
    `biotin` BOOLEAN NOT NULL DEFAULT false,
    `pantothenic` BOOLEAN NOT NULL DEFAULT false,
    `total_fat` BOOLEAN NOT NULL DEFAULT true,
    `saturated_fat` BOOLEAN NOT NULL DEFAULT true,
    `trans_fat` BOOLEAN NOT NULL DEFAULT true,
    `cholesterol` BOOLEAN NOT NULL DEFAULT true,
    `total_carbohydrates` BOOLEAN NOT NULL DEFAULT true,
    `dietary_fiber` BOOLEAN NOT NULL DEFAULT true,
    `sugars` BOOLEAN NOT NULL DEFAULT true,
    `added_sugars` BOOLEAN NOT NULL DEFAULT true,
    `protein` BOOLEAN NOT NULL DEFAULT true,
    `fluoride` BOOLEAN NOT NULL DEFAULT false,
    `calcium` BOOLEAN NOT NULL DEFAULT false,
    `magnesium` BOOLEAN NOT NULL DEFAULT false,
    `phosphorus` BOOLEAN NOT NULL DEFAULT false,
    `potassium` BOOLEAN NOT NULL DEFAULT false,
    `sodium` BOOLEAN NOT NULL DEFAULT false,
    `chloride` BOOLEAN NOT NULL DEFAULT false,
    `iron` BOOLEAN NOT NULL DEFAULT false,
    `zinc` BOOLEAN NOT NULL DEFAULT false,
    `copper` BOOLEAN NOT NULL DEFAULT false,
    `manganese` BOOLEAN NOT NULL DEFAULT false,
    `selenium` BOOLEAN NOT NULL DEFAULT false,
    `molybdenum` BOOLEAN NOT NULL DEFAULT false,
    `chromium` BOOLEAN NOT NULL DEFAULT false,
    `iodine` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `label_options_labelId_key`(`labelId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ingredients` (
    `id` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `labelAr` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `descriptionAr` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `calories` INTEGER NOT NULL DEFAULT 0,
    `private` BOOLEAN NOT NULL DEFAULT false,
    `active` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `allergens` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `labelId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nutrients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `total_fat` INTEGER NOT NULL DEFAULT 0,
    `saturated_fat` INTEGER NOT NULL DEFAULT 0,
    `trans_fat` INTEGER NOT NULL DEFAULT 0,
    `cholesterol` INTEGER NOT NULL DEFAULT 0,
    `total_carbohydrates` INTEGER NOT NULL DEFAULT 0,
    `dietary_fiber` INTEGER NOT NULL DEFAULT 0,
    `sugars` INTEGER NOT NULL DEFAULT 0,
    `added_sugars` INTEGER NOT NULL DEFAULT 0,
    `protein` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `ingredientId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vitamins` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vitamin_d` INTEGER NOT NULL DEFAULT 0,
    `vitamin_b5` INTEGER NOT NULL DEFAULT 0,
    `vitamin_b7` INTEGER NOT NULL DEFAULT 0,
    `vitamin_b9` INTEGER NOT NULL DEFAULT 0,
    `vitamin_a` INTEGER NOT NULL DEFAULT 0,
    `vitamin_c` INTEGER NOT NULL DEFAULT 0,
    `vitamin_e` INTEGER NOT NULL DEFAULT 0,
    `vitamin_k` INTEGER NOT NULL DEFAULT 0,
    `vitamin_b1` INTEGER NOT NULL DEFAULT 0,
    `vitamin_b2` INTEGER NOT NULL DEFAULT 0,
    `vitamin_b3` INTEGER NOT NULL DEFAULT 0,
    `vitamin_b6` INTEGER NOT NULL DEFAULT 0,
    `vitamin_b12` INTEGER NOT NULL DEFAULT 0,
    `folic_acid` INTEGER NOT NULL DEFAULT 0,
    `biotin` INTEGER NOT NULL DEFAULT 0,
    `pantothenic` INTEGER NOT NULL DEFAULT 0,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `ingredientId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `minerals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fluoride` INTEGER NOT NULL DEFAULT 0,
    `calcium` INTEGER NOT NULL DEFAULT 0,
    `magnesium` INTEGER NOT NULL DEFAULT 0,
    `phosphorus` INTEGER NOT NULL DEFAULT 0,
    `potassium` INTEGER NOT NULL DEFAULT 0,
    `sodium` INTEGER NOT NULL DEFAULT 0,
    `chloride` INTEGER NOT NULL DEFAULT 0,
    `iron` INTEGER NOT NULL DEFAULT 0,
    `zinc` INTEGER NOT NULL DEFAULT 0,
    `copper` INTEGER NOT NULL DEFAULT 0,
    `manganese` INTEGER NOT NULL DEFAULT 0,
    `selenium` INTEGER NOT NULL DEFAULT 0,
    `molybdenum` INTEGER NOT NULL DEFAULT 0,
    `chromium` INTEGER NOT NULL DEFAULT 0,
    `iodine` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `ingredientId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_IngredientTolabel` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_IngredientTolabel_AB_unique`(`A`, `B`),
    INDEX `_IngredientTolabel_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_subscriptionId_fkey` FOREIGN KEY (`subscriptionId`) REFERENCES `subscriptions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sections` ADD CONSTRAINT `sections_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `menus`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menus` ADD CONSTRAINT `menus_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `brands`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `labels` ADD CONSTRAINT `labels_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `brands`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `labels` ADD CONSTRAINT `labels_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `labels` ADD CONSTRAINT `labels_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `sections`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `label_options` ADD CONSTRAINT `label_options_labelId_fkey` FOREIGN KEY (`labelId`) REFERENCES `labels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ingredients` ADD CONSTRAINT `ingredients_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `allergens` ADD CONSTRAINT `allergens_labelId_fkey` FOREIGN KEY (`labelId`) REFERENCES `labels`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nutrients` ADD CONSTRAINT `nutrients_ingredientId_fkey` FOREIGN KEY (`ingredientId`) REFERENCES `ingredients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vitamins` ADD CONSTRAINT `vitamins_ingredientId_fkey` FOREIGN KEY (`ingredientId`) REFERENCES `ingredients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `minerals` ADD CONSTRAINT `minerals_ingredientId_fkey` FOREIGN KEY (`ingredientId`) REFERENCES `ingredients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_IngredientTolabel` ADD CONSTRAINT `_IngredientTolabel_A_fkey` FOREIGN KEY (`A`) REFERENCES `ingredients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_IngredientTolabel` ADD CONSTRAINT `_IngredientTolabel_B_fkey` FOREIGN KEY (`B`) REFERENCES `labels`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
