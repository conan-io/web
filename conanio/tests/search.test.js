import { render, screen } from '@testing-library/react'
import ConanSearch from '@/pages/search'


describe('ConanFooter Elements', () => {
  const get_server_side_props_data = {
    packages: [
      {
        "info":{
           "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nibh est, suscipit vel convallis eget, euismod a leo. Vivamus sagittis mi non dui iaculis tincidunt. Aliquam metus risus, maximus sed tristique sed, vehicula at neque. Nam nunc metus, vestibulum id iaculis in, sodales et arcu. Nulla lorem enim, hendrerit sit.",
           "downloads":146,
           "labels":[
              "filter_1",
              "filter_2",
              "filter_3"
           ],
           "licenses":[
              "license_1",
              "license_2",
              "license_3"
           ],
           "version":"v3.0.3"
        },
        "name":"openssl"
     },
     {
        "info":{
           "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nibh est, suscipit vel convallis eget, euismod a leo. Vivamus sagittis mi non dui iaculis tincidunt. Aliquam metus risus, maximus sed tristique sed, vehicula at neque. Nam nunc metus, vestibulum id iaculis in, sodales et arcu. Nulla lorem enim, hendrerit sit.",
           "downloads":1064,
           "labels":[
              "filter_1",
              "filter_3",
              "filter_4"
           ],
           "licenses":[
              "license_1",
              "license_3",
              "license_4"
           ],
           "version":"v1.21.2"
        },
        "name":"zlib"
     },
     {
        "info":{
           "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nibh est, suscipit vel convallis eget, euismod a leo. Vivamus sagittis mi non dui iaculis tincidunt. Aliquam metus risus, maximus sed tristique sed, vehicula at neque. Nam nunc metus, vestibulum id iaculis in, sodales et arcu. Nulla lorem enim, hendrerit sit.",
           "downloads":100854,
           "labels":[
              "filter_1",
              "filter_4",
              "filter_5"
           ],
           "licenses":[
              "license_1",
              "license_4",
              "license_5"
           ],
           "version":"v1.79.0"
        },
        "name":"boost"
     },
     {
        "info":{
           "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nibh est, suscipit vel convallis eget, euismod a leo. Vivamus sagittis mi non dui iaculis tincidunt. Aliquam metus risus, maximus sed tristique sed, vehicula at neque. Nam nunc metus, vestibulum id iaculis in, sodales et arcu. Nulla lorem enim, hendrerit sit.",
           "downloads":14,
           "labels":[
              "filter_1",
              "filter_5",
              "filter_6"
           ],
           "licenses":[
              "license_1",
              "license_5",
              "license_6"
           ],
           "version":"system"
        },
        "name":"opengl"
      }
    ],
    defaultValue: '',
    defaultFilters: [],
    filters: [
      {id: 1, filter: "filter_1", checked: false},
      {id: 2, filter: "filter_2", checked: false},
      {id: 3, filter: "filter_3", checked: false},
      {id: 4, filter: "filter_4", checked: false},
      {id: 5, filter: "filter_5", checked: false},
      {id: 6, filter: "filter_6", checked: false},
    ],
    licenses: [
      {id: 1, filter: "license_1", checked: false},
      {id: 2, filter: "license_2", checked: false},
      {id: 3, filter: "license_3", checked: false},
      {id: 4, filter: "license_4", checked: false},
      {id: 5, filter: "license_5", checked: false},
      {id: 6, filter: "license_6", checked: false},
    ]
  }

   const test_elements = {
     checkbox: [
       "filter_1", "filter_2", "filter_3", "filter_4", "filter_5", "filter_6",
       "license_1", "license_2", "license_3", "license_4", "license_5", "license_6"
     ],
   }

   for (const key in test_elements){
     for (const element of test_elements[key]) {
       it(key + ' to:' + element, () => {
         render(<ConanSearch data={get_server_side_props_data}/>);
         const expected = screen.getByRole(key, {
           name: element,
         })
         expect(expected).toBeInTheDocument()
       })
     }
   }
})
