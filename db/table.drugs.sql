CREATE TABLE `drugs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `date_of_entry` timestamp NULL DEFAULT NULL,
  `date_of_last_purchase` timestamp NULL DEFAULT NULL,
  `date_of_last_sale` timestamp NULL DEFAULT NULL,
  `batch_no` varchar(64) DEFAULT NULL,
  `date_of_expiry` timestamp NULL DEFAULT NULL,
  `mrp` decimal(10,0) DEFAULT '0',
  `quantity` int unsigned DEFAULT NULL,
  `name_of_purchasee` varchar(255) DEFAULT NULL,
  `name_of_seller` varchar(255) DEFAULT NULL,
  `purchased_total` int unsigned DEFAULT NULL,
  `sold_total` int unsigned DEFAULT NULL,
  `date_of_last_update` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3
