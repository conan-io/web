import { render, screen } from '@testing-library/react'
import { ConanHome } from '@/components'

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
    img: [
      {
        name: "Conan C++ Package Manager",
        values: [
          "/hero-bg.svg",
          "/lm-bg.svg",
        ],
      }
    ],
    link: [
      {
        name: "Learn More >",
        values: [
          "https://docs.conan.io/en/latest/introduction.html",
          "https://docs.conan.io/en/latest/uploading_packages/artifactory/artifactory_ce.html",
          "https://conan.io/center/",
        ]
      },
    ],
  }

  test_multi_elements.img.forEach((element) => {
    it('imgs to: ' + element.name, () => {
      render(<ConanHome />)
      element.values.forEach((value, index, array) => {
        let img = screen.getAllByAltText(element.name)[index];
      expect(img.src).toContain(value);
      });
    });
  });

  test_multi_elements.link.forEach((element) => {
    it('links to: ' + element.name, () => {
      render(<ConanHome />)
      element.values.forEach((value, index, array) => {
        let link = screen.getAllByText(element.name)[index];
        expect(link.href).toContain(value);
      });
    });
  });
});
