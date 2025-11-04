-- CreateTable
CREATE TABLE `attack` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `tactic` VARCHAR(191) NOT NULL,
    `technique_id` VARCHAR(191) NOT NULL,
    `technique_name` VARCHAR(191) NOT NULL,
    `payload` JSON NOT NULL,
    `platform` VARCHAR(191) NOT NULL,
    `command` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
