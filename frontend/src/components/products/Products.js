import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

const products = [
  {
    id: 1,
    name: 'Samsung Galaxy S23 Ultra',
    price: 'Ksh. 189,999',
    image: 'https://images.samsung.com/is/image/samsung/p6pim/africa_en/2302/gallery/africa-en-galaxy-s23-ultra-s918-sm-s918bzkcafr-thumb-534877068',
    description: '512GB Storage, 12GB RAM, 200MP Camera',
    category: 'Smartphones'
  },
  {
    id: 2,
    name: 'MacBook Pro 16"',
    price: 'Ksh. 299,999',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spacegray-select-202301?wid=452&hei=420&fmt=jpeg&qlt=95&.v=1671304673202',
    description: 'M2 Pro, 32GB RAM, 1TB SSD',
    category: 'Laptops'
  },
  {
    id: 3,
    name: 'Sony WH-1000XM4',
    price: 'Ksh. 44,999',
    image: 'https://www.sony.com/image/5d02da5df552836db894cead8a68f5f3?fmt=png-alpha&wid=440',
    description: 'Wireless Noise Cancelling Headphones',
    category: 'Audio'
  },
  {
    id: 4,
    name: 'iPad Pro 12.9"',
    price: 'Ksh. 159,999',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-select-wifi-spacegray-202104?wid=470&hei=556&fmt=png-alpha&.v=1617126613000',
    description: 'M2 Chip, 256GB Storage, Wi-Fi + Cellular',
    category: 'Tablets'
  },
  {
    id: 5,
    name: 'Canon EOS R5',
    price: 'Ksh. 399,999',
    image: 'https://static.bhphoto.com/images/images500x500/canon_eos_r5_mirrorless_digital_1594282826_1547009.jpg',
    description: '45MP Full-Frame Mirrorless Camera',
    category: 'Cameras'
  },
  {
    id: 6,
    name: 'Apple Watch Series 8',
    price: 'Ksh. 69,999',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQDY3ref_VW_34FR+watch-45-alum-midnight-nc-8s_VW_34FR_WF_CO?wid=750&hei=712&trim=1,0&fmt=p-jpg&qlt=95&.v=1683224241054',
    description: 'GPS + Cellular, 45mm Aluminum Case',
    category: 'Wearables'
  }
];

const Products = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
        Featured Products
      </Typography>
      
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)'
                }
              }}
            >
              <CardMedia
                component="img"
                height="250"
                image={product.image}
                alt={product.name}
                sx={{ 
                  objectFit: 'contain',
                  padding: 2,
                  backgroundColor: '#f8f9fa'
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography 
                  gutterBottom 
                  variant="h6" 
                  component="h2"
                  sx={{ 
                    fontWeight: 600,
                    minHeight: '64px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {product.name}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    mb: 2,
                    minHeight: '40px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {product.description}
                </Typography>
                <Typography 
                  variant="h6" 
                  color="primary"
                  sx={{ 
                    fontWeight: 600,
                    mb: 2
                  }}
                >
                  {product.price}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    component={Link}
                    to={`/product/${product.id}`}
                    variant="contained"
                    fullWidth
                    sx={{ 
                      background: 'linear-gradient(45deg, #2C3E50 30%, #34495E 90%)',
                      color: 'white',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #34495E 30%, #2C3E50 90%)'
                      }
                    }}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ 
                      minWidth: 'auto',
                      background: 'linear-gradient(45deg, #E74C3C 30%, #EC7063 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #EC7063 30%, #E74C3C 90%)'
                      }
                    }}
                  >
                    <ShoppingCart />
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;
