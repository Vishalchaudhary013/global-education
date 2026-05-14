import University from '../models/University.js';

export const getUniversities = async (req, res) => {
  try {
    let query = {};
    if (req.query.destination) {
      query.destination = new RegExp(`^${req.query.destination}$`, 'i');
    }
    if (req.query.admin === 'true' && req.user && req.user.role === 'admin') {
      query.createdBy = req.user.id;
    }
    const universities = await University.find(query);

    res.json(universities);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getUniversityById = async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) {
      return res.status(404).json({ message: 'University not found' });
    }
    res.json(university);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


export const createUniversity = async (req, res) => {
  try {
    const data = { ...req.body, createdBy: req.user.id };
    const university = new University(data);
    await university.save();
    res.status(201).json(university);
  } catch (error) {
    res.status(400).json({ message: 'Invalid university data', error: error.message });
  }
};

export const updateUniversity = async (req, res) => {
  try {
    const university = await University.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!university) {
      return res.status(404).json({ message: 'University not found' });
    }

    res.json(university);
  } catch (error) {
    res.status(400).json({ message: 'Invalid university update', error: error.message });
  }
};

export const deleteUniversity = async (req, res) => {
  try {
    const university = await University.findByIdAndDelete(req.params.id);
    if (!university) {
      return res.status(404).json({ message: 'University not found' });
    }

    res.json({ message: 'University deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
