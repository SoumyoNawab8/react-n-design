import {Card} from './components';
import "./App.scss";

function App() {
  return (
    <div style={{ backgroundColor: '#e4e4e4', height: '100vh', width: '100%', padding: '1px' }} className="rnd-d-flex">
      <div style={{ width: '400px' }}>
        <Card
          title="Example Card"
          footer={<div className='rnd-d-flex rnd-justify-end'><a href="#">Learn More...</a></div>}>
          Minim sunt laborum adipisicing adipisicing proident Lorem ex irure id Lorem in. Nisi amet mollit nisi et id quis anim reprehenderit et quis. Ut dolor sit laboris aliquip officia id ullamco. Labore deserunt irure sint eiusmod dolor fugiat laboris ex et id pariatur veniam do. Reprehenderit adipisicing fugiat adipisicing duis ex commodo magna duis eu. Aute do consectetur consequat ut quis eiusmod veniam laborum in in. Qui nostrud ad culpa commodo aliquip mollit.
        </Card>
      </div>
      <div style={{ width: '320px' }}>
        <Card
          hideHeader
          footer={<div className='rnd-d-flex rnd-justify-end'><a href="#">Add To Cart</a></div>}>
          <div style={{ height: '250px', width: '100%', backgroundImage: `url(https://images.unsplash.com/photo-1659887347330-5bd7d335edaa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', borderRadius: '3px' }} />
          <div className='rnd-d-flex rnd-justify-between rnd-w-100' style={{marginTop: '5px'}}>
            <span><b>Product Bag</b></span><span>$50</span>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;
