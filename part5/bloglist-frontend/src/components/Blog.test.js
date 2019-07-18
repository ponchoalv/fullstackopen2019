import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

  let component

  beforeEach(() => {

    const user = {
      username: 'poncho',
      name: 'poncho alvarez'
    }

    const blog = {
      title:'Meaning of life',
      author : 'Monty Python',
      likes: 243,
      url: 'http://poncho.com',
      user: user
    }

    component = render(<Blog blog={blog} user={user} />)
  })

  test('renders only name and author', () => {
    expect(component.container).toHaveTextContent(
      'Meaning of life Monty Python'
    )

    expect(component.container).not.toHaveTextContent(
      '243 likes'
    )

    expect(component.container).not.toHaveTextContent(
      'http://poncho.com'
    )

    expect(component.container).not.toHaveTextContent(
      'added by poncho alvarez'
    )
  })

  test('after clicking the button, details are displayed', () => {
    const togglableDiv = component.container.querySelector('.togglableTitle')
    fireEvent.click(togglableDiv)

    expect(component.container).toHaveTextContent(
      'Meaning of life Monty Python'
    )

    expect(component.container).toHaveTextContent(
      '243 likes'
    )

    expect(component.container).toHaveTextContent(
      'http://poncho.com'
    )

    expect(component.container).toHaveTextContent(
      'added by poncho alvarez'
    )
  })
})