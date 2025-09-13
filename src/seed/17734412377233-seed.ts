import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1756823926329 implements MigrationInterface {
  name = "seed17734412377233";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO special_ability VALUES (1,'Dribbling','The player (when COM controlled) favours attempting to dribble into a goal scoring position.'),
(2,'Tactical dribble','When a COM player has possession of the ball, he favours dribbling whilst looking for a better placed team mate to pass to.'),
(3,'Positioning','Positions the player well when receiving passes and balls crossed into the goal area.'),
(4,'Reaction','Although there is an increased danger of being caught offside, the player advances more aggressively, making for more scoring opportunities.'),
(5,'Playmaking','When in possession of the ball, all other team mates become more adept at receiving passes.'),
(6,'Passing','When in possession of the ball, a player receiving a pass will move with increased agility.'),
(7,'Scoring','Becomes more adept at positioning and passes, and goals become easier to make. Also, when a COM player has the ball, that player is more likely to try for a goal.'),
(8,'1-1 Scoring','Easier to score goals when 1-on-1 with the goalkeeper.'),
(9,'Post player','When in possession of the ball on the front lines, the player exerts an extra effort to keep the ball until a team mate is in a prime position to receive it.'),
(10,'Lines','Improves offence and defence along the offside line. Executes well-timed dashes.'),
(11,'Middle shooting','Becomes easier to take shots a fair distance away.'),
(12,'Side','Improve play in the areas near the touchline.'),(13,'Centre','Improve play in the central areas.'),
(14,'Penalties','Easier to score penalty kicks.'),(15,'1-Touch pass','Improves accuracy of direct plays.'),
(16,'Outside','More accurate kicking with the outside of the foot.'),(17,'Marking','Stays more tightly on the opponent being covered.'),
(18,'Sliding tackle','Better sliding with less chance of committing a foul.'),
(19,'Covering','Becomes more skilled at covering gaps in defence when an opponent breaks past a defender.'),
(20,'D-Line control','Defense line becomes more coordinated, making it easier to execute an offside trap.'),
(21,'Penalty stopper','Improved ability to stop penalty kicks.'),
(22,'1-on-1 stopper','The keeper responds well to shots taken from close range, and is better at stopping balls in 1-on-1 situations.'),
(23,'Long throw','Player has Longer than normal throw-ins.');`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE from special_ability`);
  }
}
