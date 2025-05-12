import { render, screen } from '@testing-library/react'
import { ConanHome } from '@/components'

describe('ConanHome Elements', () => {

  const test_elements = {
    img: [
      "Conan C++ Package Manager",
      // "Meet The Tribe"
    ],
    heading: [
      "Conan, software package manager for C and C++ developers",
      "The open source, decentralized and multi-platform package manager to create and share all your native binaries.",
      "Conan is universal and portable.",
      "Conan is open source and completely free.",
      "Artifactory Community Edition for C and C++",
      "ConanCenter, the place to find and share popular C and C++ Conan packages",
      // "Meet the CONAN 2.0 TRIBE",
      "CUSTOMER SUCCESS STORIES",
      "OUR USERS"
    ],
    link: ["Download"],
  }

  for (const key in test_elements){
    for (const element of test_elements[key]) {
      it(key + ' --> ' + element, () => {
        render(<ConanHome />)
        const expected = screen.getByRole(key, {
          name: element,
        })
        expect(expected).toBeInTheDocument()
      })
    }
  }

});
