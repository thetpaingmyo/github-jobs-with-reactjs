import React, { useState } from 'react'
import { Card, Badge, Button, Collapse } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'

const Job = ({job}) => {
  const [open, setOpen] = useState(false)

  const clickHandler = () => {
    setOpen(prev => !prev)
  }

  const style = {
    wordBreak: 'break-all',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word'
  }

  return (
    <Card>
      <Card.Body>
        <div className='d-flex justify-content-between'>
          <div>
            <Card.Title>
              {job.title} - <span className='text-muted font-weight-light'>{job.company}</span>
            </Card.Title>
            <Card.Subtitle className='text-muted mb-2' style={style}>
              {new Date(job.created_at).toLocaleDateString()}
            </Card.Subtitle>
            <Badge variant='secondary' className='mr-2'>{job.type}</Badge>
            <Badge variant='secondary' style={style}>{job.location}</Badge>
            <div style={style}>
              <ReactMarkdown source={job.how_to_apply} />
            </div>
          </div>
          <img className='d-none d-md-block' height='50' src={job.company_logo} alt={job.company} />
        </div> 
        <Card.Text>
          <Button onClick={clickHandler} variant='primary'>{open ? 'Hide Details' : 'View Details'}</Button>
        </Card.Text>
        <Collapse in={open}>
          <div className='mt-4'>
            <ReactMarkdown source={job.description} />
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  )
}

export default Job
