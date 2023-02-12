import React, { FormEvent, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './fibonacci-page.module.css';
//TODO: переместить в отдельный файл
export const delay = (ms: number) => new Promise<void>((resolve) => {
  setTimeout(() => resolve(), ms)
})
export const FibonacciPage: React.FC = () => {
  const [number, setNumber] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [arrFib, setArrFib] = useState<Array<number>>([]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setNumber(Number(e.target.value));
    setArrFib([]);
  }
  const memo:Record<number, number> = {}
  const handleClick = (e: FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>) =>{
    e.preventDefault();
    setLoading(true)
    fibonacci(number, memo).finally(()=>setLoading(false))
    setNumber(0);
  }
  const fibonacci = async(n: number, memo: Record<number, number> = {}) =>{
    if (n in memo) {
      return memo[n];
    }
    if (n === 1) {
      memo[1] = 1;
      setArrFib(prevArr => [...prevArr, memo[1]]);
      await delay(SHORT_DELAY_IN_MS);
      return memo[n];
    }
    if (n === 2) {
      memo[1] = 1;
      memo[2] = 1;
      setArrFib(prevArr => [...prevArr, memo[1]]);
      await delay(SHORT_DELAY_IN_MS);
      setArrFib(prevArr => [...prevArr, memo[2]]);
      await delay(SHORT_DELAY_IN_MS);
      return memo[n];
    }
    
    memo[n] = await fibonacci(n - 1, memo) + await fibonacci(n - 2, memo);
    setArrFib(prevArr => [...prevArr, memo[n]]);
    await delay(SHORT_DELAY_IN_MS);
    return memo[n];
  }
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <form className={`${styles.container}`} onSubmit={handleClick}>
        <Input type="number" isLimitText={true} max={19} min={1} onChange={onChange}></Input>
        <Button text='Рассчитать' type="submit" disabled={number > 0 && number <= 19 ? false: true} isLoader={loading}></Button>
      </form>
      <div  className={`${styles.fibonacci}`}>
        { arrFib &&
         arrFib.map((value, index)=>{
            return <Circle letter={String(value)} key={index} index={index}/>
          })
        }
      </div>
    </SolutionLayout>
  );
};
