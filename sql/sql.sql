/*
Navicat MySQL Data Transfer

Source Server         : localhost-mysql
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : api

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2015-12-10 19:22:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for interface
-- ----------------------------
DROP TABLE IF EXISTS `interface`;
CREATE TABLE `interface` (
`id`  varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`prj_id`  varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`url`  varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`type`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`jsonp`  bigint(4) NULL DEFAULT NULL ,
`lazy`  bigint(4) NULL DEFAULT NULL ,
`lazyTime`  int(11) NULL DEFAULT NULL ,
`desc`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`template`  text CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
`ct_time`  datetime NULL DEFAULT NULL ,
PRIMARY KEY (`id`),
FOREIGN KEY (`prj_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
INDEX `fk_proj_id` (`prj_id`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci

;

-- ----------------------------
-- Records of interface
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
`id`  varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`name`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`alias`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`ct_time`  datetime NULL DEFAULT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci

;

-- ----------------------------
-- Records of project
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for request
-- ----------------------------
DROP TABLE IF EXISTS `request`;
CREATE TABLE `request` (
`id`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`imp_id`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`name`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`type`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`desc`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
PRIMARY KEY (`id`),
FOREIGN KEY (`imp_id`) REFERENCES `interface` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
INDEX `fk_interface_req_id` (`imp_id`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci

;

-- ----------------------------
-- Records of request
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for response
-- ----------------------------
DROP TABLE IF EXISTS `response`;
CREATE TABLE `response` (
`id`  varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`imp_id`  varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`name`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`type`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`rule`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`desc`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`lm_time`  datetime NULL DEFAULT NULL ,
PRIMARY KEY (`id`),
FOREIGN KEY (`imp_id`) REFERENCES `interface` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
INDEX `fk_interface_res_id` (`imp_id`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci

;

-- ----------------------------
-- Records of response
-- ----------------------------
BEGIN;
COMMIT;
