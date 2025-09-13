import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1756823926329 implements MigrationInterface {
  name = "seed17771233123124";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO nationality VALUES (1,'Free'),(2,'Austria'),(3,'Belgium'),(4,'Bulgaria'),(5,'Croatia'),(6,'Czech'),(7,'Denmark'),
(8,'England'),(9,'Finland'),(10,'France'),(11,'Germany'),(12,'Greece'),(13,'Hungary'),(14,'Ireland'),(15,'Italy'),(16,'Latvia'),
(17,'Netherlands'),(18,'Northern Ireland'),(19,'Norway'),(20,'Poland'),(21,'Portugal'),(22,'Romania'),(23,'Russia'),(24,'Scotland'),
(25,'Serbia and Montenegro'),(26,'Slovakia'),(27,'Slovenia'),(28,'Spain'),(29,'Sweden'),(30,'Switzerland'),(31,'Turkey'),(32,'Ukraine'),
(33,'Wales'),(34,'Angola'),(35,'Cameroon'),(36,'Cote d''Ivoire'),(37,'Ghana'),(38,'Nigeria'),(39,'South Africa'),(40,'Togo'),
(41,'Tunisia'),(42,'Costa Rica'),(43,'Mexico'),(44,'Trinidad and Tobago'),(45,'United States'),(46,'Argentina'),(47,'Brazil'),
(48,'Chile'),(49,'Colombia'),(50,'Ecuador'),(51,'Paraguay'),(52,'Peru'),(53,'Uruguay'),(54,'Iran'),(55,'Japan'),(56,'Saudi Arabia'),
(57,'South Korea'),(58,'Australia'),(59,'Bosnia and Herzegovina'),(60,'Estonia'),(61,'Israel'),(62,'Honduras'),(63,'Jamaica'),
(64,'Panama'),(65,'Bolivia'),(66,'Venezuela'),(67,'China'),(68,'Uzbekistan'),(69,'Albania'),(70,'Cyprus'),(71,'Iceland'),(72,'Macedonia'),
(73,'Armenia'),(74,'Belarus'),(75,'Georgia'),(76,'Liechtenstein'),(77,'Lithuania'),(78,'Algeria'),(79,'Benin'),(80,'Burkina Faso'),
(81,'Cape Verde'),(82,'Congo'),(83,'DR Congo'),(84,'Egypt'),(85,'Equatorial Guinea'),(86,'Gabon'),(87,'Gambia'),(88,'Guinea'),
(89,'Guinea-Bissau'),(90,'Kenya'),(91,'Liberia'),(92,'Libya'),(93,'Mali'),(94,'Morocco'),(95,'Mozambique'),(96,'Senegal'),
(97,'Sierra Leone'),
(98,'Zambia'),(99,'Zimbabwe'),(100,'Canada'),(101,'Grenada'),(102,'Guadeloupe'),(103,'Martinique'),
(104,'Netherlands Antilles'),(105,'Oman'),(106,'New Zealand');`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE from nationality`);
  }
}
