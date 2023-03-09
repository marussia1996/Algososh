import React, { FormEvent, useState } from "react";
import { ElementStates } from "../../../types/element-states";
import { Button } from "../../ui/button/button";
import { Circle } from "../../ui/circle/circle";
import { Input } from "../../ui/input/input";
import { SolutionLayout } from "../../ui/solution-layout/solution-layout";
import styles from './string.module.css';
import {DELAY_IN_MS} from '../../../constants/delays'
import { delay } from "../../../utils/delay";
type TItem = {
  value: string;
  color: ElementStates;
}
export const StringComponent: React.FC = () => {
  const [string, setString] = useState<string>('');
  const [arr, setArr] = useState<Array<TItem>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setString(e.target.value);
  }
  //максимальная длина строки
  const MAX_LENGTH_STRING = 11;
  const handleClick = (e: FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>) =>{
    e.preventDefault();
    const word = string.split('').map((value) => ({value, color: ElementStates.Default}));
    reverseString(word)
  }
  const reverseString = async(word: TItem[]) =>{
    setLoading(true);
    //показываем всю строку (обычную)
    setArr([...word]);
    await delay(DELAY_IN_MS);
    //заводим два указателя на начало и конец строки
    let i = 0;
    let j = word.length - 1;
    //пока указатели не встретились выполняем перестановку
    while(i <= j){
      //если указатели встретились, то меняем цвет элемента на модифицированный (серединный элемент) или единственный элемент массива
      if(j === i){
        word[i].color = ElementStates.Modified;
        setArr([...word]);
      }else{
        //отмечаем изменяемые элементы
        word[i].color = ElementStates.Changing;
        word[j].color = ElementStates.Changing;
        setArr([...word]);
        await delay(DELAY_IN_MS);
        //меняем элементы местами
        let tmp = word[i];
        word[i] = word[j];
        word[j] = tmp;
        //отмечаем измененные элементы
        word[i].color = ElementStates.Modified;
        word[j].color = ElementStates.Modified;
        setArr([...word]);
        await delay(DELAY_IN_MS);
      }
      i++;
      j--;
    }
    setLoading(false);
  }

  return (
    <SolutionLayout title="Строка">
      <form className={`${styles.container}`} onSubmit={handleClick}>
        <Input isLimitText={true} maxLength={MAX_LENGTH_STRING} onChange={onChange}></Input>
        <Button text='Развернуть' disabled={string.length > 0 ? false: true} type="submit" isLoader={loading}></Button>
      </form>
      <div  className={`${styles.word}`}>
        {
          arr.map((letter, index)=>(
            <Circle letter={letter.value} key={index} state={letter.color} />
          ))
        }
      </div>
    </SolutionLayout>
  );
};
