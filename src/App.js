
import './App.css';
import buttons from './components/buttonArray'
import parse from 'html-react-parser'
import { useState } from 'react';
import { evaluate,match, sqrt, log10, format } from 'mathjs';

import { square } from 'mathjs';


function App() {
  const [answer, setAnswer] = useState("0");
  const [runningSum, setRunningSum] = useState("");
  const [lastFunc, setLastFunc] = useState("");
  const parseInput = (funcs) => {

    let t = 0;
    let lastnum = 0;
    switch (funcs) {
      case "AC":
        setAnswer(0);
        setRunningSum("");
        break;
      case "=":
        lastnum = runningSum.replace("log","log10");
        lastnum = lastnum.replace("ln","log");
        // setRunningSum(lastnum);
        try {
          setAnswer(evaluate(lastnum))
        } catch (err) {
          console.log("e", err)
        }
        break;
      case "ANS":
        let ans=answer.toString();
        console.log(ans)
        setRunningSum(ans);
        break;
      case "(-)":
        
        let running =  runningSum;
        
        console.log(running,runningSum,)
        lastnum = running.match(/[\d\.]+(?!.[\.*\d])/);
        console.log("ln",lastnum)
        running=running.replace((/[\d\.]+(?!.*[\.\d])/), (-1*lastnum))
        running=running.replace('--','');
        setRunningSum(running)
        break;
      case "sin":
        funcs = "sin(";
        setRunningSum(runningSum + funcs);
        break;
      case "hyp":
        funcs = "hyp(";
        setRunningSum(runningSum + funcs);
        break;
      case "cos":
        funcs = "cos(";
        setRunningSum(runningSum + funcs);
        break;
      case "tan":
        funcs = "tan(";
        setRunningSum(runningSum + funcs);
        break;
      case "log":
        funcs = "log(";
        setRunningSum(runningSum + funcs);
        // lastnum = runningSum.match(/[\d\.]+(?!.[\.*\d])/)[0];
        // setRunningSum(runningSum.replace((/[\d\.]+(?!.*[\.\d])/), log10(lastnum)))
        break;
        case "ln":
          funcs = "ln(";
          setRunningSum(runningSum + funcs);
          break;
      case "&#x221A;":
        lastnum = runningSum.match(/[\d\.]+(?!.[\.*\d])/)[0];
        console.log(lastnum)

        setRunningSum(runningSum.replace((/[\d\.]+(?!.*[\.\d])/), sqrt(lastnum)))
        break;
      case "x<sup>2</sup>":
        lastnum = runningSum.match(/[\d\.]+(?!.[\.*\d])/)[0];
        setRunningSum(runningSum.replace((/[\d\.]+(?!.*[\.\d])/), square(lastnum)))
        break;

      case "x": funcs = "*"
      case ".":
      case "(":
      case ")":
      case "+":
      case "-":
      case "/":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0": setRunningSum(runningSum + funcs);
    }







  }


  return (
    <div className="calculator">casio
      <Display runningSum={runningSum} answer={answer} />
      <Buttons buttons={buttons} click={parseInput}></Buttons>
    </div>
  );
}




const Display = (props) => {
  return (

    <div id="display">
      <RunningSum runningSum={props.runningSum} />
      <Answer answer={props.answer} />
    </div>
  )
}

const Buttons = (props) => {
  let btns = props.buttons.sort((a, b) => parseFloat(a.keyOrder) - parseFloat(b.keyOrder));
  return (
    <div className="buttons">
      {btns.map((text, index) => {

        return <Button key={index} button={btns[index]} click={props.click} />

      })}
    </div>
  )
}

const Button = (props) => {
  return (
    <div id={props.button.keyStyle} onClick={() => { props.click(props.button.text) }}>
      {parse(props.button.text)}
    </div>
  )
}
const RunningSum = (props) => {
  return (
    <div className="running-sum">
      <p>{props.runningSum}</p>
    </div>
  )
}

const Answer = (props) => {
  return (
    <div className="answer">
      <p>{props.answer}</p>
    </div>
  )
}
export default App;
