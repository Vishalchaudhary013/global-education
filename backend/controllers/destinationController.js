import Destination from '../models/Destination.js';

export const getDestinations = async (req, res) => {
    try {
        const destinations = await Destination.find();
        res.json(destinations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getDestinationById = async (req, res) => {
    try {
        const destination = await Destination.findOne({ id: req.params.id });
        if (!destination) return res.status(404).json({ message: 'Destination not found' });
        res.json(destination);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
