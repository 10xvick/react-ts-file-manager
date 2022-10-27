import * as React from 'react';
import './style.css';

const Ctx = React.createContext(null);
const Reducer = (state,{type,payload})=>{
  switch (type) {
    case 'setlist':{ 
      state.list = Object.values(payload)};
    }
  return {...state};
}
export default function App() { 
  const [data,dispatch] = React.useReducer(Reducer,{list:[{name:'...'}]})
  return (
    <div> 
      <Ctx.Provider value={{data:data,dispatch:dispatch}}>
        <Fileimporter/>
        <List/>
      </Ctx.Provider>
    </div>
  );
}

function List(){ 
  const list = React.useContext(Ctx).data.list;
  return (<ol>
    {list.map(e=><li>{e.name}</li>)}
  </ol>)
}

function Fileimporter(){ 
  const dispatch = React.useContext(Ctx).dispatch;
  function importx(e){
    console.log(e);
    dispatch( {type:'setlist',payload:e.target.files} );
  }

  return <input type='file' accept='.jpg,.png' multiple={true} onChange={e=>importx(e)}/>
}
