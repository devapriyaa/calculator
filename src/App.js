import React, { useState, useEffect , useRef} from 'react';
import './App.css'

const Button = (props) => {
  return (
    <button className={`button ${props.className}`} value={props.value}>{props.value}</button>
  )
}

const ButtonWrappper = () => {

  const [firstNumber, setFirstNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState(0);
  const [operation, setOperation] = useState(null);

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(()=>{
      ref.current = value;
    });
    return ref.current;
  }


  const previousValue = usePrevious(firstNumber);

  const onClickHandler = (e) => {
    let value = e.target.value;
   
    if(value === 'MC'){
      console.log('cleared')
      setFirstNumber(0);
      setSecondNumber(0);
      setOperation(null);
    }else
    if(value === 'M+'){
      console.log('added to previous')
      setFirstNumber((Number(firstNumber) + Number(previousValue)))
    }else
    if(value === '/' || value === '+' || value === '-' || value === '*'){
      console.log('arthimetic action performed')
      setOperation(value)
    }else
    if(value === '='){
      console.log("answer")
      try{
        setFirstNumber(eval(firstNumber + operation + secondNumber))
        setSecondNumber(0)
        setOperation(null)
      }catch(e){
        console.log(e)
      }
      
    }else {
      console.log("number entered")
      operation === null ?
        firstNumber === 0 ? setFirstNumber(value) : setFirstNumber(firstNumber+value) :
        secondNumber === 0 ? setSecondNumber(value) : setSecondNumber(secondNumber+value)
    }
  }
 
  return (
    <div className="button_wrapper">
      <div type='text' className='text_input'>{(operation === null ? firstNumber : secondNumber)}</div>
      <div className="button_row" onClick={onClickHandler}>

        <Button className='MC' value='MC' />
        <Button className='M+' value='M+' />
        <Button className='divide' value='/' />

        <Button className='number' value='7' />
        <Button className='number' value='8' />
        <Button className='number' value='9' />
        <Button className='minus' value='-' />

        <Button className='number' value='4' />
        <Button className='number' value='5' />
        <Button className='number' value='6' />
        <Button className='add' value='+' />

        <Button className='number' value='1' />
        <Button className='number' value='2' />
        <Button className='number' value='3' />
        <Button className='equal' value='=' />

        <Button className='number' value='.' />
        <Button className='number' value='0' />
        <Button className='multiply' value='*' />

      </div>
    </div>
  )
}

function App() {
  return (
    <ButtonWrappper />
  );
}

export default App;
