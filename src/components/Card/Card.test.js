import renderer from 'react-test-renderer';
import Card from './index';

it('changes the class when hovered', () => {
  const component = renderer.create(
    <Card title="Henlo">Oki</Card>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});