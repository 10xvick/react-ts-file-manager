import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({ log: true });
export const utility = {
  mpeg: {
    parser: {
      video: (file) => {
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext('2d');
        const video = document.createElement('video');
        video.addEventListener('onLoad', (e) => {
          console.log('vid', e);
        });
        video.src = file.url;
        ctx.drawImage(video, 0, 0, 10, 10);
        return utility.mpeg.ffmpeg.createVideo(file);
      },
    },
    ffmpeg: {
      createVideo: async (file) => {
        await ffmpeg.load();
        ffmpeg.FS('writeFile', 'testvid.mp4', await fetchFile(file));
        await ffmpeg.run(
          '-framerate',
          '1/10',
          '-i',
          'testvid.mp4',
          '-i',
          '-c:v',
          'libx264',
          '-ss',
          '00:00:33',
          '-t',
          '10',
          '-pix_fmt',
          'yuv420p',
          '-vf',
          'scale=100:100',
          'testx.png'
        );
        const finalimg = ffmpeg.FS('readFile', 'testx.png');
        file.url = URL.createObjectURL(
          new Blob([finalimg], { type: 'image/png' })
        );
        return file;
      },
    },
  },
  optimizer: {
    create_throttle: (timeout, fn) => {
      let poll;
      return (arg) => {
        clearTimeout(poll);
        poll = setTimeout(fn, timeout, arg);
      };
    },
  },
};
