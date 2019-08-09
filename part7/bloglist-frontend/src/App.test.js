import React from 'react'
import {
  render, waitForElement
} from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    expect(component.container).toHaveTextContent(
      'Log in to application'
    )
  })

  test('if the user is logged, blogs are rendered', async () => {
    const user = {
      username: 'poncho',
      token: '123123213123123123',
      name: 'Poncho Alvarez'
    }

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(
      <App />
    )

    await waitForElement(
      () => component.getByText('logout')
    )

    expect(component.container).toHaveTextContent(
      'Poncho Alvarez logged in'
    )
    expect(component.container).toHaveTextContent(
      'Canonical string reduction Edsger W. Dijkstra'
    )
    expect(component.container).toHaveTextContent(
      'Go To Statement Considered Harmful Edsger W. Dijkstra'
    )
    expect(component.container).toHaveTextContent(
      'React patterns Michael Chan'
    )
    expect(component.container).toHaveTextContent(
      'First class tests Robert C. Martin'
    )
    expect(component.container).toHaveTextContent(
      'TDD harms architecture Robert C. Martin'
    )
    expect(component.container).toHaveTextContent(
      'Type wars Robert C. Martin'
    )
  })
})