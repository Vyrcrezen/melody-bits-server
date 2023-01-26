import { Artist } from "../sql/artist.sql";
import { Publisher } from "../sql/publisher.sql";
import { RecordLabel } from "../sql/record_label.sql";

export interface NewMusicData {
    title: string;
    artist_name: string;
    record_label_name?: string;
    publisher_name?: string;
    album?: string;
    link: string;

    cover_image: Express.Multer.File;
    music_file: Express.Multer.File;

    artist?: Artist;
    record_label?: RecordLabel;
    publisher?: Publisher;

    tags: string;
}