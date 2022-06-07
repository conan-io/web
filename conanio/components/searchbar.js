import { useState, useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck';
import Button from 'react-bootstrap/Button';

function ConanFilter(props) {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    props.handleFilter(props.filter, !checked)
    setChecked(!checked)
  }

  return(
    <Form.Check
      inline
      label={props.filter}
      type="checkbox"
      id={"custom-inline-checkbox-" + props.filter}
      onChange={handleChange}
    />
  )
}

export function ConanListFilter(props) {
  const [value, setValue] = useState('');
  const [filters, setFilters] = useState([]);
  const [allFilters, setAllFilters] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    props.handleFilter(props.filter, !checked)
    setChecked(!checked)
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${encodeURI(process.env.conanioServer)}/${encodeURIComponent(props.api)}`);
        if (!response.ok) {
          console.log(response.status)
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();
        var filters = [];
        Object.keys(actualData).forEach(function(key) {
          filters.push(actualData[key]);
        });
        setAllFilters(filters);
        setError(null);
      } catch(err) {
        setError(err.message);
        setAllFilters(null);
      } finally {
        setLoading(false);
      }
    }
    getData()
  }, []);

  return(
    <div key="custom-inline-checkbox" className="mb-3">
    {allFilters && allFilters.map((info) => (<ConanFilter key={info} filter={info} handleFilter={props.handleFilter}/>))}
    </div>
    )
}

export function ConanSearchBar(props) {
  return (
    <div>
      <Row><Form.Control type="text" value={props.value} onChange={(e) => props.handleChange(e.target.value)}/></Row>
      {props.searchButton && <Row lg="4"><Button variant="primary" type="submit">Search</Button></Row>}
    </div>
  )
}
