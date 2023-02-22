import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";
import { Queue } from "../queue/queue";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './queue-page.module.css'
type TItem = {
  value: string;
  color: ElementStates;
}
export const QueuePage: React.FC = () => {
  const [string, setString] = useState<string>('');
  const [arr, setArr] = useState<TItem[]>(Array(7).fill({value: '', color: ElementStates.Default}));
  const queue =  React.useMemo(() => {
    return new Queue<TItem>(7);
  },[]);
  const [loadingAdd, setLoadingAdd] = useState<boolean>(false);
  const [loadingDel, setLoadingDel] = useState<boolean>(false);
  const [loadingClear, setLoadingClear] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setString(e.target.value);
  }
  const handlePushItem = async() =>{
    setLoadingAdd(true)
    queue.enqueue({value: string, color: ElementStates.Default});
    arr[queue.getTail()-1] = {value: string , color: ElementStates.Changing}
    setArr([...arr])
    await delay(SHORT_DELAY_IN_MS)
    arr[queue.getTail()-1] = {value: string , color: ElementStates.Default}
    setArr([...arr])
    await delay(SHORT_DELAY_IN_MS)
    setString('')
    setLoadingAdd(false)
  };
  const handlePopItem = async() =>{
    setLoadingDel(true)
    arr[queue.getHead()].color = ElementStates.Changing;
    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS)
    arr[queue.getHead()].value = '';
    arr[queue.getHead()].color = ElementStates.Default;
    setArr([...arr]);
    //await delay(SHORT_DELAY_IN_MS)
    queue.dequeue();
    setLoadingDel(false)
  };
  const handleClearItems = async() =>{
    setLoadingClear(true)
    queue.clear();
    setArr(Array(7).fill({value: '', color: ElementStates.Default}))
    await delay(SHORT_DELAY_IN_MS)
    setLoadingClear(false)
  };
  return (
    <SolutionLayout title="Очередь">
      <form className={`${styles.container}`} onSubmit={handlePushItem}>
        <div className={`${styles.control}`}>
          <Input value={string} isLimitText={true} maxLength={4} placeholder='Введите значение' onChange={onChange} disabled={loadingAdd}/>
          <Button text="Добавить" type="submit" onClick={handlePushItem} disabled={!string || queue.getTail() === 7 } isLoader={loadingAdd}/>
          <Button text="Удалить" type="button" onClick={handlePopItem} disabled={loadingAdd || queue.isEmpty()} isLoader={loadingDel}/>
        </div>
        <Button text="Очистить" type="button" onClick={handleClearItems} disabled={ loadingAdd || loadingDel || queue.isEmpty()} isLoader={loadingClear}/>
      </form>
      <div className={`${styles.queue}`}>
        { 
          arr.map((item, index) => {
            return <Circle letter={item.value} state={item.color} 
              head={(index === queue.getHead() && !queue.isEmpty()) || (index === 6 && queue.isEmpty() && queue.getHead() === 7)? 'head' : ''} 
              tail={index === (queue.getTail() - 1) && !queue.isEmpty()? 'tail' : ''} 
              key={index} index={index} />
          })
        }
      </div>
    </SolutionLayout>
  );
};
