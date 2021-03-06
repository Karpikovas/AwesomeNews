<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190604152818 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE users (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(180) NOT NULL, username_canonical VARCHAR(180) NOT NULL, email VARCHAR(180) NOT NULL, email_canonical VARCHAR(180) NOT NULL, enabled TINYINT(1) NOT NULL, salt VARCHAR(255) DEFAULT NULL, password VARCHAR(255) NOT NULL, last_login DATETIME DEFAULT NULL, confirmation_token VARCHAR(180) DEFAULT NULL, password_requested_at DATETIME DEFAULT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', UNIQUE INDEX UNIQ_1483A5E992FC23A8 (username_canonical), UNIQUE INDEX UNIQ_1483A5E9A0D96FBF (email_canonical), UNIQUE INDEX UNIQ_1483A5E9C05FB297 (confirmation_token), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE news_it (id INT AUTO_INCREMENT NOT NULL, title LONGTEXT NOT NULL, link LONGTEXT NOT NULL, guid LONGTEXT NOT NULL, description LONGTEXT NOT NULL, date LONGTEXT NOT NULL, news_json LONGTEXT NOT NULL, category LONGTEXT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE news_politics (id INT AUTO_INCREMENT NOT NULL, title LONGTEXT NOT NULL, link LONGTEXT NOT NULL, guid LONGTEXT NOT NULL, description LONGTEXT NOT NULL, date LONGTEXT NOT NULL, news_json LONGTEXT NOT NULL, category LONGTEXT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE news_music (id INT AUTO_INCREMENT NOT NULL, title LONGTEXT NOT NULL, link LONGTEXT NOT NULL, guid LONGTEXT NOT NULL, description LONGTEXT NOT NULL, date LONGTEXT NOT NULL, news_json LONGTEXT NOT NULL, category LONGTEXT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE news_sport (id INT AUTO_INCREMENT NOT NULL, title LONGTEXT NOT NULL, link LONGTEXT NOT NULL, guid LONGTEXT NOT NULL, description LONGTEXT NOT NULL, date LONGTEXT NOT NULL, news_json LONGTEXT NOT NULL, category LONGTEXT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE news_society (id INT AUTO_INCREMENT NOT NULL, title LONGTEXT NOT NULL, link LONGTEXT NOT NULL, guid LONGTEXT NOT NULL, description LONGTEXT NOT NULL, date LONGTEXT NOT NULL, news_json LONGTEXT NOT NULL, category LONGTEXT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE news_world (id INT AUTO_INCREMENT NOT NULL, title LONGTEXT NOT NULL, link LONGTEXT NOT NULL, guid LONGTEXT NOT NULL, description LONGTEXT NOT NULL, date LONGTEXT NOT NULL, news_json LONGTEXT NOT NULL, category LONGTEXT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE news_auto (id INT AUTO_INCREMENT NOT NULL, title LONGTEXT NOT NULL, link LONGTEXT NOT NULL, guid LONGTEXT NOT NULL, description LONGTEXT NOT NULL, date LONGTEXT NOT NULL, news_json LONGTEXT NOT NULL, category LONGTEXT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE users');
        $this->addSql('DROP TABLE news_it');
        $this->addSql('DROP TABLE news_politics');
        $this->addSql('DROP TABLE news_music');
        $this->addSql('DROP TABLE news_sport');
        $this->addSql('DROP TABLE news_society');
        $this->addSql('DROP TABLE news_world');
        $this->addSql('DROP TABLE news_auto');
    }
}
