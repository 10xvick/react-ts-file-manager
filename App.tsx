import * as React from 'react';
import { formatWithOptions } from 'util';
import './bootstrap.css';
import './style.css'; 

const Ctx = React.createContext(null);
const Reducer = (state,{type,payload})=>{
  switch (type) {
    case 'setlist':{ 
      state.list = Object.values(payload)};
      state.list.forEach(e=>{
        e.absolute_type = e.type.split('/')[0];
        e.url = window.URL.createObjectURL(new Blob([e])); 
      })
    }
  return {...state};
}
export default function App() { 
  const [data,dispatch] = React.useReducer(Reducer,{list:[]});
  return (
    <div>
      <Ctx.Provider value={{data:data,dispatch:dispatch}}>
        <Menu/>
        <List/>
      </Ctx.Provider>
    </div>
  );
}

function List(){ 
  const list = React.useContext(Ctx).data.list;
  const [preview,setPreview] = React.useState();
  console.log(list);
  const Preview = React.useCallback(()=> {
      let container = null;
      switch (preview.absolute_type) {  
        case 'video': container = <video poster={preview.url} controls allow-fullscreen className='vid' src={preview.url}/>; break;
        case 'image': container = <img className='img' src={preview.url}/>
      }
      return (<div className='prev'>
              <button className='pin btn-danger' onClick={e=>setPreview(null)}></button>
       {container}
    </div>)}
  ,[preview]);
  const Gallery = React.useCallback(()=>
  (
    <div className='gallery-container'>
      <ol className='img-gallery'>
        {list.map(e=><li className='stretch' onClick={()=>{ setPreview(e) }}><img src={e.url}/></li>)}
      </ol>
    </div>
  ),[list]);
  return preview?Preview():Gallery();
}

function Menu(){
  const [ menu, setMenu ] = React.useState(true)
  
  return (<div >
    {menu?<div className='p-1 menu position-fixed w-100 h-100'>
      <Fileimporter/>
    </div>:null}
    <button className='pin btn-warning' onClick={()=>setMenu(e=>!e)}></button>
  </div>)
}

function Fileimporter(){ 
  const dispatch = React.useContext(Ctx).dispatch;
  function importx(e){ 
    dispatch( {type:'setlist',payload:e.target.files} );
  }

  return (<div>
   <input className='mt-5 form-control' type='file' accept='video/*,image/*' multiple={true} onChange={e=>importx(e)}/>
  </div>)
}
