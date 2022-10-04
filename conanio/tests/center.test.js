import { render, screen } from '@testing-library/react'
import Center from '@/pages/center'


describe('ConanFooter Elements', () => {
  const get_server_side_props_data = {
    popular: [
      {"name": "openSSL", "version": "v3.0.3"},
      {"name": "zlib", "version": "v1.21.2"},
      {"name": "boost", "version": "v1.79.0"},
      {"name": "OpenGL", "version": "system"}
    ],
    updated: [
      {"name": "openSSL", "version": "v3.0.3"},
      {"name": "zlib", "version": "v1.21.2"}
    ],
    new: [
      {"name": "boost", "version": "v1.79.0"},
      {"name": "OpenGL", "version": "system"}
    ],
    filters: [
      {id: 1, filter: "filter_1", checked: false},
      {id: 2, filter: "filter_2", checked: false},
      {id: 3, filter: "filter_3", checked: false},
      {id: 4, filter: "filter_4", checked: false},
      {id: 5, filter: "filter_5", checked: false},
      {id: 6, filter: "filter_6", checked: false},
    ],
  }

   const test_elements = {
     link: ["openSSL/v3.0.3", "zlib/v1.21.2", "boost/v1.79.0", "OpenGL/system", "openSSL", "zlib", "boost/v1.79.0", "OpenGL/system"],
   }



   for (const key in test_elements){
     for (const element of test_elements[key]) {
       it(key + ' to:' + element, () => {
         render(<Center data={get_server_side_props_data}/>);
         const expected = screen.getAllByRole(key, {
           name: element,
         })
         for (const expt of expected) { expect(expt).toBeInTheDocument() }
       })
     }
   }
})
