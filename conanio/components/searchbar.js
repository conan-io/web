import { useState, useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck';
import Button from 'react-bootstrap/Button';
import Select from "react-select";
import { LuPackageSearch } from "react-icons/lu";
import { BiPackage } from "react-icons/bi";
import { PiNoteBold } from "react-icons/pi";
import { CgFormatSlash } from "react-icons/cg";

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
      borderRadius: "40px",
      paddingLeft: "20px",
      "&:hover": {
        borderColor: "#21AFFF"
      }
    }),
    multiValue: (defaultStyles, { data }) => {
      return {
        ...defaultStyles,
        borderRadius: "0.25rem",
        backgroundColor: "#EDF7FF",
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: "#21AFFF",
      ':hover': {
        backgroundColor: data.color,
        color: 'white',
      },
    }),
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
            <LuPackageSearch className="conanLogo"/>
          </Button>
      </Row>
      {(props.recipes || props.references) && <Row className="justify-content-md-center mt-2" lg="2">
        <div className="text-center" style={{color: '#21AFFF'}}>
          <PiNoteBold className="conanIconBlue"/>
          {props.recipes} recipes
          <CgFormatSlash style={{height: '36px'}} className="conanIconBlue"/>
          <BiPackage className="conanIconBlue"/>
          {props.references} references
        </div>
      </Row>}
    </div>
  )
}
