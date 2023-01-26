import { Request } from 'express';
import { Music } from '../../../../models/sql/music.sql';
import { MusicApproval } from '../../../../models/sql/music_approval';
import { Merge } from "../../../../types/merge"
import { getClearedUser } from '../../../../util/getClearedUser';

export const editMusicApproval = async (_obj: any, { musicId, status, message }: { musicId?: string, status?: number, message?: string }, context: Merge<{ [prop: string]: any }, Partial<Request>>) => {

    try {
        console.log(message);

        console.log('######################');
        console.log(musicId);
        console.log(status);

        if ( typeof musicId !== 'string' || typeof status !== 'number') {
            return {
                code: 400,
                message: `Music ID or status not provided!`
            }
        }

        try {
            await getClearedUser(context?.jwtAuth, undefined, 2, 1)
        }
        catch (err) {
            return err;
        }

        const music = await Music.findByPk(musicId,
            {
                include: [
                    {
                        model: MusicApproval,
                        as: "approvals",
                    }
                ]
            }
            );

        if (!music) {
            return {
                code: 400,
                message: `No music with this id: ${musicId}`
            }
        }

        console.log(music);

        const existingApproval = (music.approvals ?? [])[0];
        const musicApproval = existingApproval ?? new MusicApproval({ music_id: music.id });

        musicApproval.status = status;
        musicApproval.message = message;

        console.log(musicApproval);

        // Status 0: Approved
        if (status === 0) {
            musicApproval.approval_time = new Date();

            console.log('Date included');
            console.log(musicApproval);

            await musicApproval.save();

            await music.update({
                approver_id: context?.jwtAuth?.user_id
            })

            return {
                code: 200,
                message: `Music successfully approved`
            }

        }
        // Status 1: Pending Approval
        // Status 2: Pending Revision
        else if (status === 1 || status === 2) {
                musicApproval.approval_time = undefined;
                await musicApproval.save();

                return {
                    code: 200,
                    message: `Music's approval status updated`
                }
            }
        // Status 3: Terminated
        else if (status === 3) {
            await music.destroy()

            return {
                code: 200,
                message: `Music submission process terminated`
            }
        }

        return {
            code: 200,
            message: `Unknown status code: ${status}`
        }
    }
    catch (err) {
        return {
            code: 500,
            message: 'Operation failed'
        }
    }

}