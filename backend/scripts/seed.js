import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Models
import University from '../models/University.js';
import Course from '../models/Course.js';
import Scholarship from '../models/Scholarship.js';
import Event from '../models/Event.js';
import Blog from '../models/Blog.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI;
const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL;
const SUPER_ADMIN_PASSWORD = process.env.SUPER_ADMIN_PASSWORD;

if (!MONGO_URI) {
  console.error('MONGO_URI is not defined in .env');
  process.exit(1);
}

// Function to safely read and parse JS files (treating them as modules)
const loadData = async (filePath) => {
  const absolutePath = path.resolve(__dirname, filePath);
  const module = await import(`file://${absolutePath}`);
  return module;
};

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await University.deleteMany({});
    await Course.deleteMany({});
    await Scholarship.deleteMany({});
    await Event.deleteMany({});
    await Blog.deleteMany({});
    await User.deleteMany({ email: SUPER_ADMIN_EMAIL }); // Delete specifically this user if exists
    console.log('Cleared existing data');

    // Create Super Admin
    if (SUPER_ADMIN_EMAIL && SUPER_ADMIN_PASSWORD) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(SUPER_ADMIN_PASSWORD, salt);
      await User.create({
        name: 'Super Admin',
        email: SUPER_ADMIN_EMAIL,
        password: hashedPassword,
        role: 'superadmin'
      });
      console.log(`Created Super Admin: ${SUPER_ADMIN_EMAIL}`);
    }

    // Load Data from Frontend
    const { destinationsData } = await loadData('../../frontend/src/data/destinations.js');
    const { allCourses } = await loadData('../../frontend/src/data/courses.js');
    const { allScholarships } = await loadData('../../frontend/src/data/scholarships.js');
    const { allEvents } = await loadData('../../frontend/src/data/events.js');
    const { allArticles } = await loadData('../../frontend/src/data/articles.js');

    const universityMapping = {}; // Frontend ID -> MongoDB ID

    // 1. Seed Universities from Destinations
    console.log('Seeding Universities...');
    for (const key in destinationsData) {
      const dest = destinationsData[key];
      for (const uniData of dest.universities) {
        const university = await University.create({
          name: uniData.name,
          location: uniData.location,
          destination: dest.name,
          ranking: uniData.ranking,
          ieltsRequirement: uniData.ieltsRequirement,
          tuition: uniData.studyCost,
          logo: uniData.logo
        });
        universityMapping[uniData._id] = university._id;
      }
    }

    // 2. Seed Courses
    console.log('Seeding Courses...');
    for (const courseData of allCourses) {
      const uni = await University.findOne({ name: courseData.university.name });
      let universityId;
      if (uni) {
        universityId = uni._id;
      } else {
        const newUni = await University.create({
          name: courseData.university.name,
          destination: courseData.destination,
          location: courseData.destination,
          overview: courseData.university.overview,
          tuition: courseData.university.tuition,
          intakes: courseData.university.intakes
        });
        universityId = newUni._id;
      }

      await Course.create({
        name: courseData.name,
        type: courseData.type,
        destination: courseData.destination,
        duration: courseData.duration,
        university: universityId
      });
    }

    // 3. Seed Scholarships
    console.log('Seeding Scholarships...');
    for (const sch of allScholarships) {
      await Scholarship.create({
        name: sch.name,
        destination: sch.destination,
        amount: sch.amount,
        deadline: sch.deadline ? new Date(sch.deadline) : null,
        level: sch.level,
        provider: sch.provider,
        description: sch.description,
        benefits: sch.benefits,
        requirements: sch.requirements
      });
    }

    // 4. Seed Events
    console.log('Seeding Events...');
    for (const ev of allEvents) {
      await Event.create({
        name: ev.name,
        mode: ev.mode.toLowerCase() === 'online' ? 'online' : (ev.mode.toLowerCase() === 'offline' ? 'offline' : 'hybrid'),
        date: new Date(ev.date),
        time: ev.time,
        location: ev.location,
        logo: ev.logo,
        description: ev.description,
        highlights: ev.highlights,
        countries: ev.countries
      });
    }

    // 5. Seed Blogs
    console.log('Seeding Blogs...');
    for (const art of allArticles) {
      await Blog.create({
        title: art.title,
        content: JSON.stringify(art.content), // Storing as string since model is simple
        author: art.author,
        coverImage: art.img
      });
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seed();
