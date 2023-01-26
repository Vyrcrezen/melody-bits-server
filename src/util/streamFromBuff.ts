import { Stream } from "stream";


export function streamFromBuff(buff: Buffer, chunkSize: number = 8388608) {
    return new Stream.Readable({
        autoDestroy: true,

        read() {
            let stepper = 0;
            const chSize = chunkSize;
            const buffer = buff;

            while (stepper  * chSize <  buffer.byteLength) {
                this.push(buffer.subarray(stepper * chSize, Math.min((stepper + 1) * chSize, buffer.byteLength)));
                ++stepper;
            }

            this.push(null);
        }
    })
}