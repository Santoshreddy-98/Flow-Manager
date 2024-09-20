const Design = require('../Models/DesignModel')

exports.validatePath =  async (req, res) => {
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
  };
  