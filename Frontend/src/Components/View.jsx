import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Pagination } from 'react-bootstrap';

const View = () => {
  const [designPaths, setDesignPaths] = useState([]);
  const [designVariables, setDesignVariables] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const pathsResponse = await axios.get("http://localhost:5000/design-paths");
      const variablesResponse = await axios.get("http://localhost:5000/design-variables");
      setDesignPaths(pathsResponse.data);
      setDesignVariables(variablesResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Calculate the index range of the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Get the current items to display on the current page
  const currentDesignPaths = designPaths.slice(indexOfFirstItem, indexOfLastItem);
  const currentDesignVariables = designVariables.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h2>Design Paths</h2>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>defDirectory</th>
              <th>lefDirectory</th>
              <th>libDirectory</th>
              <th>techDirectory</th>
            </tr>
          </thead>
          <tbody>
            {currentDesignPaths.map((design, index) => (
              <tr key={design._id}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{design.defDirectory}</td>
                <td>{design.lefDirectory}</td>
                <td>{design.libDirectory}</td>
                <td>{design.techDirectory}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <h2>Design Variables</h2>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>design</th>
              <th>num_cpu</th>
              <th>power_opt</th>
              <th>gen_eff</th>
            </tr>
          </thead>
          <tbody>
            {currentDesignVariables.map((variable, index) => (
              <tr key={variable._id}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{variable.design}</td>
                <td>{variable.num_cpu}</td>
                <td>{variable.power_opt.toString()}</td>
                <td>{variable.gen_eff}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center">
        <Pagination>
          {Array.from({ length: Math.ceil(designPaths.length / itemsPerPage) }).map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
  );
};

export default View;
