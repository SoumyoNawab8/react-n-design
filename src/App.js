import React,{useEffect,useState} from 'react';
import { Card,Button } from './components';
import "./App.scss";

function App() {

  const [loading,setLoading]=useState(false);

  useEffect(()=>{
    if(loading) {
      setTimeout(()=>{
        setLoading(false)
      },2000)
    }
  },[loading])

  return (
    <div style={{ backgroundColor: '#e4e4e4', height: '100vh', width: '100%', margin: '1px' }} className="rnd-d-flex">
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
          className="test-product"
          disableBorder
          loading={loading}
          customFooter={<div className='rnd-d-flex rnd-justify-end'>
            <Button onClick={()=>{setLoading(true)}}>Add To Cart</Button>
            </div>}>
          <div style={{ height: '250px', width: '100%', backgroundImage: `url(https://images.unsplash.com/photo-1659887347330-5bd7d335edaa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
          <div style={{ marginTop: '10px', padding: '5px 15px' }}>
            <div className='rnd-d-flex rnd-justify-between rnd-w-100'>
              <span><b>Product Bag</b></span><span>$50</span>
            </div>
          </div>

        </Card>
      </div>
      <div style={{ width: '400px',padding:'1rem' }}>
      <Button onClick={()=>{}}>Primary</Button>
      <Button onClick={()=>{}} type="danger">Danger</Button>
      <Button onClick={()=>{}} type="primary" rounded>Primary Rounded</Button>
      </div>
    </div>
  );
}

export default App;
