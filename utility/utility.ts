
export const utility = {
  parser:{
    video:function(file){
      const canvas = document.createElement('canvas');
      canvas.width = 100;
      canvas.height = 100;
      const ctx = canvas.getContext('2d');
      const video =  document.createElement('video');
      video.src = file.url;
      ctx.drawImage(video,0,0,10,10);
      const imgurl = canvas.toDataURL();
      return imgurl; 
    }
  }
}