import { render, screen } from '@testing-library/react'
import { ConanFooter } from '@/components'

describe('ConanFooter Elements', () => {

  const test_elements = {
    link: [
      "Downloads",
      "ConanCenter",
      "GitHub",
      "Docs",
      "Blog",
      "FAQ",
      "Privacy Notice",
      "Terms",
      "Cookies Settings",
      "x",
      "slack",
      "github"
    ],
    img: ["x", "slack", "github"]
  }

  for (const key in test_elements){
    for (const element of test_elements[key]) {
      it(key + ' --> ' + element, () => {
        render(<ConanFooter />)
        const expected = screen.getByRole(key, {
          name: element,
        })
        expect(expected).toBeInTheDocument()
      })
    }
  }
})
