import React, { useEffect, useState } from "react";
import axios from "axios";
import Producto from "./componentes/Producto/Producto";
import Nav from "./componentes/Nav/Nav";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";
import CircularProgress from "@mui/material/CircularProgress";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(3);
  const [categoriaSel, setCategoriaSel] = useState("");
  const [cart, setCart] = useState([]);
  const [valueSlide, setValueSlide] = useState(3000);

  useEffect(() => {
    const buscarProductos = async () => {
      setCargando(false);
      const result = await axios("https://dummyjson.com/products"); //?skip=" + skip + "&limit=" + limit);
      setData(result.data);
      setCargando(true);
      //console.log("Result data", result.data);
    };

    const buscarCategorias = async () => {
      setCargando(false);
      const result = await axios("https://dummyjson.com/products/categories");
      setCategoria(result.data);
      setCargando(true);
      // console.log("Result Categories", result.data);
    };
    buscarProductos();
    buscarCategorias();
  }, []);

  useEffect(() => {
    const buscarProductos = async () => {
      setCargando(false);
      let url =
        "https://dummyjson.com/products?skip=" + skip + "&limit=" + limit;
      if (categoriaSel !== "") {
        url =
          "https://dummyjson.com/products/category/" +
          categoriaSel +
          "?skip=" +
          skip +
          "&limit=" +
          limit;
      }
      const result = await axios(url);
      setData(result.data);
      setCargando(true);
      // console.log("Result url", url);
    };
    buscarProductos();
  }, [skip]);

  const buscarProductosCategoria = async (cate) => {
    setCargando(false);
    setCategoriaSel(cate.target.value);
    setSkip(0);
    const result = await axios(
      "https://dummyjson.com/products/category/" +
        cate.target.value +
        "?skip=" +
        skip +
        "&limit=" +
        limit
      // `https://dummyjson.com/products/category/${cate}?skip=${skip}&limit${limit}`
    );
    setData(result.data);
    setCargando(true);
    console.log(
      "url: ",
      `https://dummyjson.com/products/category/${cate.target.value}?skip=${skip}&limit=${limit}`
    );
    console.log("Result data", result.data);
  };

  function back() {
    skip > 0 && setSkip(skip - 3);
  }

  function more() {
    setSkip(skip + 3);
  }

  function addToCart(id) {
    //console.log(data.products.filter(item=> item.id == id))
    let prod = data.products.filter((item) => item.id === id);
    //console.log("add prod", prod)
    const newProducto = [
      { desc: prod[0].title, qty: 1, unit: prod[0].price, id: prod[0].id },
      ...cart,
    ];
    setCart(newProducto);
    //console.log(newProducto);
  }
  function actualizoProductos(productos) {
    setCart(productos);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Nav updateCart={actualizoProductos} itemCart={cart}></Nav>
      </header>
      <div className="App-content">
        <aside className="App-aside">
          <Box sx={{ flexGrow: 1, display: { xs: "flex" }, m: "10px" }}>
            {/*  */}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Categorias</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="select-appbar"
                label="Categorias"
                value={categoriaSel}
                autoWidth
                onChange={(valor) => {
                  buscarProductosCategoria(valor);
                  console.log("valor", valor.target.value);
                }}
                sx={{
                  display: { xs: "block", color: "black" },
                }}
              >
                {categoria.map((item, index) => (
                  <MenuItem
                    value={item}
                    key={index}
                    sx={{ my: 2, display: "block", color: "black" }}
                  >
                    {item.toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ color: "black", m: "5px" }}>
            <span>Seleccione Precio Maximo</span>
          </Box>
          <Box fullWidth sx={{ width: "90%", m: "3%", mt: "40px" }}>
            <Slider
              aria-label="Small steps"
              defaultValue={3000}
              step={100}
              marks
              min={0}
              max={5000}
              valueLabelDisplay="on"
              onChange={(event, newValue) => {
                console.log("Cambio Slider", newValue);
                setValueSlide(newValue);
              }}
            />
          </Box>
        </aside>
        <section className="App-section">
          <h1>Productos</h1>
          {/* cargando - false */}
          {cargando ? (
            <>
              <div className="contenedor-productos">
                {data && data.products && data.products.length > 0 ? (
                  <>
                    {data.products
                      .filter((item) => item.price < valueSlide)
                      .map((item, index) => (
                        <div className="productos">
                          <Producto
                            key={index}
                            item={item}
                            addToCart={addToCart}
                          />
                        </div>
                      ))}
                  </>
                ) : (
                  <>No hay productos</>
                )}
              </div>
              <div className="contenedor-paginacion">
                <button className="boton" onClick={() => back()}>
                  Anterior
                </button>

                <button className="boton" onClick={() => more()}>
                  Proximo
                </button>
              </div>
            </>
          ) : (
            <>
              <div style={{ alignContent: "center", height: "400px" }}>
                <h1 style={{ padding: "20px" }}>Cargando...</h1>
                <Box
                  sx={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                    m: "20px",
                  }}
                >
                  <CircularProgress color="secondary" size="100px" thickness="5" />
                </Box>
              </div>
            </>
          )}
        </section>
      </div>
      <footer className="center">
        <span>Footer</span>
      </footer>
    </div>
  );
}

export default App;
