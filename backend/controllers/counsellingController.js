import CounsellingRequest from '../models/CounsellingRequest.js';
import sendEmail from '../utils/sendEmail.js';

export const submitCounsellingRequest = async (req, res) => {
  try {
    const { name, email, phone, destination, courseLevel, message } = req.body;
    const request = new CounsellingRequest({
      name, email, phone, destination, courseLevel, message
    });
    await request.save();

    // Send confirmation email
    const emailMessage = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2c3e50;">Session Booked Successfully!</h2>
        <p>Dear <strong>${name}</strong>,</p>
        <p>Thank you for booking a counselling session with us. Your request has been successfully received.</p>
        <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Details:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Destination:</strong> ${destination}</p>
          <p><strong>Course Level:</strong> ${courseLevel}</p>
          <p><strong>Message:</strong> ${message || 'N/A'}</p>
        </div>
        <p>Our experts will contact you shortly on <strong>${phone}</strong> or via email.</p>
        <p>Best regards,<br/><strong>Global Education Team</strong></p>
      </div>
    `;

    try {
      await sendEmail({
        email: email,
        subject: 'Counselling Session Booked Successfully - Global Education',
        message: emailMessage,
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // We still return 201 because the request was saved in DB
    }

    res.status(201).json({ message: 'Counselling request submitted successfully', request });
  } catch (error) {
    console.error('Submit Counselling Request Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getCounsellingRequests = async (req, res) => {
  try {
    const requests = await CounsellingRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateCounsellingRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const request = await CounsellingRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!request) {
      return res.status(404).json({ message: 'Counselling request not found' });
    }

    res.json(request);
  } catch (error) {
    res.status(400).json({ message: 'Invalid status update', error: error.message });
  }
};
