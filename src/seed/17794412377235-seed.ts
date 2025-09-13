import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1756823926329 implements MigrationInterface {
  name = "seed17794412377235";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO position (id,"positionCategoryId",name,description,short) 
       VALUES (1,1,'Goal Keeper','Blocks shots and defends the goal.','GK'),(2,2,'Sweeper','Plays a clean-up role behind the other defenders.','CWP'),(3,2,'Centre Back','Blocks attacking opponents in front of goal.','CB'),(4,2,'Side Back','Defends to the side. Also able to join attacking moves.','SB'),(5,3,'Defensive Midfielder','Defends behind the lower midfield.','DMF'),(6,3,'Wing Back','Contributes to both offence and defence by moving up and down the wings.','WB'),(7,3,'Centre Midfielder','Contributes to defence, but also sets up attacks and occasionally goes for goal himself.','CMF'),(8,3,'Side Midfielder','Initiates attacks from the wings.','SMF'),
       (9,3,'Attacking Midfielder','Initiates attacks from the upper midfield.','AMF'),(10,4,'Wing Forward','Will try to make breakthroughs up the wing.','WF'),(11,4,'Second Striker','Hovers around the CF and tries for goals.','SS'),(12,4,'Centre Forward','Always looking to score goals.','CF');
`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE from position`);
  }
}
