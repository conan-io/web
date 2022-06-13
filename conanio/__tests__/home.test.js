import { render, screen } from '@testing-library/react'
import ConanHome from '@/components/home'

describe('ConanHome Elements', () => {

  const test_elements = {
    img: ["Meet The Tribe", "UNIVERSALITY", "Sign Up"],
    heading: ["Conan, the C/C++ Package Manager", "The open source, decentralized and multi-platform package manager to create and share all your native binaries.", "Meet the CONAN 2.0 TRIBE", "UNIVERSALITY", "FLEXIBILITY & SPEED", "CONTROL", "CONAN", "ARTIFACTORY CE", "CONAN CENTER"],
    link: ["Download", "Learn Conan C / C++ Package Management JFrog Academy JFrog Academy JFrog Academy Join our hands-on free training", "ConanCenter"],
    separator: [""],
  }

  for (const key in test_elements){
    for (const element of test_elements[key]) {
      it(key + ' to:' + element, () => {
        render(<ConanHome />)
        const expected = screen.getByRole(key, {
          name: element,
        })
        expect(expected).toBeInTheDocument()
      })
    }
  }

  const test_multi_elements = {
    img: ["Conan C++ Package Manager", "JFrog Academy", "Conan C/C++ Package Manager Decentralized Architecture", "FLEXIBILITY & SPEED"],
    link: ["Download", "Learn Conan C / C++ Package Management JFrog Academy JFrog Academy JFrog Academy Join our hands-on free training", "ConanCenter"],
  }
})
