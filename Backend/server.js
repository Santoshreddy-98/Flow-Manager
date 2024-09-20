
const express = require('express');
const app = express();
  const fs = require('fs');
const cors = require('cors')
app.use(cors())
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const path = require("path");
require("dotenv").config();
const bodyParser = require('body-parser');
const Design = require('./Models/DesignModel');
const DesignVariable = require('./Models/DesignVariables');

mongoose
  .connect(
    process.env.MONGODB_URI,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      // useCreateIndex: true
    }
  )
  .then(() => console.log("DB Connection established"))
  .catch((err) => console.log(`DB Connection error: ${err.message}`));

app.use(bodyParser.json());

app.use(express.json());

app.post('/validate-directories', (req, res) => {
  const { defDirectory, lefDirectory, libDirectory, techDirectory } = req.body;
  console.log('Request received:', req.body);

  const directories = [
    { name: 'DEF', path: defDirectory, extension: '.def' },
    { name: 'LEF', path: lefDirectory, extension: '.lef' },
    { name: 'LIB', path: libDirectory, extension: '.lib' },
    { name: 'Tech', path: techDirectory, extension: '.tech' }
  ];
  console.log('Directories:', directories);

  const validationResults = directories.map(directory => {
    try {
      const stats = fs.statSync(directory.path);
      console.log(`Stats for ${directory.name}:`, stats);
      if (stats.isFile() && directory.path.endsWith(directory.extension)) {
        // If the provided path is a file and has the required extension
        return { name: directory.name, isValid: true };
      } else {
        // If the provided path is not a file or does not have the required extension
        return { name: directory.name, isValid: false };
      }
    } catch (err) {
      console.error(`Error validating ${directory.name}:`, err);
      return { name: directory.name, isValid: false };
    }
  });

  console.log('Validation results:', validationResults);
  res.json(validationResults);
});

//save paths
app.post('/save-path', async (req, res) => {
  const { defDirectory, lefDirectory, libDirectory, techDirectory } = req.body;

  // Create a new design document
  const design = new Design({
    defDirectory,
    lefDirectory,
    libDirectory,
    techDirectory
  });

  // Save the design document to the database
  try {
    await design.save();
    res.status(201).json({ message: 'Design saved successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//get paths
app.get('/designs', async (req, res) => {
  try {
    // Fetch all the design documents from the database
    const designs = await Design.find();

    res.json(designs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




app.post('/save-design-variable', async (req, res) => {
  const { design, num_cpu, power_opt, gen_eff } = req.body;

  // Create a new design variable document
  const designVariable = new DesignVariable({
    design,
    num_cpu,
    power_opt,
    gen_eff
  });

  // Save the design variable document to the database
  try {
    await designVariable.save();
    res.status(201).json({ message: 'Design variable saved successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/design-paths', async (req, res) => {
  try {
    const designs = await Design.find();
    res.status(200).json(designs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/design-variables', async (req, res) => {
  try {
    const designVariables = await DesignVariable.find();
    res.status(200).json(designVariables);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

