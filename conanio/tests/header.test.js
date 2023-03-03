import { render, screen } from '@testing-library/react'
import { ConanHeader } from '@/components/header'

describe('ConanHeader Elements', () => {

  const test_elements = {
    banner: [""],
    link: ["Conan C++ Package Manager", "Search Search", "Conan-Center", "FAQ", "Docs", "Blog", "User Stories", "Github"],
    img: ["Conan C++ Package Manager", "Search", "Github"],
    button: [""],
    navigation: [""],
  }

  for (const key in test_elements){
    for (const element of test_elements[key]) {
      it(key + ' to:' + element, () => {
        render(<ConanHeader />)
        const expected = screen.getByRole(key, {
          name: element,
        })
        expect(expected).toBeInTheDocument()
      })
    }
  }
})
