SELECT TABLE_NAME, TABLE_SCHEMA FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = N'artist' AND TABLE_SCHEMA = N'dbo'
IF OBJECT_ID('[artist]', 'U') IS NULL CREATE TABLE [artist] ([id] INTEGER NOT NULL IDENTITY(1,1) , [name] NVARCHAR(255) NULL, PRIMARY KEY ([id]));
EXEC sys.sp_helpindex @objname = N'[artist]';
CREATE INDEX [artist_name] ON [artist] ([name])
SELECT TABLE_NAME, TABLE_SCHEMA FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = N'record_label' AND TABLE_SCHEMA = N'dbo'
IF OBJECT_ID('[record_label]', 'U') IS NULL CREATE TABLE [record_label] ([id] INTEGER NOT NULL IDENTITY(1,1) , [name] NVARCHAR(255) NULL, PRIMARY KEY ([id]));
EXEC sys.sp_helpindex @objname = N'[record_label]';
CREATE INDEX [record_label_name] ON [record_label] ([name])
SELECT TABLE_NAME, TABLE_SCHEMA FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = N'publisher' AND TABLE_SCHEMA = N'dbo'
IF OBJECT_ID('[publisher]', 'U') IS NULL CREATE TABLE [publisher] ([id] INTEGER NOT NULL IDENTITY(1,1) , [name] NVARCHAR(255) NULL, PRIMARY KEY ([id]));
EXEC sys.sp_helpindex @objname = N'[publisher]';
CREATE INDEX [publisher_name] ON [publisher] ([name])
SELECT TABLE_NAME, TABLE_SCHEMA FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = N'user_account' AND TABLE_SCHEMA = N'dbo'
IF OBJECT_ID('[user_account]', 'U') IS NULL CREATE TABLE [user_account] ([id] INTEGER NOT NULL IDENTITY(1,1) , [user_name] NVARCHAR(255) NULL, [hash_id] NVARCHAR(255) NULL, [user_email] NVARCHAR(255) NULL, [user_password] NVARCHAR(255) NULL, [clearance] INTEGER NULL, [registration_time] DATETIMEOFFSET NULL, [last_online] DATETIMEOFFSET NULL, [upload_timeout] DATETIMEOFFSET NULL, PRIMARY KEY ([id]));
EXEC sys.sp_helpindex @objname = N'[user_account]';
CREATE INDEX [user_account_user_name] ON [user_account] ([user_name])
CREATE INDEX [user_account_user_email] ON [user_account] ([user_email])
SELECT TABLE_NAME, TABLE_SCHEMA FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = N'music'
AND TABLE_SCHEMA = N'dbo'
IF OBJECT_ID('[music]', 'U') IS NULL CREATE TABLE [music] ([id] INTEGER NOT NULL IDENTITY(1,1) , [uploader_id] INTEGER NULL, [upload_time] DATETIMEOFFSET NULL, [edit_time] DATETIMEOFFSET NULL, [editor_id] INTEGER NULL, [title] NVARCHAR(255) NULL, [artist_id] INTEGER NULL, [record_label_id] INTEGER NULL, [publisher_id] INTEGER NULL, [album] NVARCHAR(255) NULL, [link] NVARCHAR(255) NULL, [num_played] INTEGER NULL, [avg_rating] INTEGER NULL, [aws_root] NVARCHAR(255) NULL, [music_size] INTEGER NULL, [approver_id] INTEGER NULL, [approval_time] DATETIMEOFFSET NULL, PRIMARY KEY ([id]), FOREIGN KEY ([uploader_id]) REFERENCES [user_account] ([id]) ON DELETE NO ACTION, FOREIGN KEY ([editor_id]) REFERENCES [user_account] ([id]), FOREIGN KEY ([artist_id]) REFERENCES [artist] ([id]) ON DELETE CASCADE, FOREIGN KEY ([record_label_id]) REFERENCES [record_label] ([id]) ON DELETE CASCADE, FOREIGN KEY ([publisher_id]) REFERENCES [publisher] ([id]) ON DELETE CASCADE, FOREIGN KEY ([approver_id]) REFERENCES [user_account] ([id]));
EXEC sys.sp_helpindex @objname = N'[music]';
SELECT TABLE_NAME, TABLE_SCHEMA FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = N'tag' AND TABLE_SCHEMA = N'dbo'
IF OBJECT_ID('[tag]', 'U') IS NULL CREATE TABLE [tag] ([id] INTEGER NOT NULL IDENTITY(1,1) , [name] NVARCHAR(255) NULL, PRIMARY KEY ([id]));
EXEC sys.sp_helpindex @objname = N'[tag]';
CREATE INDEX [tag_name] ON [tag] ([name])
SELECT TABLE_NAME, TABLE_SCHEMA FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = N'tag_pairing' AND TABLE_SCHEMA = N'dbo'
IF OBJECT_ID('[tag_pairing]', 'U') IS NULL CREATE TABLE [tag_pairing] ([tag_id] INTEGER , [music_id] INTEGER , CONSTRAINT [tag_pairing_tag_id_music_id_unique] UNIQUE ([tag_id], [music_id]), PRIMARY KEY ([tag_id], [music_id]), FOREIGN KEY ([tag_id]) REFERENCES [tag] ([id]) ON DELETE CASCADE, FOREIGN KEY ([music_id]) REFERENCES [music] ([id]) ON DELETE CASCADE);
EXEC sys.sp_helpindex @objname = N'[tag_pairing]';
CREATE INDEX [tag_pairing_tag_id] ON [tag_pairing] ([tag_id])
CREATE INDEX [tag_pairing_music_id] ON [tag_pairing] ([music_id])
SELECT TABLE_NAME, TABLE_SCHEMA FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = N'user_favorite_music' AND TABLE_SCHEMA = N'dbo'
IF OBJECT_ID('[user_favorite_music]', 'U') IS NULL CREATE TABLE [user_favorite_music] ([user_id] INTEGER , [music_id] INTEGER , CONSTRAINT [user_favorite_music_user_id_music_id_unique] UNIQUE ([user_id], [music_id]), PRIMARY KEY ([user_id], [music_id]), FOREIGN KEY ([user_id]) REFERENCES [user_account] ([id]) ON DELETE CASCADE, FOREIGN KEY ([music_id]) REFERENCES [music] ([id]) ON DELETE CASCADE);
EXEC sys.sp_helpindex @objname = N'[user_favorite_music]';
CREATE INDEX [user_favorite_music_user_id] ON [user_favorite_music] ([user_id])
CREATE INDEX [user_favorite_music_music_id] ON [user_favorite_music] ([music_id])
SELECT TABLE_NAME, TABLE_SCHEMA FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = N'user_bio' AND TABLE_SCHEMA = N'dbo'
IF OBJECT_ID('[user_bio]', 'U') IS NULL CREATE TABLE [user_bio] ([id] INTEGER NOT NULL IDENTITY(1,1) , [bio_text] NVARCHAR(255) NULL, [user_id] INTEGER NULL, PRIMARY KEY ([id]), FOREIGN KEY ([user_id]) REFERENCES [user_account] ([id]) ON DELETE CASCADE);
EXEC sys.sp_helpindex @objname = N'[user_bio]';
SELECT TABLE_NAME, TABLE_SCHEMA FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = N'user_comment_music' AND TABLE_SCHEMA = N'dbo'
IF OBJECT_ID('[user_comment_music]', 'U') IS NULL CREATE TABLE [user_comment_music] ([id] INTEGER NOT NULL IDENTITY(1,1)
, [user_id] INTEGER NULL, [music_id] INTEGER NULL, [comment_text] NVARCHAR(255) NULL, PRIMARY KEY ([id]), FOREIGN KEY ([user_id]) REFERENCES [user_account] ([id]) ON DELETE CASCADE, FOREIGN KEY ([music_id]) REFERENCES [music] ([id]) ON DELETE CASCADE);
EXEC sys.sp_helpindex @objname = N'[user_comment_music]';