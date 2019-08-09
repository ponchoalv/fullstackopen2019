import React from 'react'
import { render } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'
import { fireEvent } from '@testing-library/react/dist'

test('components renders the title, author, and amount of likes for the blogpost', () => {
  const blog = {
    title:'Meaning of life',
    author : 'Monty Python',
    likes: 243,
  }

  const component = render(<SimpleBlog blog={blog} />)
  expect(component.container).toHaveTextContent(
    'Meaning of life Monty Python'
  )

  const likesDiv = component.container.querySelector('.likes')
  expect(likesDiv).toHaveTextContent(
    'blog has 243 likes'
  )
})

test('Clicking the button calls event handler, twice', () => {
  const blog = {
    title:'Meaning of life',
    author : 'Monty Python',
    likes: 243,
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')

  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})
