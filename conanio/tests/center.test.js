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
      {filter: "filter_1", checked: false},
      {filter: "filter_2", checked: false},
      {filter: "filter_3", checked: false},
      {filter: "filter_4", checked: false},
      {filter: "filter_5", checked: false},
      {filter: "filter_6", checked: false},
    ],
  }

   const test_elements = {
     checkbox: ["filter_1", "filter_2", "filter_3", "filter_4", "filter_5", "filter_6"],
   }

   for (const key in test_elements){
     for (const element of test_elements[key]) {
       it(key + ' to:' + element, () => {
         render(<Center data={get_server_side_props_data}/>);
         const expected = screen.getByRole(key, {
           name: element,
         })
         expect(expected).toBeInTheDocument()
       })
     }
   }
})
