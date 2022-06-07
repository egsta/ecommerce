
import * as React from "react";
import Card from "@mui/material/Card";
import Button from '@mui/material/Button'
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
//import './Producto.css';

export default function Producto(props) {
  const { item } = props;
 
  function agregarProducto(producto){
    //console.log(producto)
    props.addToCart(producto)
  }
  
  return (
    <Card sx={{ width: 300, height: 600 }}>
      <CardHeader sx={{ flexDirection: "column",
                flexWrap: "nowrap",
                alignContent: "flex-start",
                justifyContent: "flex-start"
                , height: 100 }} 
  
        title={
          <Typography variant="h5" color="textSecondary">
            {item.title.toUpperCase()}
          </Typography>
        }
       
      />
       <CardHeader sx={{ flexDirection: "column",
                flexWrap: "nowrap",
                alignContent: "flex-start",
                justifyContent: "flex-end"
                , height: 50 }} 
       
        subheader={
          <Typography variant="h5" 
                      color="textPrimary" 
                      borderRadius="3px" 
                      border="1px solid" 
                      borderColor="black" p="3px">
          USD{item.price}
        </Typography>
        }
      />
      <CardMedia sx={{ height:200}}
        component="img"
        height="200"
        image={item.images[0]}
        alt="Foto Producto"
      />
      <CardContent  sx={{ height:80}}>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </CardContent>
      
      <CardActions  sx={{justifyContent: "space-between"}} >
        <div>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        </div>
        <div>
        <Button size="small" variant="outlined" color="primary" onClick={()=> {agregarProducto(item.id)}}>
          Comprar
        </Button>
        </div>
      </CardActions>
    </Card>
  );
}
