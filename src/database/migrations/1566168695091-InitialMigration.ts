import {MigrationInterface, QueryRunner} from 'typeorm';

export class InitialMigration1566168695091 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        // tslint:disable-next-line: max-line-length
        await queryRunner.query('CREATE TABLE `user` (`id` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `username` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE `user`');
    }

}
