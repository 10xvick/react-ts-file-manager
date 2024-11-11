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
        // video.addEventListener('onLoad', (e) => {
        //   console.log('vid', e);
        // });
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

function storeImageLocally(imageUrl) {
  return new Promise((resolve, reject) => {
    // Create a new image element
    const img = new Image();

    // Set the crossOrigin attribute to 'anonymous' to avoid tainted canvas issues
    img.crossOrigin = 'anonymous';

    // Once the image loads, render it to a canvas
    img.onload = function () {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Set the canvas width and height to the image dimensions
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0);

      // Convert the canvas to a data URL
      const dataUrl = canvas.toDataURL('image/png');

      // Resolve the data URL
      resolve(dataUrl);
    };

    // Handle image load error
    img.onerror = function (error) {
      reject('Image could not be loaded: ' + error);
    };

    // Set the image source to the provided URL
    img.src = imageUrl;
  });
}

// Example usage:
storeImageLocally(
  'https://i.ibb.co/0MfKY5M/dd0829fa5cf570282aa8931254bca5b4-removebg-preview-1-removebg-preview.png'
)
  .then((localUrl) => {
    // Use the local URL here
    console.log('Local URL: ', localUrl);

    // For example, you can set it as the src of another image
    const newImg = document.createElement('img');
    newImg.src = localUrl;
    document.body.appendChild(newImg);

    // You can also download the image
    const link = document.createElement('a');
    link.href = localUrl;
    link.download = 'image.png';
    link.click();
  })
  .catch((error) => console.error('Error: ', error));
