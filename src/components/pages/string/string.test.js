import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { StringComponent } from './string';

describe('Корректно разворачивает строку: ', () => {
    it("Проверка текста кнопки",()=>{
        //рендерим компонент в виртуальном dom
        render(
            <BrowserRouter>
                <StringComponent/>
            </BrowserRouter>);
        //находим элементы с которыми будем работать
        const button = screen.getByTestId('button');
        expect(button).toHaveTextContent('Развернуть')
    })
    it('с чётным количеством символов',() => {
        //рендерим компонент в виртуальном dom
        render(
        <BrowserRouter>
            <StringComponent/>
        </BrowserRouter>);
        //находим элементы с которыми будем работать
        const string = screen.getByTestId('input');
        const button = screen.getByTestId('button');
        //тестовая строка
        const testStr = 'qwerty';
        //перевернутая строка
        const reverseTestStr = Array(testStr).reverse().join('');
        //записываем тестовую строку в инпут
        userEvent.type(string, testStr);
        //подтверждаем правильность
        expect(string).toHaveValue(testStr)
        //создаем событие клика по кнопке
        fireEvent.click(button)
        //ожидаем появляение кружков
        waitFor(()=>{
            //находим все кружки
            const circles = screen.getAllByTestId('circle');
            //формируем строку результата
            const res = circles.map((item)=>item.textContent).join('');
            //проверяем строки на соответствие
            expect(res).toBe(reverseTestStr);
        },{timeout: 1000});
    });
    it('с нечетным количеством символов',() => {
        //рендерим компонент в виртуальном dom
        render(
        <BrowserRouter>
            <StringComponent/>
        </BrowserRouter>);
        //находим элементы с которыми будем работать
        const string = screen.getByTestId('input');
        const button = screen.getByTestId('button');
        //тестовая строка
        const testStr = 'qwertyuw';
        //перевернутая строка
        const reverseTestStr = Array(testStr).reverse().join('');
        //записываем тестовую строку в инпут
        userEvent.type(string, testStr);
        //подтверждаем правильность
        expect(string).toHaveValue(testStr)
        //создаем событие клика по кнопке
        fireEvent.click(button)
        //ожидаем появляение кружков
        waitFor(()=>{
            //находим все кружки
            const circles = screen.getAllByTestId('circle');
            //формируем строку результата
            const res = circles.map((item)=>item.textContent).join('');
            //проверяем строки на соответствие
            expect(res).toBe(reverseTestStr);
        },{timeout: 1000});
    });
    it('с одним символом',() => {
        //рендерим компонент в виртуальном dom
        render(
        <BrowserRouter>
            <StringComponent/>
        </BrowserRouter>);
        //находим элементы с которыми будем работать
        const string = screen.getByTestId('input');
        const button = screen.getByTestId('button');
        //тестовая строка
        const testStr = 'q';
        //перевернутая строка
        const reverseTestStr = Array(testStr).reverse().join('');
        //записываем тестовую строку в инпут
        userEvent.type(string, testStr);
        //подтверждаем правильность
        expect(string).toHaveValue(testStr)
        //создаем событие клика по кнопке
        fireEvent.click(button)
        //ожидаем появляение кружков
        waitFor(()=>{
            //находим все кружки
            const circles = screen.getAllByTestId('circle');
            //формируем строку результата
            const res = circles.map((item)=>item.textContent).join('');
            //проверяем строки на соответствие
            expect(res).toBe(reverseTestStr);
        },{timeout: 1000});
    });
    it('с пустой строкой',() => {
        //рендерим компонент в виртуальном dom
        render(
        <BrowserRouter>
            <StringComponent/>
        </BrowserRouter>);
        //находим элементы с которыми будем работать
        const string = screen.getByTestId('input');
        const button = screen.getByTestId('button');
        //подтверждаем что строка пуста
        expect(string).toHaveValue('')
        //подтверждаем что кнопка заблокирована
        expect(button).toBeDisabled()
    });
});