import react, { useState } from "react";
 function Ex1Message() {
    const [message, setMessage] = useState("Hello");
    const changeMessage=() => setMessage("Goodbye");

    return (
        <div>
            <p>{message}</p>
            <button onClick={changeMessage}>Click</button>
        </div>
    );
 };
 export default Ex1Message;

     
 