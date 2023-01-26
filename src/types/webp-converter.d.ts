/// <reference types="node" />

// https://developers.google.com/speed/webp/docs/using
declare module 'webp-converter' {

    /**
     * convert buffer to webp buffer
     * @param buffer buffer of image
     * @param image_type buffer image type jpg,png ...
     * @param option options and quality,it should be given between 0 to 100
     * @param extra_path
     */
    declare function buffer2webpbuffer(buffer: any, image_type: any, option: any, extra_path: any): Promise<string | Buffer>;

    /**
     * now convert image to .webp format
     * @param input_image input image(.jpeg, .pnp ....)
     * @param output_image output image .webp
     * @param option options and quality,it should be given between 0 to 100
     * @param logging
     */
    declare function cwebp(input_image: any, output_image: any, option: any, logging?: string): Promise<any>;

    /**
     * now convert .webp to other image format
     * @param input_image input image .webp
     * @param output_image output image(.jpeg, .pnp ....)
     * @param option options and quality,it should be given between 0 to 100 (https://developers.google.com/speed/webp/docs/dwebp)
     * @param logging
     */
    declare function dwebp(input_image: any, output_image: any, option: string, logging?: string): Promise<any>;

    /**
     * permission issue in Linux and macOS
     */
    declare function grant_permission(): void;

    /**
     * now convert .gif image to .webp format
     * @param input_image input image(.jpeg, .pnp ....)
     * @param output_image /output image .webp
     * @param option options and quality,it should be given between 0 to 100
     * @param logging
     */
    declare function gwebp(input_image: any, output_image: any, option: any, logging?: string): Promise<any>;

    /**
     * convert base64 to webp base64
     * @param base64str base64str of image
     * @param image_type base64str image type jpg,png ...
     * @param option options and quality,it should be given between 0 to 100
     * @param extra_path
     */
    declare function str2webpstr(base64str: any, image_type: any, option: any, extra_path: any): Promise<string | Buffer>;

    /**
     * Add ICC profile,XMP metadata and EXIF metadata
     * @param input_image input image(.webp)
     * @param output_image output image .webp
     * @param icc_profile icc profile
     * @param option get or set option (icc,xmp,exif)
     * @param logging
     */
    declare function webpmux_add(input_image: any, output_image: any, icc_profile: any, option: any, logging?: string): Promise<any>;

    /**
     * Create an animated WebP file from Webp images
     * @param input_images array of image(.webp)
     * @param output_image animatedimage .webp
     * @param loop Loop the frames n number of times
     * @param bgcolor Background color of the canvas
     * @param logging
     */
    declare function webpmux_animate(input_images: any, output_image: any, loop: any, bgcolor: any, logging?: string): Promise<any>;

    /**
     * Extract ICC profile,XMP metadata and EXIF metadata
     * @param input_image input image(.webp)
     * @param icc_profile icc profile
     * @param option
     * @param logging
     */
    declare function webpmux_extract(input_image: any, icc_profile: any, option: any, logging?: string): Promise<any>;

    /**
     * Get the a frame from an animated WebP file
     * @param input_image input image(.webp)
     * @param output_image output image .webp
     * @param frame_number frame number
     * @param logging
     */
    declare function webpmux_getframe(input_image: any, output_image: any, frame_number: any, logging?: string): Promise<any>;

    /**
     * Strip ICC profile,XMP metadata and EXIF metadata
     * @param input_image input image(.webp)
     * @param output_image output image .webp
     * @param option
     * @param logging
     */
    declare function webpmux_strip(input_image: any, output_image: any, option: any, logging?: string): Promise<any>;
}
