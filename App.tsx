import * as React from 'react';
import './bootstrap.css';
import './style.css';
import { Ctx, initialData, Reducer } from './state/reducer';
import GalleryUI from './modules/galleryUI';
import MenuUI from './modules/menu';

export default function App() {
  const [data, dispatch] = React.useReducer(Reducer, initialData);
  // return <Test2/>
  return (
    <div>
      <Ctx.Provider value={{ data: data, dispatch: dispatch }}>
        <MenuUI />
        <GalleryUI />
      </Ctx.Provider>
    </div>
  );
}
