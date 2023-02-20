export interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    peak: () => T | null;
    getItems: () => T[];
    getSize: () => number;
    clear: () => void;
  }
  
  export class Stack<T> implements IStack<T> {
    private container: T[] = [];
    //добавние в стек
    push = (item: T): void => {
      this.container.push(item)
    };
    //извлечение из стека
    pop = (): void => {
      this.container.pop()
    };
    //узнать какое значение на верхушке стека
    peak = (): T | null => {
      if(this.container.length > 0){
        return this.container[this.container.length -1]
      }
      else{
        return null;
      }
    };
    //получение всех элементов стека
    getItems = () =>{
        const arr: T[] | null = [];
        this.container.forEach((item) =>{
            arr.push(item);
        })
        return arr;
    }
    //размер стека
    getSize = () => this.container.length;
    //очистка стека
    clear = () => this.container = [];
  }