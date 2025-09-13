17745677271234;
import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1756823926329 implements MigrationInterface {
  name = "seed17745677271235";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO ability VALUES 
(1,'Attack','Higher values favour attacking positions.',1,99),
(2,'Defence','Higher values favour defensive positions.',1,99),
(3,'Body balance','The higher this value, the better the player is in confrontations and at charging.',1,99),
(4,'Stamina','The higher this value, the less the player tires during the match.',1,99),
(5,'Top speed','The higher this value, the higher the player''s maximum running speed when not in possession of the ball.',1,99),
(6,'Acceleration','The higher this value, the quicker the player reaches maximum speed.',1,99),
(7,'Response','The higher this value, the quicker the player responds to passes, loose balls, and opponent''s dribbling past the line of defence.',1,99),
(8,'Agility','The higher this value, the more agile the player.',1,99),
(9,'Dribble accuracy','The higher this value, the more precise the player''s dribbling.',1,99),
(10,'Dribble speed','The higher this value, the less difference there is between the player''s running speed and dribbling speed.',1,99),
(11,'Short pass accuracy','The higher this value, the more accurate the player is with grounders including short passes and through passes.',1,99),
(12,'Short pass speed','The higher this value, the more able the player is to make quick short passes that are difficult to intercept.',1,99),
(13,'Long pass accuracy','The higher this value, the more accurate the player is with airborne ball control including long passes and through passes in the air.',1,99),
(14,'Long pass speed','The higher this value, the more able the player is to make quick long passes that are difficult to intercept.',1,99),
(15,'Shot accuracy','The higher this value, the better the players aim.',1,99),
(16,'Shot power','The higher this value, the more power the player can use taking shots.',1,99),
(17,'Shot technique','The higher this value, the better the player is at taking shots from awkward positions such as when an opponent is pressuring him.',1,99),
(18,'Free kick accuracy','The higher this value, the more accurate the player is at taking free kicks.',1,99),
(19,'Swerve','The higher this value, the greater the amount of curve the player can put on the ball.',1,99),
(20,'Header','The higher this value, the more accurate the player''s headed passes and shots.',1,99),
(21,'Jump','The higher this value, the higher the player can jump.',1,99),
(22,'Technique','The higher this value, the more skilled the player is at trapping and then proceeding with play.',1,99),
(23,'Aggression','The higher this value, the higher more aggressively the player will attack.',1,99),
(24,'Mentality','The higher this value, the less fatigue affects the player''s performance and he plays better under pressure.',1,99),
(25,'Goal keeping skills','The higher this value, the more likely the player is to make a save.',1,99),
(26,'Team work ability','The higher this value, the more skilled the player is at team moves and at receiving passes.',1,99),
(27,'Condition/fitness','The higher this value, the less the player tires, and the less his condition deteriorates with consecutive matches.',1,8),
(28,'Weak foot accuracy','The higher this value, the greater the accuracy of balls kicked with the player''s weaker foot.',1,8),
(29,'Weak foot frequency','The higher this value, the more often the player will kick balls with his weaker foot.',1,8);`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE from ability`);
  }
}
