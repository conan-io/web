import { render, screen } from '@testing-library/react'
import { ConanCenterHeader } from '@/components'

describe('ConanCenterHeader Elements', () => {

  const test_elements = {
    banner: [""],
    link: [
      "Conan C++ Package Manager",
      "Downloads",
      "ConanCenter",
      "FAQ",
      "Docs",
      "Blog",
      "Github"
    ],
    img: [
      "Conan C++ Package Manager",
      "Github"
    ],
  }

  for (const key in test_elements){
    for (const element of test_elements[key]) {
      it(key + ' --> ' + element, () => {
        render(<ConanCenterHeader />)
        const expected = screen.getByRole(key, {
          name: element,
        })
        expect(expected).toBeInTheDocument()
      })
    }
  }

})
