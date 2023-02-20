import React, { FormEvent, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";
import { Stack } from "../stack/stack";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './stack-page.module.css'
type TItem = {
  value: string;
  color: ElementStates;
}
export const StackPage: React.FC = () => {
  const [string, setString] = useState<string>('');
  const [arr, setArr] = useState<TItem[]>([]);
  const [loadingAdd, setLoadingAdd] = useState<boolean>(false);
  const [loadingDel, setLoadingDel] = useState<boolean>(false);
  const [loadingClear, setLoadingClear] = useState<boolean>(false);
  //useMemo чтобы кэшировать данные между рендерингами
  const stack = React.useMemo(() => {
    return new Stack<TItem>()
  }, [])
  const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setString(e.target.value);
  }
  const handlePushItem = async() =>{
    setLoadingAdd(true);
    //кладем в стек значение
    stack.push({value: string, color: ElementStates.Default});
    setString('');
    //узнаем верхушку
    const top = stack.peak();
    //изменяем границу круга
    setArr([...arr, {value: top?.value ? top.value : '', color: ElementStates.Changing}])
    await delay(SHORT_DELAY_IN_MS);
    setArr([...arr, {value: top?.value ? top.value : '', color: ElementStates.Default}])
    await delay(SHORT_DELAY_IN_MS);
    setLoadingAdd(false);
  }
  const handlePopItem = async() =>{
    setLoadingDel(true);
    //выделяем цветом верхушку
    arr[arr.length - 1].color = ElementStates.Changing;
    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);
    //достаем из стека
    stack.pop();
    //обновляет массив
    setArr([...stack.getItems()]);
    await delay(SHORT_DELAY_IN_MS);
    setLoadingDel(false);
  }
  const handleClearItems = async() =>{
    setLoadingClear(true)
    stack.clear();
    setArr([...stack.getItems()]);
    await delay(SHORT_DELAY_IN_MS);
    setLoadingClear(false)
  }
  return (
    <SolutionLayout title="Стек">
      <form className={`${styles.container}`} onSubmit={handlePushItem}>
        <div className={`${styles.control}`}>
          <Input value={string} isLimitText={true} maxLength={4} onChange={onChange} disabled={loadingAdd}/>
          <Button text="Добавить" type="submit" onClick={handlePushItem} disabled={!string} isLoader={loadingAdd}/>
          <Button text="Удалить" type="button" onClick={handlePopItem} disabled={stack.getSize() === 0 || loadingAdd} isLoader={loadingDel}/>
        </div>
        <Button text="Очистить" type="button" onClick={handleClearItems} disabled={stack.getSize() === 0 || loadingAdd || loadingDel} isLoader={loadingClear}/>
      </form>
      <div className={`${styles.stack}`}>
        { 
          arr.map((item, index) => {
            return <Circle letter={item.value} state={item.color} key={index} index={index} head={(stack.getSize() - 1) === index ?'top' : ''}/>
          })
        }
      </div>
    </SolutionLayout>
  );
};
