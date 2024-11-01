import React from 'react';
import { utility } from '../utility/utility';
import { gridscale_ } from '../constants/stored_variables';

export const Reducer = (state, { type, payload: { data, dispatch, fn } }) => {
  switch (type) {
    case 'setlist': {
      state.list = Object.values(data);

      state.list.forEach((e, i) => {
        e.absolute_type = e.type.split('/')[0];
        e.url = window.URL.createObjectURL(new Blob([e]));
        // switch (e.absolute_type) {
        //   case 'image':
        //     {
        //       e.preview_url = e.url;
        //     }
        //     break;
        //   case 'video': {
        //     utility.parser.video(e).then((f) => {
        //       console.log(f);
        //       e.target.files[i] = f;
        //       dispatch({
        //         type: 'setlist',
        //         payload: { data: e.target.files, dispatch: dispatch },
        //       });
        //     });
        //   }
        // }
      });
      break;
    }
    case 'setgridscale': {
      state.config.grid.scale = data;
      fn(Number(data));
    }
  }
  return { ...state };
};

export const Ctx = React.createContext(null);
export const initialData = {
  list: [] || Array(100).fill(createFakeFile('file' + Math.random(), 'video')),
  config: { grid: { scale: Number(gridscale_.get()) } },
};

function createFakeFile(filename, filetype) {
  const blob = new Blob([''], { type: filetype });
  const file = new File([blob], filename, { type: filetype });
  return file;
}
