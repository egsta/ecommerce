import  React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const TAX_RATE = 0.21;
let rows = [];
function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit, id) {
  const price = priceRow(qty, unit);
  console.log("create row", desc, qty, unit, id, price)
  return { desc: desc, qty:qty, unit:unit, price:price, id:id };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}


export default function ListaCart(props) {
  
  const productos = props.productos

     rows = productos.map(item =>{
        return createRow( item.desc, item.qty, item.unit,  item.id)},   
    );

    const invoiceSubtotal = subtotal(rows);
    const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    const invoiceTotal = invoiceTaxes + invoiceSubtotal;

    function agregarCantidad(indexid){
    
      rows.map((item, index) =>{
          if(index === indexid){
            item.qty++;
          }
      })
      props.updateCart(rows)
  
  }
  
  function decrementarCantidad(indexid){
    rows.map((item, index) =>{
      if(index === indexid){
        item.qty  > 1 && item.qty--;
      }
  })
      props.updateCart(rows)
      console.log(rows)
  }

  function borrarProducto(indexid){
 
      (indexid === 0 && rows.length === 1) ? props.updateCart([]) : 
      props.updateCart(rows.filter((item, index) => index !== indexid));
      console.log("borrar", rows, "indexid", indexid)

  }

  return (
    <TableContainer  component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>Detalles</TableCell>
            <TableCell align="center" colSpan={4}>Precio</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="center">Suma.</TableCell>
            <TableCell align="center">Cantidad.</TableCell>
            <TableCell align="center">Resta.</TableCell>
            <TableCell align="right">Unidad</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Accion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.desc}</TableCell>
              <TableCell><Button align="center" variant="outlined" color="success"
                              onClick={()=> agregarCantidad(index)}>+</Button></TableCell>
              <TableCell align="center">{row.qty}</TableCell>
              <TableCell><Button align="center" variant="outlined" color="success"
                              onClick={()=> decrementarCantidad(index)}>-</Button></TableCell>
              <TableCell align="right">{row.unit}</TableCell>
              <TableCell align="right">{ccyFormat(row.price)}</TableCell>
              <TableCell><Button align="center"  color="success"
                              onClick={()=> borrarProducto(index)}>
                              < DeleteIcon className="tarea-icono" style={{color: "red"}}/>
                              </Button></TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Impuestos</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}


