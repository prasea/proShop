import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { toast } from 'react-toastify'
import { useUpdateProductMutation, useGetProductsDetailsQuery } from '../../slices/productsApiSlice'
import { Form, Button } from 'react-bootstrap'

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState('')
  const [description, setDescription] = useState('')

  const { data: productToBeUpdated, isLoading, refetch, error } = useGetProductsDetailsQuery(productId)

  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

  const navigate = useNavigate();

  useEffect(() => {
    setName(productToBeUpdated?.name)
    setPrice(productToBeUpdated?.price)
    setImage(productToBeUpdated?.image)
    setBrand(productToBeUpdated?.brand)
    setCategory(productToBeUpdated?.category)
    setCountInStock(productToBeUpdated?.countInStock)
    setDescription(productToBeUpdated?.description)

  }, [productToBeUpdated])

  const submitHandler = async e => {
    e.preventDefault();
    const updatedProduct = {
      productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description
    }
    const result = await updateProduct(updatedProduct)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Product update')
      navigate('/admin/product-list')
    }
  }
  return (
    <>
      <Link to={`/admin/product-list`}>Go Back</Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}

        {isLoading ? <Loader /> : error ? (
          <Message variant={'danger'}>{error?.data?.message || error.error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='my-2'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' placeholder='Enter name' value={name} onChange={e => setName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='price' className='my-2'>
              <Form.Label>Price</Form.Label>
              <Form.Control type='number' placeholder='Enter price' value={price} onChange={e => setPrice(e.target.value)} />
            </Form.Group>

            {/* Image Input Plceholder */}

            <Form.Group controlId='brand' className='my-2'>
              <Form.Label>Brand</Form.Label>
              <Form.Control type='text' placeholder='Enter breand' value={brand} onChange={e => setBrand(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='countInStock' className='my-2'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control type='number' placeholder='Enter breand' value={countInStock} onChange={e => setCountInStock(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='category' className='my-2'>
              <Form.Label>Category</Form.Label>
              <Form.Control type='text' placeholder='Enter breand' value={category} onChange={e => setCategory(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='description' className='my-2'>
              <Form.Label>description</Form.Label>
              <Form.Control type='text' placeholder='Enter breand' value={description} onChange={e => setDescription(e.target.value)} />
            </Form.Group>
            <Button type='submit' variant='primary' className='my-2'>Update</Button>

          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen