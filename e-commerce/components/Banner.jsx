import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const Banner = ({ Banner:{ discount, largeText1, largeText2, saleTime, smallText, midText, desc, product, buttonText, image} }) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{Banner.smallText}</p>
        <h3>{midText}</h3>
        <h1>{largeText1}</h1>
        <img src={urlFor(image)} alt="headphones" className="hero-banner-image" />

        <div>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner