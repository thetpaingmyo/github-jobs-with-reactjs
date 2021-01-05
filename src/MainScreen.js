import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import useGetJobs from './customHook/useGetJobs'
import Loader from './components/Loader'
import Message from './components/Message'
import Job from './components/Job'
import JobsSearchForm from './components/JobsSearchForm'
import JobsPagination from './components/JobsPagination'

const MainScreen = () => {
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)
  const { jobs, loading, error, hasNextPage } = useGetJobs(params, page)

  const handleParamChange = e => {
    const param = e.target.name
    const value = e.target.value
    setPage(1)
    setParams(prev => {
      return { ...prev, [param]: value }
    })
  }

  return (
    <Container className='my-4'>
    <h1 className='mb-4'>GitHub Jobs</h1>
    <JobsSearchForm params={params} onParamChange={handleParamChange} />
    <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {loading ? <Loader /> : 
      error ? <Message variant='danger'>An error occurred. Please try refreshing again.</Message> : 
      (jobs.map(job => (
        <Job key={job.id} job={job} />
      )))
      }
    <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  )
}

export default MainScreen
