import Aws from 'aws-sdk';
import fs from 'fs';
import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

export class AwsS3 {
    private static _instance: AwsS3;

    private s3: Aws.S3;
    private bucketName = "vyrcrezen";
    private rootObject = "web-music";

    private constructor() {
        Aws.config.update({ region: "eu-central-1" });

        this.s3 = new Aws.S3();
    }

    static getInstance() {
        if (!AwsS3._instance) {
            AwsS3._instance = new AwsS3();
        }

        return AwsS3._instance;
    }

    /**
     *
     * @param awsKeyName Used like: `<BUCKET>/<web-music>/${awsKeyName}`
     */
    async uploadFile(dataStream: fs.ReadStream, awsKeyName: string) {
        const uploadParams = {
            Bucket: this.bucketName,
            Key: `${this.rootObject}/${awsKeyName}`,
            Body: dataStream,
        };

        const uploadResult = await new Promise((resolve, reject) => {
            this.s3.upload(uploadParams, (err: Error, data: Aws.S3.ManagedUpload.SendData) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });

        console.log("The result of the upload is:");
        console.log(uploadResult);
    }

    async downloadFile(awsObjectKey: string, range?: string) {
        const downloadParams: Aws.S3.GetObjectRequest = {
            Bucket: this.bucketName,
            Key: `${this.rootObject}/${awsObjectKey}`,
            Range: range ? range : undefined,
        };

        const uploadResult = await new Promise<Aws.S3.GetObjectOutput>((resolve, reject) => {
            this.s3.getObject(downloadParams, (err: Aws.AWSError, data: Aws.S3.GetObjectOutput) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });

        console.log("The result of the download is:");
        console.log(uploadResult);
        // console.log(uploadResult.Body?.toString());

        return uploadResult;
    }

    // {
    //     AcceptRanges: 'bytes',
    //     LastModified: 2022-11-07T17:22:09.000Z,
    //     ContentLength: 262384,
    //     ETag: '"48057dc3d5cb8cd2f0fc3a2f4ee0fa7c"',
    //     ContentType: 'application/octet-stream',
    //     Metadata: {}
    //   }
    async getObjectMeta(awsObjectKey: string) {
        const metaParams: Aws.S3.HeadObjectRequest = {
            Bucket: this.bucketName,
            Key: `${this.rootObject}/${awsObjectKey}`,
        };

        const metaResult = await new Promise<Aws.S3.GetObjectOutput>((resolve, reject) => {
            this.s3.headObject(metaParams, (err: Aws.AWSError, data: Aws.S3.HeadObjectOutput) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });

        console.log("The result of the meta download:");
        console.log(metaResult);
        console.log(metaResult.Body?.toString());

        return metaResult;
    }

    /**
     *
     * @param keyRoot Used like: `<BUCKET>/<web-music>/${keyRoot}`
     */
    async listObjectsOfKey(keyRoot: string) {
        const listParams: Aws.S3.ListObjectsV2Request = {
            Bucket: this.bucketName,
            Prefix: `${this.rootObject}/${keyRoot}`,
        };

        const uploadResult = await new Promise<Aws.S3.ListObjectsV2Output>((resolve, reject) => {
            this.s3.listObjectsV2(
                listParams,
                (err: Aws.AWSError, data: Aws.S3.ListObjectsV2Output) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                }
            );
        });

        console.log("The result of the download is:");
        console.log(uploadResult);
    }

    async moveFile() {}

    async deleteObjects(awsObjectKeys: string[]) {
        const downloadParams: Aws.S3.DeleteObjectsRequest = {
            Bucket: this.bucketName,
            Delete: {
                Objects: awsObjectKeys.map(ObjectKey => { return  { Key: `${this.rootObject}/${ObjectKey}` }; })
            }
        };

        const deletionResult = await new Promise<Aws.S3.GetObjectOutput>((resolve, reject) => {
            this.s3.deleteObjects(downloadParams, (err: Aws.AWSError, data: Aws.S3.DeleteObjectOutput) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });

        console.log("The result of the deletion is:");
        console.log(deletionResult);
        // console.log(uploadResult.Body?.toString());

        return deletionResult;
    }

    async CompressUploadImage(imageLocalPath: string, imageFileName: string, awsRootKey: string) {

        const imageExtension = imageLocalPath.substring(imageLocalPath.lastIndexOf('.'));
        const newImagePath = imageLocalPath.replace(imageExtension, ".webp");
        const newImagePathMini = imageLocalPath.replace(imageExtension, "-mini.webp");

        const normalImageFile = await imagemin(
            [["data", "music_uploads", imageFileName].join("/")],
            {
                plugins: [
                    imageminWebp({
                        resize: { width: 1024, height: 0 },
                        metadata: "all",
                    }),
                ],
            }
        );
        await fs.promises.writeFile(newImagePath, normalImageFile[0].data);

        const miniImageFile = await imagemin(
            [["data", "music_uploads", imageFileName].join("/")],
            {
                plugins: [
                    imageminWebp({
                        resize: { width: 512, height: 0 },
                        metadata: "all",
                    }),
                ],
            }
        );
        await fs.promises.writeFile(newImagePathMini, miniImageFile[0].data);

        const awsUploads: Promise<void>[] = [];

        const awsImageKey = `music-data/${awsRootKey}/cover_image.webp`;
        awsUploads.push(this.uploadFile(fs.createReadStream(newImagePathMini), awsImageKey));

        const awsImageKeyHd = `music-data/${awsRootKey}/cover_image_hq.webp`;
        awsUploads.push(this.uploadFile(fs.createReadStream(newImagePath), awsImageKeyHd));

        await Promise.all(awsUploads);

        return {
            local: {
                normal: newImagePath,
                mini: newImagePathMini
            },
            aws: {
                normal: awsImageKeyHd,
                mini: awsImageKey
            }
        }
    }
}


// const express = require("express");
// const app = express();
// const fs = require("fs");
// const PORT = process.env.PORT || 3000;

// app.get("/video", (req, res) => {
//   const range = req.headers.range || "0";
//   const videoPath = "./video.mp4";
//   const videoSize = fs.statSync(videoPath).size;
//   const chunkSize = 1 * 1e6;  //  1MB
//   const start = Number(range.replace(/\D/g, ""));
//   const end = Math.min(start + chunkSize, videoSize - 1);

//   const contentLength = end - start + 1;

//   const headers = {
//     "Content-Range": `bytes ${start}-${end}/${videoSize}`,
//     "Accept-Ranges": "bytes",
//     "Content-Length": contentLength,
//     "Content-Type": "video/mp4",in Node.Js
//   };
//   res.writeHead(206, headers);

//   const stream = fs.createReadStream(videoPath, { start, end });
//   stream.pipe(res);
// });

// app.listen(PORT, console.log("Started on port 3000"));