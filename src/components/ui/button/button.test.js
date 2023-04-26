import TestRenderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';

describe('Тестирование компонента Button', () => {
    it("проверка текста кнопки", () => {
        render(<Button text='Test' data-testid= 'button' />)
        const button = screen.getByTestId('button');
        expect(button).toHaveTextContent('Test')
    });
    it('Кнопки с текстом рендерятся без ошибок', () => {
        const tree = TestRenderer.create(<Button text='Push'/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Кнопки без текста рендерятся без ошибок', () => {
        const tree = TestRenderer.create(<Button/>).toJSON();
        expect(tree).toMatchSnapshot();
    });  
    it('Заблокированные кнопки рендерятся без ошибок', () => {
        const tree = TestRenderer.create(<Button disabled='true'/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Кнопки с индикацией загрузки рендерятся без ошибок', () => {
        const tree = TestRenderer.create(<Button isLoader='true'/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Корректность вызова колбэка при нажатии на кнопку', () => {
        window.alert = jest.fn();

        // Рендерим компонент
        render(<Button text='Тест' onClick={()=> window.alert('Вызов колбэка')}/>)

        // Находим элемент кнопки
        const button = screen.getByText("Тест");

        // Имитируем нажатие на кнопку
        fireEvent.click(button);
        
        // Проверяем, что alert сработал с правильным текстом предупреждения
        expect(window.alert).toHaveBeenCalledWith('Вызов колбэка');
    });
})
