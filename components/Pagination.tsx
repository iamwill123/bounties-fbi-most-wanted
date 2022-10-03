import { Button } from '@chakra-ui/react'

export const Pagination = ({ currentPage, prevPage, nextPage, getPageBy }: any) => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: '10px',
      }}
    >
      {currentPage === 1 ? (
        <></>
      ) : (
        <Button
          colorScheme='gray'
          size='md'
          style={{ cursor: 'pointer', color: 'black' }}
          onClick={() => getPageBy(prevPage)}
        >
          Previous
        </Button>
      )}
      <Button
        colorScheme='gray'
        size='md'
        style={{ cursor: 'pointer', color: 'black' }}
        onClick={() => getPageBy(nextPage)}
      >
        Next
      </Button>
    </div>
  )
}
