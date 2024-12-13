import { useState, useCallback,useEffect,useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");


  // useRef hook
  const passwordRef=useRef(null);

  // useCallback memorise the function 
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKHMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "@#$%^&*+[]{}>~!<-_";
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);


  const copyPasswordToClipbord = useCallback(()=>{
    // it will show the selection portun on screen 
    passwordRef.current?.select() 
    // it will show the selection portun on screen  betwwen range loke  0-14 etc
    // passwordRef.current?.setSelectionRange(0,50) 
    window.navigator.clipboard.writeText(password)
  },[password])

//  jo bhi hum ne array me pass kiya hai vo change huaa to useEffect fir se call hoga 
  useEffect(()=>{
    passwordGenerator();
  },[length, numberAllowed, charAllowed,passwordGenerator])

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" value={password} 
        className="outline-none w-full py-1 px-3"
        placeholder="Password"
        readOnly
        ref={passwordRef}
        />
        <button onClick={copyPasswordToClipbord}  className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">Copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
        <input type="range"
        min={6}
        max={50}
        value={length}
        className="cursor-pointer"
        onChange={(e)=>{setLength(e.target.value)}}
        />
        <label >Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox"
          defaultChecked={numberAllowed}
          id="numberIput"
          onChange={()=>{setNumberAllowed((prev)=>!prev);
          }}
          />
          <label >Numbers</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input type="checkbox"
          defaultChecked={charAllowed}
          onChange={()=>{setCharAllowed((prev)=>!prev);
          }}
          />
          <label >Characters</label>
        </div>

      </div>
    </div>
  );
}

export default App;
