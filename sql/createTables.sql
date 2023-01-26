CREATE TABLE [user_account] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [user_name] varchar(16) NOT NULL,
  [hash_id] smallint,
  [user_email] varchar(64) NOT NULL,
  [user_password] varchar(128) NOT NULL,
  [clearance] tinyint NOT NULL,
  [registration_time] DATETIME2 NOT NULL,
  [last_online] DATETIME2 NOT NULL
)
GO

CREATE TABLE [tag] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [name] varchar(32) UNIQUE NOT NULL
)
GO

CREATE TABLE [tag_pairing] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [tag_id] int NOT NULL,
  [music_id] int NOT NULL
)
GO

CREATE TABLE [artist] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [name] varchar(64) UNIQUE NOT NULL
)
GO

CREATE TABLE [record_label] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [name] varchar(64) UNIQUE NOT NULL
)
GO

CREATE TABLE [publisher] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [name] varchar(64) UNIQUE NOT NULL
)
GO

CREATE TABLE [user_favorite] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [user_id] int NOT NULL,
  [music_id] int NOT NULL
)
GO

CREATE TABLE [user_rating] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [user_id] int NOT NULL,
  [music_id] int NOT NULL,
  [rating] tinyint NOT NULL
)
GO

CREATE TABLE [music] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [upload_time] DATETIME2 NOT NULL,
  [uploader_id] int NOT NULL,
  [edit_time] DATETIME2,
  [editor_id] int,
  [title] varchar(128) NOT NULL,
  [artist_id] int,
  [record_label_id] int,
  [publisher_id] int,
  [album] varchar(64),
  [link] varchar(128),
  [num_played] integer,
  [avg_rating] float
)
GO

CREATE INDEX [user_account_ix01] ON [user_account] ("user_name")
GO

CREATE UNIQUE INDEX [user_account_ux01] ON [user_account] ("user_email")
GO

CREATE UNIQUE INDEX [tag_ux01] ON [tag] ("name")
GO

CREATE INDEX [tag_pairing_ix01] ON [tag_pairing] ("tag_id")
GO

CREATE INDEX [tag_pairing_ix02] ON [tag_pairing] ("music_id")
GO

CREATE UNIQUE INDEX [artist_ux01] ON [artist] ("name")
GO

CREATE UNIQUE INDEX [record_label_ux01] ON [record_label] ("name")
GO

CREATE UNIQUE INDEX [publisher_ux01] ON [publisher] ("name")
GO

CREATE INDEX [user_favorite_ix01] ON [user_favorite] ("user_id")
GO

CREATE INDEX [user_favorite_ix02] ON [user_favorite] ("music_id")
GO

CREATE INDEX [user_rating_ix01] ON [user_rating] ("user_id")
GO

CREATE INDEX [user_rating_ix02] ON [user_rating] ("music_id")
GO

CREATE INDEX [music_ix01] ON [music] ("title")
GO

CREATE INDEX [music_ix02] ON [music] ("artist_id")
GO

CREATE INDEX [music_ix03] ON [music] ("avg_rating")
GO

ALTER TABLE [tag_pairing] ADD FOREIGN KEY ([tag_id]) REFERENCES [tag] ([id])
GO

ALTER TABLE [tag_pairing] ADD FOREIGN KEY ([music_id]) REFERENCES [music] ([id])
GO

ALTER TABLE [user_favorite] ADD FOREIGN KEY ([user_id]) REFERENCES [user_account] ([id])
GO

ALTER TABLE [user_favorite] ADD FOREIGN KEY ([music_id]) REFERENCES [music] ([id])
GO

ALTER TABLE [user_rating] ADD FOREIGN KEY ([music_id]) REFERENCES [music] ([id])
GO

ALTER TABLE [user_rating] ADD FOREIGN KEY ([user_id]) REFERENCES [user_account] ([id])
GO

ALTER TABLE [music] ADD FOREIGN KEY ([uploader_id]) REFERENCES [user_account] ([id])
GO

ALTER TABLE [music] ADD FOREIGN KEY ([editor_id]) REFERENCES [user_account] ([id])
GO

ALTER TABLE [music] ADD FOREIGN KEY ([artist_id]) REFERENCES [artist] ([id])
GO

ALTER TABLE [music] ADD FOREIGN KEY ([record_label_id]) REFERENCES [record_label] ([id])
GO

ALTER TABLE [music] ADD FOREIGN KEY ([publisher_id]) REFERENCES [publisher] ([id])
GO
