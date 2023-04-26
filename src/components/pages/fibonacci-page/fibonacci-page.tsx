import React, { FormEvent, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../../constants/delays";
import { delay } from "../../../utils/delay";
import { Button } from "../../ui/button/button";
import { Circle } from "../../ui/circle/circle";
import { Input } from "../../ui/input/input";
import { SolutionLayout } from "../../ui/solution-layout/solution-layout";
import styles from './fibonacci-page.module.css';
import { getFibonacciNumbers } from "./utils";

export const FibonacciPage: React.FC = () => {
  const [number, setNumber] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [arrFib, setArrFib] = useState<Array<number>>([]);
  //максимальное и минимальное вводимое число поледовательности
  const MAX_FIB = 19;
  const MIN_FIB = 1;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setNumber(Number(e.target.value));
    setArrFib([]);
  }
  const memo:Record<number, number> = {}
  const handleSubmit = async(e: FormEvent) =>{
    e.preventDefault();
    setLoading(true)
    for(let i = 1; i <= number+1; i++){
      setArrFib(prevArr => [...prevArr,getFibonacciNumbers(i, memo)])
      await delay(SHORT_DELAY_IN_MS);
    }
    setLoading(false)
    await delay(SHORT_DELAY_IN_MS);
    setNumber(0);
    
  }
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <form className={`${styles.container}`} onSubmit={handleSubmit}>
        <Input data-testid="val" value={number !== 0? `${number}` : ''} type="number" isLimitText={true} max={MAX_FIB} min={MIN_FIB} onChange={onChange}></Input>
        <Button data-testid="button" text='Рассчитать' type="submit" disabled={number > 0 && number <= MAX_FIB ? false: true} isLoader={loading}></Button>
      </form>
      {/* TODO:  Вывод последовательности можно разбить на > 10 чисел и <*/}
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
