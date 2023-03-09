import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../../constants/delays";
import { ElementStates } from "../../../types/element-states";
import { delay } from "../../../utils/delay";
import { LinkedList } from "../list-page/utils";
import { Button } from "../../ui/button/button";
import { Circle } from "../../ui/circle/circle";
import { ArrowIcon } from "../../ui/icons/arrow-icon";
import { Input } from "../../ui/input/input";
import { SolutionLayout } from "../../ui/solution-layout/solution-layout";
import styles from './list-page.module.css'
import { CHANGING, DEFAULT } from "../../../constants/element-colors";
import { HEAD, TAIL } from "../../../constants/element-captions";
import { MAX_LENGTH_ELEMENTS } from "../../../constants/amout-symbols";

type TListItem = {
  value: string;
  color: ElementStates;
  arrow?: boolean;
  topCircle?: boolean;
  bottCircle?: boolean;
  smallCircle?: {
    value: string;
    color: ElementStates
  }
}

export const ListPage: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [index, setIndex] = useState<number | null>(null);
  const defaultList = [{value: '32', color: ElementStates.Default}, {value: '2', color: ElementStates.Default}, {value: '70', color: ElementStates.Default}]
  const [list, setList] = useState<TListItem[]>(defaultList);
  const linkedList = React.useMemo(() => {
    return new LinkedList<string>(['32', '2', '70']);
  },[])
  const [loadingAddH, setLoadingAddH] = useState<boolean>(false);
  const [loadingAddT, setLoadingAddT] = useState<boolean>(false);
  const [loadingDelH, setLoadingDelH] = useState<boolean>(false);
  const [loadingDelT, setLoadingDelT] = useState<boolean>(false);
  const [loadingAddToI, setLoadingAddToI] = useState<boolean>(false);
  const [loadingRemToI, setLoadingRemToI] = useState<boolean>(false);
  const onChangeVal = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setValue(e.target.value);
  }
  const onChangeInd = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setIndex(Number(e.target.value))
  }
  const addInHead = async() =>{
    setLoadingAddH(true)
    //добавляет в начало списка
    linkedList.prepend(value);
    //Если длина массива не равна 0
    if(list.length !== 0){
      //показываем верхний кружок
      list[0] = {...list[0], topCircle: true, smallCircle: {value: value, color: ElementStates.Changing}}
      setList([...list]);
      await delay(SHORT_DELAY_IN_MS);
      //убираем кружок и добавляем в массив элемент в начало
      list[0] = {...list[0], topCircle: false}
    }
    list.unshift({
      value: value,
      color: ElementStates.Modified
    })
    setList([...list]);
    await delay(SHORT_DELAY_IN_MS);
    //устанавливаем цвет на дефолтный
    list[0] = {...list[0], color: ElementStates.Default}
    setList([...list]);
    await delay(SHORT_DELAY_IN_MS);
    setValue('');
    setLoadingAddH(false)
  }
  const addInTail = async() =>{
    setLoadingAddT(true)
    //добавляет в конец списка
    linkedList.append(value);
    //Если длина массива не равна 0
    if(list.length !== 0){
      //показываем верхний кружок
      list[list.length - 1] = {...list[list.length - 1], topCircle: true, smallCircle: {value: value, color: ElementStates.Changing}}
      setList([...list]);
      await delay(SHORT_DELAY_IN_MS);
      //убираем кружок и добавляем в массив элемент в конец
      list[list.length - 1] = {...list[list.length - 1], topCircle: false}
    }
    list.push({
      value: value,
      color: ElementStates.Modified
    })
    setList([...list]);
    await delay(SHORT_DELAY_IN_MS);
     //устанавливаем цвет на дефолтный
     list[list.length - 1] = {...list[list.length - 1], color: ElementStates.Default}
     setList([...list]);
     await delay(SHORT_DELAY_IN_MS);
     setValue('');
     setLoadingAddT(false)
  }
  const deleteFromHead = async() =>{
    setLoadingDelH(true)
    //удаляем элемент из начала списка
    linkedList.deleteHead();
    //показываем нижний кружок у головы списка
    const delEl = list[0].value;
    list[0] = {...list[0], value: '', bottCircle: true, smallCircle: {value: delEl, color: ElementStates.Changing}}
    setList([...list]);
    await delay(SHORT_DELAY_IN_MS);
    //убираем кружок и удаляем из начала массива элемент
    list[0] = {...list[0], bottCircle: false};
    list.shift();
    setList([...list]);
    await delay(SHORT_DELAY_IN_MS);
    setLoadingDelH(false)
  }
  const deleteFromTail = async() =>{
    setLoadingDelT(true)
    //удаляем элемент из конца списка
    linkedList.deleteTail();
    //показываем нижний кружок у хвоста списка
    const delEl = list[list.length - 1].value;
    list[list.length - 1] = {...list[list.length - 1], value: '', bottCircle: true, smallCircle: {value: delEl, color: ElementStates.Changing}}
    setList([...list]);
    await delay(SHORT_DELAY_IN_MS);
    //убираем кружок и удаляем из конца массива элемент
    list[list.length - 1] = {...list[list.length - 1], bottCircle: false};
    list.pop();
    setList([...list]);
    await delay(SHORT_DELAY_IN_MS);
    setLoadingDelT(false)
  }
  const addToIndex = async() =>{
    setLoadingAddToI(true)
    if(index) {
      linkedList.insertAt(value, index);
      //первому элементу указываем верхний кружок
      list[0] = {...list[0], topCircle: true, smallCircle: {value: value, color: ElementStates.Changing}}
      setList([...list]);
      await delay(SHORT_DELAY_IN_MS);
      //проходим по всем элементам до нужного индекса и предыдущим элементам устанавливаем цвет, убираем кружок
      for(let i = 1; i <= index; i++){
        list[i] = {...list[i], topCircle: true, smallCircle: {value: value, color: ElementStates.Changing}}
        list[i-1] = {...list[i-1], color: ElementStates.Changing, arrow: true, topCircle: false}
        setList([...list]);
        await delay(SHORT_DELAY_IN_MS);
      }
      //убираем кружок и добавляем в массив элемент в нужное место
      list[index] = {...list[index], topCircle: false};
      list.splice(index, 0 ,{value: value , color: ElementStates.Modified})
      setList([...list]);
      await delay(SHORT_DELAY_IN_MS);
      //убираем цвета у кружков и стрелок
      list.map((item)=>{ return (item.color = ElementStates.Default, item.arrow = false )});
      setList([...list]);
      await delay(SHORT_DELAY_IN_MS);
      setIndex(null)
      setValue('')
    }
    setLoadingAddToI(false)
  }
  const removeToIndex = async() =>{
    setLoadingRemToI(true)
    if(index){
      linkedList.extractAt(index);
      //проходим по всем элементам до нужного индекса устанавливаем цвет
      for(let i = 0; i < index; i++){
        list[i] = {...list[i], color: ElementStates.Changing, arrow: true}
        setList([...list]);
        await delay(SHORT_DELAY_IN_MS);
      }
      //очищаем значение кружка, показываем маленький кружок
      const removeItem = list[index].value;
      list[index] = {...list[index], value: '', color: ElementStates.Changing, arrow: false, bottCircle: true, smallCircle: {value: removeItem, color: ElementStates.Changing}}
      setList([...list]);
      await delay(SHORT_DELAY_IN_MS);
      //удаляем элеимент из массива
      list.splice(index, 1);
      //убираем цвета у кружков и стрелок
      list.map((item)=>{ return (item.color = ElementStates.Default, item.arrow = false )});
      setList([...list]);
      await delay(SHORT_DELAY_IN_MS);
      setIndex(null);
    } 
    setLoadingRemToI(false)
  }

  return (
    <SolutionLayout title="Связный список">
      <form className={`${styles.container}`}>
        <div className={`${styles.control}`}>
          <Input value={value} extraClass={`${styles.input}`} isLimitText={true} maxLength={MAX_LENGTH_ELEMENTS} placeholder='Введите значение' onChange={onChangeVal}/>
          <Button linkedList="small" text="Добавить в head" type="button" onClick={addInHead} isLoader={loadingAddH} disabled={value.length === 0 || loadingAddToI || loadingRemToI}/>
          <Button linkedList="small" text="Добавить в tail" type="button" onClick={addInTail} isLoader={loadingAddT} disabled={value.length === 0 || loadingAddToI || loadingRemToI}/>
          <Button linkedList="small" text="Удалить из head" type="button" onClick={deleteFromHead} isLoader={loadingDelH} disabled={list.length === 0 || loadingAddToI || loadingRemToI}/>
          <Button linkedList="small" text="Удалить из tail" type="button" onClick={deleteFromTail} isLoader={loadingDelT} disabled={list.length === 0 || loadingAddToI || loadingRemToI}/>
        </div>
        <div className={`${styles.control}`}>
          <Input value={index? `${index}` : ''} extraClass={`${styles.input}`} placeholder='Введите индекс' type="number" onChange={onChangeInd} min={0} max={list.length - 1}/>
          <Button linkedList="big" text="Добавить по индексу" type="button" onClick={addToIndex} disabled={index === null || value.length === 0 || index > list.length -1 || loadingRemToI} isLoader={loadingAddToI}/>
          <Button linkedList="big" text="Удалить по индексу" type="button" onClick={removeToIndex} disabled={index === null || index > list.length -1 || loadingAddToI } isLoader={loadingRemToI}/>
        </div>
      </form>
      <div className={`${styles.list}`}>
        {
          list.map((item, index)=>{
            return (
              <div className={`${styles.item}`} key={index}>
                <div className={`${styles.circle}`}>
                  {
                    item.topCircle &&
                    <Circle letter={item.smallCircle?.value} state={item.smallCircle?.color} isSmall={true} extraClass={`${styles.topCircle}`}/> 
                  }
                  <Circle letter={item.value} state={item.color} index={index} head={(index === 0) && !item.topCircle ? HEAD : ''} tail={(index === list.length - 1) && !item.bottCircle ? TAIL : ''}/>
                  {
                    item.bottCircle &&
                    <Circle letter={item.smallCircle?.value} state={item.smallCircle?.color} isSmall={true} extraClass={`${styles.bottCircle}`}/> 
                  }
                </div>
                {list.length - 1 !== index &&
                  <ArrowIcon fill={item.arrow ? CHANGING : DEFAULT}/>
                }
              </div>
            )
          })
        }
      </div>
    </SolutionLayout>
  );
};
