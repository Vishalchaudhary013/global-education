import Scholarship from '../models/Scholarship.js';

export const getScholarships = async (req, res) => {
  try {
    let query = {};
    if (req.query.admin === 'true' && req.user && req.user.role === 'admin') {
      query.createdBy = req.user.id;
    }
    const scholarships = await Scholarship.find(query).populate('university');
    res.json(scholarships);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getScholarshipById = async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id).populate('university');
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }
    res.json(scholarship);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


export const createScholarship = async (req, res) => {
  try {
    const data = { ...req.body, createdBy: req.user.id };
    const scholarship = new Scholarship(data);
    await scholarship.save();
    const populatedScholarship = await Scholarship.findById(scholarship._id).populate('university');
    res.status(201).json(populatedScholarship);
  } catch (error) {
    res.status(400).json({ message: 'Invalid scholarship data', error: error.message });
  }
};

export const updateScholarship = async (req, res) => {
  try {
    const scholarship = await Scholarship.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('university');

    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }

    res.json(scholarship);
  } catch (error) {
    res.status(400).json({ message: 'Invalid scholarship update', error: error.message });
  }
};

export const deleteScholarship = async (req, res) => {
  try {
    const scholarship = await Scholarship.findByIdAndDelete(req.params.id);
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }

    res.json({ message: 'Scholarship deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
