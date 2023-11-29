import { getProductById } from '@/lib/actions'
import React from 'react'
interface Props {
    params: {id: string}
}
const ProductDetails = async ({ params: {id} }: Props) => {
    const product = await getProductById(id);

  return (
    <div>{product._id}</div>
  )
}

export default ProductDetails