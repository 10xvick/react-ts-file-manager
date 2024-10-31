import React from 'react';
import Fileimporter from './fileimporter';
import { GridScaller } from './gridscaller';

export default function MenuUI() {
  const [menu, setMenu] = React.useState(true);

  return (
    <div>
      {menu ? (
        <div
          className="p-1 menu position-fixed w-100 h-100"
          onClick={(e) => e.stopPropagation()}
        >
          <Fileimporter />
          <br />
          <GridScaller />
        </div>
      ) : null}
      <button
        className="pin btn-warning"
        onClick={() => setMenu((e) => !e)}
      ></button>
    </div>
  );
}
