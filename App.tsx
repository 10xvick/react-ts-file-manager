import * as React from 'react';
import './bootstrap.css';
import './style.css';
import { Ctx, initialData, Reducer } from './state/reducer';
import MediaListUI from './modules/medialist';
import MenuUI from './modules/menu';

export default function App() {
  const [data, dispatch] = React.useReducer(Reducer, initialData);
  // return <Test2/>
  return (
    <div>
      <Ctx.Provider value={{ data: data, dispatch: dispatch }}>
        <MenuUI />
        <MediaListUI />
      </Ctx.Provider>
    </div>
  );
}
