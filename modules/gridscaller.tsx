import React, { useState } from 'react';
import { Ctx } from '../state/reducer';

export function GridScaller() {
  const [min, setmin] = useState<string>('20');
  const [max, setmax] = useState<string>(document.body.clientWidth.toString());
  const scale = React.useContext(Ctx).data.config.grid.scale;
  const dispatch = React.useContext(Ctx).dispatch;

  return (
    <div>
      grid-scale:{scale}
      <div className="d-flex justify-conetent-space-between">
        <input
          type="number"
          value={min}
          min={0}
          max={max}
          onChange={(e) => setmin(e.target.value)}
        />
        <input
          className="w-100"
          type="range"
          min={min}
          max={max}
          value={scale}
          onChange={(e) =>
            dispatch({
              type: 'setgridscale',
              payload: { data: e.target.value },
            })
          }
        />
        <input
          type="number"
          value={max}
          min={min}
          max={document.body.clientWidth}
          onChange={(e) => setmax(e.target.value)}
        />
      </div>
    </div>
  );
}
