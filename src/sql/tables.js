const tables = {
  user: 'CREATE TABLE IF NOT EXISTS `user` (\
    `id` INTEGER NOT NULL UNIQUE,\
    `name` TEXT NOT NULL,\
    `email` TEXT NOT NULL UNIQUE,\
    `password` TEXT NOT NULL,\
    PRIMARY KEY (`id` AUTOINCREMENT))',
  note: 'CREATE TABLE IF NOT EXISTS `notes` (\
    `id` INTEGER NOT NULL UNIQUE,\
    `title` TEXT NOT NULL,\
    `mark` INTEGER DEFAULT 1,\
    `content` TEXT NOT NULL,\
    PRIMARY KEY (`id` AUTOINCREMENT))'
  }

module.exports = {...tables}