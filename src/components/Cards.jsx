import * as React from 'react';
// import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
// import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import { red } from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

const Hotelcard=(props)=> {
  // const [expanded, setExpanded] = React.useState(false);

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

  return (
    <Card sx={{ width:'320px',height:'330px',borderRadius:'20px', transition:'0.5s' ,'&:hover':{transform:'scale(1.05)'} }}>
      
      <CardMedia
        component="img"
        height="210px"
        image="./images/harikrushna.jpeg"
        alt="Paella dish"
      />
      <CardHeader sx={{padding:'7px',paddingBottom:'0px',paddingLeft:'15px', fontSize:'15px'}}
       
        title={
        <Grid container sx={{height:'30px'}}>
          <Grid sx={{}} xs={8} >
            <Typography variant="h6" fontWeight="700" sx={{width:'300px',fontSize:'20px'}}>
              {props.name}
            </Typography>
          </Grid>
          <Grid sx={{ paddingLeft: "14%" }} xs={4} >
            <Fab sx={{ boxShadow: "none",transform:'scale(0.8)' }} color="primary" aria-label="add">
              <Typography variant="h7" fontWeight="700" fontSize="20px"  >
                {props.rating}
              </Typography>
            </Fab>
          </Grid>

        </Grid>
        }
        subheader={props.location}
      />
      <CardContent sx={{padding:'3px',paddingLeft:'15px'}}>
        <Typography variant="body2" color="text.secondary" sx={{width:'200px',padding:'0px'}}>
          Flat <span style={{ color: "#2A88DF" }} > {props.discount} </span> off on total bill
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{textAlign:'right', marginRight:'13px', marginTop:'5px'}}>
          <span style={{ color: "#2A88DF", fontSize:'15px', fontWeight:'bold'}} > {props.special} </span>
        </Typography>
      </CardContent>
     
      
    </Card>
  );
}
export default Hotelcard;