import React from 'react'
import { Product,FooterBanner,Banner} from '../components'
import {client} from '../Lib/client'
const index = ({products,bannerData}) => {
  return (
    <div>
      <Banner Banner={bannerData.length && bannerData[0]}/>
       <div className='products-heading'>
      <h2>Best Sellers</h2>
      <p>Clothing variations</p>
    </div>
    <div className='products-container'>
    {products?.map((product) => <Product key={product._id} product={product} />)}
    </div>
    <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>  
  )
}

export const getServerSideProps =async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);
  return {
    props:{products,bannerData}
  }
  
}
export default index