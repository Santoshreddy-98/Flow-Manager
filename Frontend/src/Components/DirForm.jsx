import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DirForm = () => {
  const [defDirectory, setDefDirectory] = useState('');
  const [lefDirectory, setLefDirectory] = useState('');
  const [libDirectory, setLibDirectory] = useState('');
  const [techDirectory, setTechDirectory] = useState('');
  const [validationResults, setValidationResults] = useState([]);
  const navigate = useNavigate();
  const navigateToInputVariables = () => {
    navigate('/InputVariables', { state: { formData: { defDirectory, lefDirectory, libDirectory, techDirectory } } });
  };
  const handleSubmit = () => {
  if (
    validationResults.every((result) => result.isValid) &&
    defDirectory &&
    lefDirectory &&
    libDirectory &&
    techDirectory
  ) {
    navigateToInputVariables();
  } else {
    console.log('Please make sure all paths are valid before proceeding');
  }
};
  

  const handleValidation = async () => {
    const response = await fetch('http://localhost:5000/validate-directories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        defDirectory,
        lefDirectory,
        libDirectory,
        techDirectory,
      }),
    });

    const results = await response.json();
    setValidationResults(results);
    console.log(results);

    if (results.every((result) => result.isValid)) {
      toast.success('All paths are valid!');
    } else {
      toast.error('Some paths are invalid. Please check and try again.');
    }
  };
//save paths
  const handleSave = async () => {
    // Get the file paths from the state variables
    const data = {
      defDirectory,
      lefDirectory,
      libDirectory,
      techDirectory
    };
  
    // Send a POST request to the /save-path endpoint with the file paths in the request body
    try {
      const response = await axios.post('http://localhost:5000/save-path', data);
      // If the save operation was successful, show a success message
      toast.success("path saved")
      console.log('Design saved successfully');
    } catch (err) {
      // If there was an error, show an error message
      toast.error("error saving the path")
      console.error('Error saving design:', err);
    }
  };
  const handleButtonClick=()=>{
    handleSubmit();
    handleSave()

  }

  return (
    <Card className="col-7 mt-3" style={{ margin: 'auto' }}>
      <Card.Header className='display-6'>Design Directory inputs</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Label>DEF File Directory:</Form.Label>
            <div className="input-group">
              <Form.Control
                type="text"
                value={defDirectory}
                onChange={(e) => setDefDirectory(e.target.value)}
              />
              <div className="input-group-append">
                <span className="input-group-text">
                  {validationResults.find((result) => result.name === 'DEF')?.isValid ? (
                    <i className="bi bi-check-circle text-success"></i>
                  ) : (
                    <i className="bi bi-x-circle text-danger"></i>
                  )}
                </span>
              </div>
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label>LEF File Directory:</Form.Label>
            <div className="input-group">
              <Form.Control
                type="text"
                value={lefDirectory}
                onChange={(e) => setLefDirectory(e.target.value)}
              />
              <div className="input-group-append">
                <span className="input-group-text">
                  {validationResults.find((result) => result.name === 'LEF')?.isValid ? (
                    <i className="bi bi-check-circle text-success"></i>
                  ) : (
                    <i className="bi bi-x-circle text-danger"></i>
                  )}
                </span>
              </div>
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label>LIB File Directory:</Form.Label>
            <div className="input-group">
              <Form.Control
                type="text"
                value={libDirectory}
                onChange={(e) => setLibDirectory(e.target.value)}
              />
              <div className="input-group-append">
                <span className="input-group-text">
                  {validationResults.find((result) => result.name === 'LIB')?.isValid ? (
                    <i className="bi bi-check-circle text-success"></i>
                  ) : (
                    <i className="bi bi-x-circle text-danger"></i>
                  )}
                </span>
              </div>
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label>Tech File Directory:</Form.Label>
            <div className="input-group">
              <Form.Control
                type="text"
                value={techDirectory}
                onChange={(e) => setTechDirectory(e.target.value)}
              />
              <div className="input-group-append">
                <span className="input-group-text">
                  {validationResults.find((result) => result.name === 'Tech')?.isValid ? (
                    <i className="bi bi-check-circle text-success"></i>
                  ) : (
                    <i className="bi bi-x-circle text-danger"></i>
                  )}
                </span>
              </div>
            </div>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button
              className="mt-3 me-2"
              style={{ backgroundColor: '#4D135A', border: 'none' }}
              onClick={handleValidation}
            >
              Validate
            </Button>
            <Button
  className="mt-3"
  style={{ backgroundColor: '#08411D', border: 'none' }}
  onClick={handleButtonClick}
  disabled={
    !(
      validationResults.find((result) => result.name === 'DEF')?.isValid &&
      validationResults.find((result) => result.name === 'LEF')?.isValid &&
      validationResults.find((result) => result.name === 'LIB')?.isValid &&
      validationResults.find((result) => result.name === 'Tech')?.isValid
    )
  }
>
  Submit
</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default DirForm;