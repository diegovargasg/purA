-- Adminer 4.8.1 MySQL 8.0.30 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP DATABASE IF EXISTS `pura`;
CREATE DATABASE `pura` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pura`;

DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `dealer_id` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`customer_id`),
  KEY `dealer_id` (`dealer_id`),
  CONSTRAINT `customer_ibfk_2` FOREIGN KEY (`dealer_id`) REFERENCES `dealer` (`dealer_id`) ON DELETE SET DEFAULT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `customer` (`customer_id`, `name`, `dealer_id`) VALUES
(1,	'Mr. Keyon Upton III',	3),
(2,	'Dr. Art Cole DDS',	1),
(3,	'Douglas Weissnat',	2),
(4,	'Wilton Wisozk MD',	3),
(5,	'Andrew Graham',	3),
(6,	'Kathryne Parisian III',	2),
(7,	'Georgiana Reinger',	3),
(8,	'Ida OKeefe',	5),
(9,	'Doyle Strosin',	4),
(10,	'Emelie Hand MD',	3);

DROP TABLE IF EXISTS `dealer`;
CREATE TABLE `dealer` (
  `dealer_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`dealer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `dealer` (`dealer_id`, `name`) VALUES (1, 'Hettinger Inc');
INSERT INTO `dealer` (`dealer_id`, `name`) VALUES (2, 'Bernier Group');
INSERT INTO `dealer` (`dealer_id`, `name`) VALUES (3, 'Berge LLC');
INSERT INTO `dealer` (`dealer_id`, `name`) VALUES (4, 'Ryan Group');
INSERT INTO `dealer` (`dealer_id`, `name`) VALUES (5, 'Marvin Group');

DROP TABLE IF EXISTS `vehicle`;
CREATE TABLE `vehicle` (
  `vehicle_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `customer_id` int NOT NULL,
  `vehicle_group_id` int NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`vehicle_id`),
  KEY `customer_id` (`customer_id`),
  KEY `vehicle_group_id` (`vehicle_group_id`),
  CONSTRAINT `vehicle_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  CONSTRAINT `vehicle_ibfk_2` FOREIGN KEY (`vehicle_group_id`) REFERENCES `vehicle_group` (`vehicle_group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `vehicle` (`vehicle_id`, `name`, `customer_id`, `vehicle_group_id`, `created`) VALUES (1, 'Orland Lakes', 8, 4, '1978-02-26 02:30:09');
INSERT INTO `vehicle` (`vehicle_id`, `name`, `customer_id`, `vehicle_group_id`, `created`) VALUES (2, 'Vincenzo Drives', 6, 5, '2020-05-22 00:50:43');
INSERT INTO `vehicle` (`vehicle_id`, `name`, `customer_id`, `vehicle_group_id`, `created`) VALUES (3, 'Dietrich Streets', 7, 4, '2004-07-27 00:10:09');
INSERT INTO `vehicle` (`vehicle_id`, `name`, `customer_id`, `vehicle_group_id`, `created`) VALUES (4, 'Vanessa Springs', 9, 4, '1982-06-27 06:32:28');
INSERT INTO `vehicle` (`vehicle_id`, `name`, `customer_id`, `vehicle_group_id`, `created`) VALUES (5, 'Marilyne Shoal', 8, 5, '1980-02-11 15:05:00');
INSERT INTO `vehicle` (`vehicle_id`, `name`, `customer_id`, `vehicle_group_id`, `created`) VALUES (6, 'Huels Center', 10, 2, '2021-01-15 16:04:58');
INSERT INTO `vehicle` (`vehicle_id`, `name`, `customer_id`, `vehicle_group_id`, `created`) VALUES (7, 'Cristal Fort', 1, 1, '1972-02-04 13:03:27');
INSERT INTO `vehicle` (`vehicle_id`, `name`, `customer_id`, `vehicle_group_id`, `created`) VALUES (8, 'Lilla Crossroad', 4, 2, '1978-11-28 18:37:27');
INSERT INTO `vehicle` (`vehicle_id`, `name`, `customer_id`, `vehicle_group_id`, `created`) VALUES (9, 'Ottis Cape', 7, 2, '2019-10-22 12:22:37');
INSERT INTO `vehicle` (`vehicle_id`, `name`, `customer_id`, `vehicle_group_id`, `created`) VALUES (10, 'Chesley Light', 4, 1, '1998-03-30 09:24:46');

DROP TABLE IF EXISTS `vehicle_data`;
CREATE TABLE `vehicle_data` (
  `vehicle_id` int NOT NULL,
  `created` datetime NOT NULL,
  `data` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  KEY `vehicle_id` (`vehicle_id`),
  CONSTRAINT `vehicle_data_ibfk_1` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicle` (`vehicle_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `vehicle_data` (`vehicle_id`, `created`, `data`) VALUES (1, '1970-11-16 17:00:31', 'Sit eligendi fuga dicta dolor amet magnam.');
INSERT INTO `vehicle_data` (`vehicle_id`, `created`, `data`) VALUES (2, '1972-05-12 16:59:16', 'Est aut molestiae necessitatibus ad consequatur.');
INSERT INTO `vehicle_data` (`vehicle_id`, `created`, `data`) VALUES (3, '1974-10-18 22:18:37', 'Quia enim delectus assumenda impedit neque aliquid');
INSERT INTO `vehicle_data` (`vehicle_id`, `created`, `data`) VALUES (4, '2017-09-21 13:37:33', 'Est non ab sint.');
INSERT INTO `vehicle_data` (`vehicle_id`, `created`, `data`) VALUES (5, '1978-11-04 20:21:42', 'Dolores libero at quis aut recusandae.');
INSERT INTO `vehicle_data` (`vehicle_id`, `created`, `data`) VALUES (6, '1981-01-01 18:21:13', 'Reiciendis quas earum at repudiandae.');
INSERT INTO `vehicle_data` (`vehicle_id`, `created`, `data`) VALUES (7, '2013-09-16 00:57:50', 'Quasi dicta explicabo atque saepe voluptatem ut.');
INSERT INTO `vehicle_data` (`vehicle_id`, `created`, `data`) VALUES (8, '1982-08-18 03:42:38', 'Cum cumque aut adipisci pariatur.');
INSERT INTO `vehicle_data` (`vehicle_id`, `created`, `data`) VALUES (9, '1971-12-12 21:17:49', 'Cum aspernatur corrupti voluptas consequatur.');
INSERT INTO `vehicle_data` (`vehicle_id`, `created`, `data`) VALUES (10, '1970-09-22 11:57:47', 'Eum laborum sed impedit est sit ipsa.');

DROP TABLE IF EXISTS `vehicle_group`;
CREATE TABLE `vehicle_group` (
  `vehicle_group_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`vehicle_group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `vehicle_group` (`vehicle_group_id`, `name`) VALUES (1, 'Toy Story');
INSERT INTO `vehicle_group` (`vehicle_group_id`, `name`) VALUES (2, 'Monsters Inc');
INSERT INTO `vehicle_group` (`vehicle_group_id`, `name`) VALUES (3, 'Lord of the Rings');
INSERT INTO `vehicle_group` (`vehicle_group_id`, `name`) VALUES (4, 'Batman');
INSERT INTO `vehicle_group` (`vehicle_group_id`, `name`) VALUES (5, 'Superman');


-- 2022-08-13 08:59:19