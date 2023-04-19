import { useState } from 'react'
import './App.css'

type TypeEntrey = {
  name: string,
  children?: TypeEntrey[]
}

const files = {
  name: 'root',
  children: [
    {
      name: 'node_modules',
      children: [
        {
          name: 'react'
        },
        {
          name: 'react-dom'
        },
        {
          name: 'vite',
          children: [
            {
              name: 'dist',
              children: [
                {
                  name: 'vite.js'
                },
              ],
            },
          ],
        },
      ]
    },
    {
      name: 'src',
    },
    {
      name: 'public',
    },
  ],
}

function App() {
  const [count, setCount] = useState(0)

  function Entry( { entry, depth }: {entry: TypeEntrey; depth: number} ){
    const [ open, setOpen ] = useState(false);
    return (
      <div style={{ paddingLeft: `${depth * 10}px`}}>
        {entry.children && 
          <button className='toogleButton' onClick={() => setOpen(!open)}>
            {!open? '+' : '-'}
          </button>
        }
        {' ' + entry.name}
        {open && entry.children?.map((entry, index) => {
          return <Entry entry={entry} depth={depth + 1} />
        })}
      </div>
    );
  }

  return (
    <div className="App">
      <h2>File Explorer</h2>
      <Entry entry={files} depth={0} />
    </div>
  )
}

export default App
