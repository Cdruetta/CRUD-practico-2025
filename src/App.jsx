import { Fragment, useState, useEffect } from 'react';
import logo from './assets/logo.png';
import './App.css';

function App() {
  const productosIniciales = [
    { id: 1, nombre: 'Parlante', precio: 12500, cantidad: 5 },
    { id: 2, nombre: 'Cargador v8', precio: 1000, cantidad: 3 },
    { id: 3, nombre: 'Microfono', precio: 5000, cantidad: 3 },
  ];

  const obtenerProductos = () => {
    const productosGuardados = localStorage.getItem('productos');
    return productosGuardados ? JSON.parse(productosGuardados) : productosIniciales;
  };

  const [listProductos, setListProductos] = useState(obtenerProductos);
  const [inputNombre, setInputNombre] = useState('');
  const [inputPrecio, setInputPrecio] = useState('');
  const [inputCantidad, setInputCantidad] = useState('');
  const [productoEditando, setProductoEditando] = useState(null);

  useEffect(() => {
    localStorage.setItem('productos', JSON.stringify(listProductos));
  }, [listProductos]);

  const agregarProducto = (e) => {
    e.preventDefault();
    if (inputNombre !== '' && inputPrecio !== '' && inputCantidad !== '') {
      const nuevoProducto = {
        id: Date.now(),
        nombre: inputNombre,
        precio: parseFloat(inputPrecio),
        cantidad: parseInt(inputCantidad),
      };
      setListProductos([...listProductos, nuevoProducto]);
      limpiarFormulario();
    }
  };

  const editarProducto = (producto) => {
    setProductoEditando(producto);
    setInputNombre(producto.nombre);
    setInputPrecio(producto.precio.toString()); // Asegurar que es string
    setInputCantidad(producto.cantidad.toString()); // Asegurar que es string
  };

  const actualizarProducto = (e) => {
    e.preventDefault();
    setListProductos(
      listProductos.map((producto) =>
        producto.id === productoEditando.id
          ? { ...producto, nombre: inputNombre, precio: parseFloat(inputPrecio), cantidad: parseInt(inputCantidad) }
          : producto
      )
    );
    limpiarFormulario();
  };

  const eliminarProducto = (id) => {
    const nuevaLista = listProductos.filter(producto => producto.id !== id);
    setListProductos(nuevaLista);
  };

  const limpiarFormulario = () => {
    setInputNombre('');
    setInputPrecio('');
    setInputCantidad('');
    setProductoEditando(null);
  };

  const eliminarTodos = () => {
    setListProductos([]); //Establecer la lista de productos como vacía
    localStorage.setItem('productos', JSON.stringify([])); // Actualizar el almacenamiento local'[]');
  };

  return (
    <Fragment>
      <header className="header">
        <img src={logo} alt="Logo del negocio" className="logo" />
        <h2>GC insumos</h2>
      </header>

      <h3>{productoEditando ? 'Editar Producto' : 'Agregar Producto'}</h3>
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
        {productoEditando ? (
          <>
            <button type="button" className="boton-actualizar" onClick={actualizarProducto}>Actualizar Producto</button>
            <button type="button" className="boton-cancelar" onClick={limpiarFormulario}>Cancelar</button>
          </>
        ) : (
          <button type="button" className="boton-agregar" onClick={agregarProducto}>Agregar Producto</button>
        )}
      </form>

      <h3>Listado de Productos</h3>
      <ul>
        {listProductos.map((producto) => (
          <li key={producto.id} className="producto-item">
            <span>{producto.nombre}</span>
            <span>${producto.precio}</span>
            <span>Cantidad: {producto.cantidad}</span>
            <button className="boton-editar" onClick={() => editarProducto(producto)}>Editar</button>
            <button className="boton-eliminar" onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <button className='boton-eliminar-todos' onClick={eliminarTodos}>Eliminar todos</button>
    </Fragment>
  );
}

export default App;
