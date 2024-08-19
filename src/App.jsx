import React, { useCallback, useEffect, useState , useRef } from 'react'

const App = () => {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback( ()=>{
      let pswd = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

      if( numberAllowed ){
        str += "0123456789" 
      }

      if( charAllowed ){
        str += ".!@#$%^&*;:.,/?*-+[](){}`"
      }

      for(let i=1; i<=length; i++){
        let charIdx = Math.floor( Math.random()*str.length+1 )
        pswd += str.charAt(charIdx);
      }

      setPassword( pswd );

  }, [length, charAllowed, numberAllowed, password] )

  useEffect( ()=>{
    passwordGenerator()
  },  [ length, numberAllowed, charAllowed, setPassword]  )

  const passwordRef = useRef(null);

  const copyPassword = () => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  }

  return (
    <div className='bg-zinc-900 w-screen h-screen text-white flex flex-col justify-center items-center p-16 gap-3'>

      <h1 className='font-sans font-semibold text-2xl '>Password Generator App</h1>
      <div className=' px-5 py-7 bg-zinc-700 rounded-md flex flex-col  items-center justify-center gap-5'>

        <div className='w-full flex'>
          <input type="text" name="password" readOnly ref={passwordRef} className='w-full text-xl text-black outline-none px-6 py-2 rounded-l-full' placeholder='Password' value={password} />
          <button onClick={copyPassword} className='rounded-r-full bg-blue-600 py-2 px-5'>Copy</button>
        </div>

        <div className='flex gap-5 w-full'>
          <div className='flex gap-2'>
            <input type="range" name="length-bar" min={6} max={20} value={length} onChange={e=>setLength(e.target.value)} />
            <p>Length ({length}) </p>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" name="number-box" defaultValue={numberAllowed} onChange={()=>setNumberAllowed(!numberAllowed)} />
            <p>Numbers</p>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" name="length-bar" defaultValue={charAllowed} onChange={()=>setCharAllowed(!charAllowed)} />
            <p>Characters</p>
          </div>
        </div>

      </div>

    </div>
  )
}

export default App