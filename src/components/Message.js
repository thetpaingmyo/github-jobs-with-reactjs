import React from 'react'
import { Alert, Container } from 'react-bootstrap'

const Message = ({ variant, children }) => {
  return (
    <Container className='mt-5 text-center w-50'>
      <Alert variant={variant}>
        {children}
      </Alert>
    </Container>
  )
}

Message.defaultProps = {
  variant: 'info',
}

export default Message