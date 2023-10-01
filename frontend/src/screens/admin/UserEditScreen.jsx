import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { toast } from 'react-toastify'
import { useGetUsersDetailsQuery, useUpdateUserMutation } from '../../slices/usersApiSlice'
import { Form, Button } from 'react-bootstrap'

const UserEditScreen = () => {
  const { id: userId } = useParams();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const navigate = useNavigate();

  const { data: userToBeUpdated, isLoading, refetch, error } = useGetUsersDetailsQuery(userId)

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userToBeUpdated?.name)
    setEmail(userToBeUpdated?.email)
    setIsAdmin(userToBeUpdated?.isAdmin)
  }, [userToBeUpdated])

  const submitHandler = async e => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin })
      toast.success('User updated successfully')
      refetch();
      navigate('/admin/user-list')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }


  return (
    <>
      <Link to={`/admin/user-list`}>Go Back</Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}

        {isLoading ? <Loader /> : error ? (
          <Message variant={'danger'}>{error?.data?.message || error.error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='my-2'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' placeholder='Enter name' value={name} onChange={e => setName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='email' className='my-2'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group>
              <Form.Check type='checkbox' label='Is Admin' checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} />
            </Form.Group>

            <Button type='submit' variant='primary' className='my-2'>Update</Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen