import Event from '../models/Event.js';

export const getEvents = async (req, res) => {
  try {
    let query = {};
    if (req.query.admin === 'true' && req.user && req.user.role === 'admin') {
      query.createdBy = req.user.id;
    }
    const events = await Event.find(query).populate('university');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getEventById = async (req, res) => {
  try {
    let query = { _id: req.params.id };
    if (req.query.admin === 'true' && req.user && req.user.role === 'admin') {
      query.createdBy = req.user.id;
    }
    const event = await Event.findOne(query).populate('university');
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createEvent = async (req, res) => {
  try {
    const data = { ...req.body, createdBy: req.user.id };
    const event = new Event(data);
    await event.save();
    const populatedEvent = await Event.findById(event._id).populate('university');
    res.status(201).json(populatedEvent);
  } catch (error) {
    res.status(400).json({ message: 'Invalid event data', error: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('university');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    res.status(400).json({ message: 'Invalid event update', error: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
