import { IsOptional, Length, Matches, IsUrl, IsString, IsArray } from "class-validator";
import { NewMusicData } from "./newMusicData";

// Vbl for Validatable
export class VblNewMusicData {
    @Length(2, 128, { message: "MD_001;Music title must be between 2 and 128 characters long." })
    title?: string;

    @Length(2, 128, { message: "MD_003;Artist name must be between 2 and 128 characters long." })
    artist_name?: string;

    @Length(2, 128, { message: "MD_005;Record Label name must be between 2 and 128 characters long." })
    @IsOptional()
    record_label_name?: string;

    @Length(2, 128, { message: "MD_006;Publisher name must be between 2 and 128 characters long." })
    @IsOptional()
    publisher_name?: string;

    @Length(2, 128, { message: "MD_004;Album name must be between 2 and 128 characters long." })
    @IsOptional()
    album?: string;

    @IsUrl({}, { message: "MD_002;Link must be a valid web address, linking to the original source of the music." })
    link?: string;

    cover_image?: Express.Multer.File;
    music_file?: Express.Multer.File;

    @Matches(/(image\/jpg|image\/jpeg|image\/png|image\/webp)/, { message: "MD_009;Image must be in jpg, png or webp format." })
    cover_image_type?: string;

    @Matches(/audio\/mpeg/, { message: "MD_010;Music must be in mp3 format." })
    music_file_type?: string;

    @IsArray()
    @IsString({ each: true })
    @Length(2, 20, { each: true, message: "MD_007;Each tag must be between 2 and 20 characters long." })
    tags?: string[];


    constructor(newMusicData: Partial<NewMusicData>) {

        console.log('newMusicData');
        console.log(newMusicData);

        this.title = newMusicData.title?.replace(/\s+/g,' ').trim();
        this.artist_name = newMusicData.artist_name?.replace(/\s+/g,' ').trim();
        this.record_label_name = (newMusicData.record_label_name || undefined)?.replace(/\s+/g,' ').trim();
        this.publisher_name = (newMusicData.publisher_name || undefined )?.replace(/\s+/g,' ').trim();
        this.album = (newMusicData.album || undefined)?.replace(/\s+/g,' ').trim();
        this.link = newMusicData.link?.replace(/\s+/g,' ').trim();
        this.cover_image_type = newMusicData.cover_image?.mimetype;
        this.music_file_type = newMusicData.music_file?.mimetype;

        this.cover_image = newMusicData.cover_image;
        this.music_file = newMusicData.music_file;

        this.tags = newMusicData.tags?.split(';').map(tagItem => tagItem.replace(/\s+/g,' ').trim());
    }
}