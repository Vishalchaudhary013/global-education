import mongoose from "mongoose";
import dotenv from "dotenv";
import University from "../models/University.js";
import Course from "../models/Course.js";
import Scholarship from "../models/Scholarship.js";
import Event from "../models/Event.js";
import Article from "../models/Article.js";
import Destination from "../models/Destination.js";
import { allCourses } from "../../frontend/src/data/courses.js";
import { allScholarships } from "../../frontend/src/data/scholarships.js";
import { allEvents } from "../../frontend/src/data/events.js";
import { allArticles } from "../../frontend/src/data/articles.js";
import { destinationsData } from "../../frontend/src/data/destinations.js";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/global_education";

const seedUniversitiesAndCourses = async () => {
  const universityByName = new Map();

  for (const item of allCourses) {
    const uniName = item?.university?.name?.trim();
    if (!uniName) continue;

    if (!universityByName.has(uniName)) {
      const payload = {
        name: uniName,
        location: "",
        destination: item.destination || "",
        ranking: "",
        ieltsRequirement: "",
        logo: "",
        studyCost: item?.university?.tuition || "",
        livingCost: "",
        overview: item?.university?.overview || "",
        tuition: item?.university?.tuition || "",
        intakes: item?.university?.intakes || "",
      };

      const university = await University.findOneAndUpdate(
        { name: uniName },
        payload,
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      universityByName.set(uniName, university);
    }
  }

  for (const item of allCourses) {
    const uniName = item?.university?.name?.trim();
    const university = uniName ? universityByName.get(uniName) : null;
    if (!university) continue;

    const courseFilter = {
      name: item.name,
      university: university._id,
      destination: item.destination,
    };

    const coursePayload = {
      name: item.name,
      type: item.type,
      destination: item.destination,
      university: university._id,
      duration: item.duration,
    };

    await Course.findOneAndUpdate(courseFilter, coursePayload, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });
  }

  return universityByName;
};

const seedScholarships = async () => {
  for (const item of allScholarships) {
    const scholarshipPayload = {
      name: item.name,
      destination: item.destination || "",
      amount: item.amount || "",
      eligibility: item.eligibility || "",
      deadline: item.deadline ? new Date(item.deadline) : null,
      level: item.level || "",
      provider: item.provider || "",
      noOfAwards: item.noOfAwards || "",
      description: item.description || "",
      fields: item.fields || [],
      benefits: item.benefits || [],
      requirements: item.requirements || [],
      howToApply: item.howToApply || "",
      officialLink: item.officialLink || "",
      tags: item.tags || [],
    };

    await Scholarship.findOneAndUpdate(
      { name: item.name, destination: item.destination },
      scholarshipPayload,
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
  }
};

const seedEvents = async () => {
  for (const item of allEvents) {
    const primaryUniversityName = item?.universities?.[0]?.name;
    const primaryUniversity = primaryUniversityName
      ? await University.findOne({ name: primaryUniversityName })
      : null;

    const eventPayload = {
      name: item.name,
      mode: item.mode,
      type: item.type || "",
      date: item.date ? new Date(item.date) : new Date(),
      time: item.time || "",
      location: item.location || "",
      venue: item.venue || "",
      logo: item.logo || "",
      description: item.description || "",
      university: primaryUniversity?._id || undefined,
      countries: item.countries || [],
      highlights: item.highlights || [],
      universities: item.universities || [],
    };

    await Event.findOneAndUpdate(
      { name: item.name, date: eventPayload.date },
      eventPayload,
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
  }
};

const seedArticles = async () => {
  for (const item of allArticles) {
    await Article.findOneAndUpdate(
      { title: item.title },
      { ...item },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
  }
};

const seedDestinations = async () => {
  const destinationsArray = Object.values(destinationsData);
  for (const item of destinationsArray) {
    await Destination.findOneAndUpdate(
      { id: item.id },
      { ...item },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
  }
};

const run = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    await seedUniversitiesAndCourses();
    await seedScholarships();
    await seedEvents();
    await seedArticles();
    await seedDestinations();

    const [uniCount, courseCount, scholarshipCount, eventCount, articleCount, destCount] =
      await Promise.all([
        University.countDocuments(),
        Course.countDocuments(),
        Scholarship.countDocuments(),
        Event.countDocuments(),
        Article.countDocuments(),
        Destination.countDocuments(),
      ]);

    console.log("Seed complete.");
    console.log(`Universities: ${uniCount}`);
    console.log(`Courses: ${courseCount}`);
    console.log(`Scholarships: ${scholarshipCount}`);
    console.log(`Events: ${eventCount}`);
    console.log(`Articles: ${articleCount}`);
    console.log(`Destinations: ${destCount}`);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

run();
