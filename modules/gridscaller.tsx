import React, { useState } from 'react';
import { Ctx } from '../state/reducer';

export function GridScaller() {
  const [min, setmin] = useState<string>('20');
  const [max, setmax] = useState<string>(document.body.clientWidth.toString());
  const scale = React.useContext(Ctx).data.config.grid.scale;
  const dispatch = React.useContext(Ctx).dispatch;

  return (
    <div>
      <input
        type="number"
        value={min}
        min={0}
        max={max}
        onChange={(e) => setmin(e.target.value)}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={scale}
        onChange={(e) =>
          dispatch({ type: 'setgridscale', payload: { data: e.target.value } })
        }
      />
      {scale}
      <input
        type="number"
        value={max}
        min={min}
        onChange={(e) => setmax(e.target.value)}
      />
    </div>
  );
}
