import { useState, useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck';
import Button from 'react-bootstrap/Button';
import Select from "react-select";
import { AiOutlineFileSearch } from "react-icons/ai";
import { BiPackage } from "react-icons/bi";

function ConanFilter(props) {
  const [checked, setChecked] = useState(props.checked);

  const handleChange = () => {
    props.handleFilter(props.filter, props.filter_id, !checked)
    setChecked(!checked)
  }

  return(
    <Form.Check
      inline
      label={props.filter}
      type="checkbox"
      id={"custom-inline-checkbox-" + props.filter}
      checked={checked}
      onChange={handleChange}
    />
  )
}

export function ConanListFilter(props) {
  return(
    <div key="custom-inline-checkbox" className="mb-3">
    {props.filters && props.filters.map((info) => (<Row key={info.id} style={{marginLeft: 15}}><ConanFilter filter_id={info.id} filter={info.filter} checked={info.checked} handleFilter={props.handleFilter}/></Row>))}
    </div>
    )
}

export function ConanMultiSelectFilter(props) {
  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
    }),

    dropdownIndicator: (defaultStyles) => ({
      ...defaultStyles,
      color: "#21AFFF"
    }),

    control: (defaultStyles) => ({
      ...defaultStyles,
      borderColor: "#21AFFF",
      borderRadius: "40px 40px 40px 40px",
      "&:hover": {
        borderColor: "#21AFFF"
      }
    })
  };
  return(
    <div className="w-100">
      <Select
        styles={customStyles}
        isMulti
        placeholder={props.title}
        onChange={props.handleFilter}
        options={props.filters.map(elem => {return {label: elem.filter, value: elem.id};})} />
    </div>
  )
}

export function ConanSearchBar(props) {
  return (
    <div>
      <Row className="justify-content-md-center" lg="2">
          <Form.Control className="searchbarConan" type="text" placeholder="Search..." value={props.value} onChange={(e) => props.handleChange(e.target.value)}/>
          <Button className="searchButtonConan" type="submit">
            <AiOutlineFileSearch className="conanLogo"/>
          </Button>
      </Row>
      {props.data_to_show && <Row className="justify-content-md-center mt-2 mb-2" lg="2">
        <BiPackage className="conanIconBlue"/>
        <div>
          {props.data_to_show} references
        </div>
      </Row>}
    </div>
  )
}
