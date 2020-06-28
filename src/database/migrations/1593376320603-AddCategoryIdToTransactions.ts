import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export default class AddCategoryIdToTransactions1593376320603 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create Field
        await queryRunner.addColumn(
            'transactions',
            new TableColumn({
                name: 'category_id',
                type: 'uuid',
                isNullable: true,
            }),
        );
        // Create FK
        await queryRunner.createForeignKey(
            'transactions',
            new TableForeignKey({
                name: 'TransactionCategoryFK',
                columnNames: ['category_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'categories',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Delete FK
        await queryRunner.dropForeignKey('transactions', 'TransactionCategoryFK');
        // Delete Field
        await queryRunner.dropColumn('transactions', 'category_id');
    }
}
