import { Fragment, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [listProductos, setListProductos] = useState([
    { id: 1, nombre: 'Parlante ', precio: 12500, cantidad: 5 },
    { id: 2, nombre: 'Cargador v8', precio: 1000, cantidad: 3 },
    { id: 2, nombre: 'Microfono', precio: 5000, cantidad: 3 },
  ]);

  const [inputNombre, setInputNombre] = useState('');
  const [inputPrecio, setInputPrecio] = useState('');
  const [inputCantidad, setInputCantidad] = useState('');

  const agregarProducto = () => {
    if (inputNombre !== '' && inputPrecio !== '' && inputCantidad !== '') {
      const nuevoProducto = {
        id: Date.now(),
        nombre: inputNombre,
        precio: parseFloat(inputPrecio),
        cantidad: parseInt(inputCantidad)
      };
      setListProductos([...listProductos, nuevoProducto]);
      setInputNombre('');
      setInputPrecio('');
      setInputCantidad('');
    }
  };

  const eliminarProducto = (id) => {
    setListProductos(listProductos.filter(producto => producto.id !== id));
  };

  return (
    <Fragment>
      <h2>Listado de Productos</h2>
      <form>
        <label>Nombre:</label>
        <input type="text" value={inputNombre} onChange={(e) => setInputNombre(e.target.value)} />
        <br />
        <label>Precio:</label>
        <input type="number" value={inputPrecio} onChange={(e) => setInputPrecio(e.target.value)} />
        <br />
        <label>Cantidad:</label>
        <input type="number" value={inputCantidad} onChange={(e) => setInputCantidad(e.target.value)} />
        <br />
        <button onClick={agregarProducto}>Agregar Producto</button>
      </form>

      <ul>
        {listProductos.map((producto, key) => (
          <li key={producto.id}>
            <h4>{producto.nombre}</h4>
            <p>Precio: ${producto.precio}</p>
            <p>Cantidad: {producto.cantidad}</p>
            <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default App;