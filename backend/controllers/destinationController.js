import Destination from '../models/Destination.js';

export const getDestinations = async (req, res) => {
    try {
        const query = {};
        if (req.query.admin === 'true' && req.user && req.user.role === 'admin') {
            query.createdBy = req.user.id;
        }
        const destinations = await Destination.find(query);
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

export const createDestination = async (req, res) => {
    try {
        const existing = await Destination.findOne({ id: req.body.id });
        if (existing) {
            return res.status(409).json({ message: 'A destination with that id already exists' });
        }

        const destination = new Destination({ ...req.body, createdBy: req.user.id });
        await destination.save();
        res.status(201).json(destination);
    } catch (error) {
        res.status(400).json({ message: 'Invalid destination data', error: error.message });
    }
};

export const updateDestination = async (req, res) => {
    try {
        const destination = await Destination.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!destination) return res.status(404).json({ message: 'Destination not found' });
        res.json(destination);
    } catch (error) {
        res.status(400).json({ message: 'Invalid destination update', error: error.message });
    }
};

/**
 * Patches the country guide shown on the destination detail page. Only the keys
 * present in the body are written, so you can update one section (say `faqs`)
 * without resending the rest of the guide.
 */
export const updateDestinationGuide = async (req, res) => {
    try {
        const updates = Object.entries(req.body || {});
        if (!updates.length) {
            return res.status(400).json({ message: 'No guide fields provided' });
        }

        const $set = Object.fromEntries(updates.map(([key, value]) => [`guide.${key}`, value]));
        const destination = await Destination.findOneAndUpdate(
            { id: req.params.id },
            { $set },
            { new: true, runValidators: true }
        );

        if (!destination) return res.status(404).json({ message: 'Destination not found' });
        res.json(destination);
    } catch (error) {
        res.status(400).json({ message: 'Invalid guide update', error: error.message });
    }
};

export const deleteDestination = async (req, res) => {
    try {
        const destination = await Destination.findOneAndDelete({ id: req.params.id });
        if (!destination) return res.status(404).json({ message: 'Destination not found' });
        res.json({ message: 'Destination deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
