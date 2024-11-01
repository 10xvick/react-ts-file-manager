import React, { useEffect } from 'react';
import { Ctx } from '../state/reducer';
import { PiPlayCircle } from 'react-icons/pi';

export default function GalleryUI() {
  const list = React.useContext(Ctx).data.list;
  const [preview, setPreview] = React.useState(null!);

  const Preview = React.useCallback(() => {
    let container = null;
    switch (preview.absolute_type) {
      case 'video':
        container = (
          <video
            poster={preview.url}
            controls
            allow-fullscreen
            className="vid"
            src={preview.url}
          />
        );
        break;
      case 'image':
        container = <img className="img" src={preview.url} />;
    }
    return (
      <div className="prev">
        <button
          className="pin btn-danger"
          onClick={(e) => setPreview(null)}
        ></button>
        {container}
      </div>
    );
  }, [preview]);

  const Gallery = React.useCallback(() => {
    const gridscale = React.useContext(Ctx).data.config.grid.scale;

    return (
      <div
        className="gallery-container"
        style={{ '--gridscale': gridscale + 'px' }}
      >
        <div className="img-gallery">
          {list.map((e) => (
            <div
              key={e.url}
              className="thumbnail"
              onClick={() => {
                setPreview(e);
              }}
            >
              <ThumbnailUI file={e} />
            </div>
          ))}
        </div>
      </div>
    );
  }, [list]);
  return preview ? Preview() : Gallery();
}

const ThumbnailUI = ({ file }) => {
  console.log(file)
  return (
    <>
      {file.absolute_type == 'video' ? (
        <>
          <video src={file.url} preload={file.metadata} />
          <PiPlayCircle />
        </>
      ) : (
        <img src={file.url} />
      )}
    </>
  );
};
