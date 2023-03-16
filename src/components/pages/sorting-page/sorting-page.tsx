import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../../ui/solution-layout/solution-layout";
import {RadioInput} from '../../ui/radio-input/radio-input'
import styles from './sorting-page.module.css';
import { Button } from "../../ui/button/button";
import { Direction } from "../../../types/direction";
import { Column } from "../../ui/column/column";
import { delay } from "../../../utils/delay";
import { DELAY_IN_MS } from "../../../constants/delays";
import { ElementStates } from "../../../types/element-states";
type TItem = {
  value: number;
  color: ElementStates;
}
export const SortingPage: React.FC = () => {
  const [sortName, setSortName] = useState<string>('choice');
  const [arr, setArr] = useState<TItem[]>([]);
  const [loading, setLoading] = useState<boolean[]>([false,false, false])
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setSortName(e.target.value);
  }
  const handleClick = (e: FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>) =>{
    e.preventDefault();
    randomArr(3,17, [0,100]);
    
  }
  const randomArr = (minLength: number, maxLength: number, interval: [number, number]) =>{
    //генерация длины массива
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    //генерация случайного массива чисел
    const min = Math.ceil(interval[0]);
    const max = Math.floor(interval[1]);
    const arrNumber: TItem[] = [...new Array<TItem>(length)].map(() => 
      { 
        const value = Math.floor(Math.random() * (max - min + 1)) + min; 
        const color = ElementStates.Default;
        return {value, color};
      })
    setArr(arrNumber);
  }
  const handleSortClick = (e: React.FormEvent<HTMLButtonElement>) => {
    if(sortName === 'bubble'){
      if(e.currentTarget.classList.contains('ascending')){
        bubbleSort('ascending')
      }
      else{
        bubbleSort('descending');
      }
    }
    else{
      if(e.currentTarget.classList.contains('ascending')){
        choiceSort('ascending');
      }
      else{
        choiceSort('descending');
      }
    }
  }
  const swap = (arr: TItem[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };
  const bubbleSort = async(sort: 'ascending' | 'descending') =>{
    if(sort === 'ascending'){
      setLoading([true, false, true])
    }
    else{
      setLoading([false, true, true])
    }
    for (let j = arr.length - 1; j >= 0; j--) {
      for (let i = 0; i < j; i++) {
          //отмечаем изменяемые элементы
          arr[i].color = ElementStates.Changing;
          arr[i + 1].color = ElementStates.Changing;
          setArr([...arr]);
          await delay(DELAY_IN_MS);
          if (whichSort(sort, arr[i], arr[i + 1])) {
              swap(arr, i, i + 1);
              setArr([...arr]);
              await delay(DELAY_IN_MS); 
          }
          arr[i].color = ElementStates.Default;
          arr[i + 1].color = ElementStates.Default;
          setArr([...arr]);          
      }
      arr[j].color = ElementStates.Modified;
      setArr([...arr]);
    }
    setLoading([false, false, false])
  }
  const choiceSort = async(sort: 'ascending' | 'descending') =>{
    if(sort === 'ascending'){
      setLoading([true, false, true])
    }
    else{
      setLoading([false, true, true])
    }
    for (let i = 0; i < arr.length; i++) {
      let index = i;
      for (let j = i+1; j < arr.length; j++) {
        //отмечаем изменяемые элементы
        arr[index].color = ElementStates.Changing;
        arr[j].color = ElementStates.Changing;
        setArr([...arr]);
        await delay(DELAY_IN_MS);
        if(whichSort(sort, arr[index], arr[j])){
          swap(arr,index, j)
          setArr([...arr]);
          await delay(DELAY_IN_MS); 
        }
        arr[index].color = ElementStates.Default;
        arr[j].color = ElementStates.Default;
        setArr([...arr]); 
      }
      arr[index].color = ElementStates.Modified;
      setArr([...arr]);
    }
    setLoading([false, false, false])
  }
  const whichSort = (sort: 'ascending' | 'descending', firstVal: TItem, secondVal: TItem) =>{
    if(sort === 'ascending'){
      return firstVal.value > secondVal.value
    }
    else {
      return firstVal.value < secondVal.value
    }
  }
  return (
    <SolutionLayout title="Сортировка массива">
      <form className={`${styles.container}`} onSubmit={handleClick}>
        <div className={`${styles.radioButtons}`}>
          <RadioInput data-testid="choice" checked={sortName === 'choice' ? true : false} onChange={onChange} label="Выбор" value='choice' name="choice" disabled={loading[2] ? true: false}/>
          <RadioInput data-testid="bubble" checked={sortName === 'bubble' ? true : false} onChange={onChange} label="Пузырёк" value='bubble' name="bubble" disabled={loading[2] ? true: false}/>
        </div>
        <div className={`${styles.sortButtons}`}>
          <Button data-testid="ascending" type="button" text="По возрастанию" sorting={Direction.Ascending} extraClass='ascending' disabled={loading[1]} isLoader={loading[0] ? true: false} onClick={handleSortClick}/>
          <Button data-testid="descending" type="button" text="По убыванию" sorting={Direction.Descending} extraClass='descending' disabled={loading[0]} isLoader={loading[1] ? true: false} onClick={handleSortClick}/>
        </div>
        <Button data-testid="newArr" type="submit" text="Новый массив" disabled={loading[2] ? true: false}/>
      </form>
      <div data-testid="column" className={`${styles.array}`}>
        { arr &&
          arr.map((item, i) => {
            return <Column index={item.value} key={i} state={item.color}/>
          })
        }
      </div>
    </SolutionLayout>
  );
};
