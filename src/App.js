import CustomCanvas from './customCanvas/CustomCanvas';
import DrawState from './context/drawState';
import {useState} from 'react';
export default function App() {
    const [uri, setUri] = useState('')
  const image = 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  return (
      <DrawState>
        <CustomCanvas image={image} setUri={setUri} />
      </DrawState>

  );
}

