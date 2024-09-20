import React, { useState } from 'react';
import axios from 'axios';

const DirectoryValidator = () => {
  const [directoryPath, setDirectoryPath] = useState('');
  const [isValid, setIsValid] = useState(null);

  const handleDirectoryPathChange = (e) => {
    setDirectoryPath(e.target.value);
  };

  const validateDirectory = async () => {
    try {
      const response = await axios.post('http://localhost:9191/validate-directory', {
        directoryPath,
      });
      const { valid } = response.data;
      setIsValid(valid);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="text" value={directoryPath} onChange={handleDirectoryPathChange} />
      <button onClick={validateDirectory}>Validate</button>
      {isValid === true && <div>Directory is valid</div>}
      {isValid === false && <div>Directory is not valid</div>}
    </div>
  );
};

export default DirectoryValidator;
