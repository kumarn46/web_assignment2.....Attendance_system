import React from 'react';


function Hello() {

    function Clickme(){
        alert("Button is Clocked");
    }
    return(
        <div>
        <h1>We are inside function component</h1>
           <button onClick={Clickme}>Click me</button>
            </div>
    )
}

export default Hello;