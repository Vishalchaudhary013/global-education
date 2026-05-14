import Course from '../models/Course.js';

export const getCourses = async (req, res) => {
  try {
    let query = {};
    if (req.query.admin === 'true' && req.user && req.user.role === 'admin') {
      query.createdBy = req.user.id;
    }
    const courses = await Course.find(query).populate('university');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('university');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


export const filterCourses = async (req, res) => {
  try {
    const { name, type, destination, admin } = req.query;
    let query = {};
    if (name) query.name = new RegExp(name, 'i');
    if (type) query.type = type;
    if (destination) query.destination = new RegExp(destination, 'i');
    
    if (admin === 'true' && req.user && req.user.role === 'admin') {
      query.createdBy = req.user.id;
    }

    const courses = await Course.find(query).populate('university');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createCourse = async (req, res) => {
  try {
    const data = { ...req.body, createdBy: req.user.id };
    const course = new Course(data);
    await course.save();
    const populatedCourse = await Course.findById(course._id).populate('university');
    res.status(201).json(populatedCourse);
  } catch (error) {
    res.status(400).json({ message: 'Invalid course data', error: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('university');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    res.status(400).json({ message: 'Invalid course update', error: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
