/**
 * Writes the country guide content onto existing destination documents.
 *
 * The guide content is read straight from the frontend data file so there is a
 * single source of truth; this script only copies it into MongoDB. Destinations
 * are matched by their `id` slug, and only the `guide` field is touched, so the
 * universities, scholarships, costs, jobs and visa data already in the database
 * are left alone.
 *
 * Usage: node scripts/seedDestinationGuides.js
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import Destination from "../models/Destination.js";
import { destinationGuides } from "../../frontend/src/features/destinations/data/destinationGuides.js";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/global_education";

const seedDestinationGuides = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    const destinations = await Destination.find({}, "id name");
    const existingIds = new Set(destinations.map((d) => d.id));

    let updated = 0;
    for (const [id, guide] of Object.entries(destinationGuides)) {
      if (!existingIds.has(id)) {
        console.warn(`- skipped "${id}": no destination with that id`);
        continue;
      }
      await Destination.updateOne({ id }, { $set: { guide } });
      updated += 1;
      console.log(`✓ guide written for "${id}"`);
    }

    const missing = destinations
      .map((d) => d.id)
      .filter((id) => !destinationGuides[id]);
    if (missing.length) {
      console.warn(`\nNo guide content available for: ${missing.join(", ")}`);
      console.warn(
        "Those pages still render, but the guide sections stay hidden until content is added."
      );
    }

    console.log(`\nDone. Updated ${updated} destination(s).`);
  } catch (error) {
    console.error("Guide seed failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedDestinationGuides();
