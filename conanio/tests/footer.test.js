import { render, screen } from '@testing-library/react'
import ConanFooter from '@/components/footer'

describe('ConanFooter Elements', () => {

  const test_elements = {
    contentinfo: [""],
    list: [""],
    link: ["twitter", "facebook", "slack", "github", "Download", "Conan-Center", "GitHub", "Docs", "Blog", "Privacy Policy", "Terms", "", "Github", "Twitter", "Facebook", "Slack #conan"],
    img: ["twitter", "facebook", "slack", "github"],
    heading: ["GET", "Resources", "Legal", "Social"],
  }

  for (const key in test_elements){
    for (const element of test_elements[key]) {
      it(key + ' to:' + element, () => {
        render(<ConanFooter />)
        const expected = screen.getByRole(key, {
          name: element,
        })
        expect(expected).toBeInTheDocument()
      })
    }
  }
})
