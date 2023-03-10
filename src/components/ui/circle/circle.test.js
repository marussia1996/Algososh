import TestRenderer from 'react-test-renderer';
import { ElementStates } from '../../../types/element-states';
import { Circle } from './circle';

describe('Тестирование компонента Circle: ', () => {
    it('Circle без буквы рендерятся без ошибок', () => {
        const tree = TestRenderer.create(<Circle/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Circle с буквами рендерятся без ошибок', () => {
        const tree = TestRenderer.create(<Circle letter='we'/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Circle с head рендерятся без ошибок', () => {
        const tree = TestRenderer.create(<Circle head={'head'}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Circle с react-component в head рендерятся без ошибок', () => {
        const tree = TestRenderer.create(<Circle head={<Circle/>}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Circle с tail рендерятся без ошибок', () => {
        const tree = TestRenderer.create(<Circle tail={'tail'}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Circle с react-component в tail рендерятся без ошибок', () => {
        const tree = TestRenderer.create(<Circle tail={<Circle/>}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Circle с index рендерятся без ошибок', () => {
        const tree = TestRenderer.create(<Circle index={1}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Circle с isSmall рендерятся без ошибок', () => {
        const tree = TestRenderer.create(<Circle isSmall='true'/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Circle в состоянии default рендерятся без ошибок', () => {
        const tree = TestRenderer.create(<Circle state={ElementStates.Default}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Circle в состоянии changing рендерятся без ошибок', () => {
        const tree = TestRenderer.create(<Circle state={ElementStates.Changing}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Circle в состоянии modified рендерятся без ошибок', () => {
        const tree = TestRenderer.create(<Circle state={ElementStates.Modified}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
})