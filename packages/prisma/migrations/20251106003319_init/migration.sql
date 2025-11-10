-- CreateTable
CREATE TABLE `Ability` (
    `id` VARCHAR(191) NOT NULL,
    `ability_id` VARCHAR(191) NOT NULL,
    `ability_name` VARCHAR(191) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `tactic` VARCHAR(191) NOT NULL,
    `technique_id` VARCHAR(191) NOT NULL,
    `technique_name` VARCHAR(191) NOT NULL,
    `platform` VARCHAR(191) NOT NULL,
    `shell_type` VARCHAR(191) NOT NULL,
    `command` MEDIUMTEXT NOT NULL,
    `payload` LONGTEXT NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Ability_ability_id_key`(`ability_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
