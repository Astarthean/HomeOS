<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260308103026 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('TRUNCATE accounts');

        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE accounts ADD name VARCHAR(100) NOT NULL');
        $this->addSql('ALTER TABLE accounts ADD type VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE accounts ADD owner_id VARCHAR(36) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE accounts DROP name');
        $this->addSql('ALTER TABLE accounts DROP type');
        $this->addSql('ALTER TABLE accounts DROP owner_id');
    }
}
