import React from 'react';
import { Ctx } from '../state/reducer';

export default function Fileimporter() {
  const dispatch = React.useContext(Ctx).dispatch;
  function importx(e) {
    dispatch({
      type: 'setlist',
      payload: { data: e.target.files, dispatch: dispatch },
    });
  }

  return (
    <div>
      <input
        placeholder="upload"
        className="mt-5 form-control"
        type="file"
        accept="video/*,image/*"
        multiple={true}
        onChange={(e) => importx(e)}
      />
    </div>
  );
}
