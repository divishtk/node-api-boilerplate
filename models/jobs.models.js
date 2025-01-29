import mongoose from "mongoose";
import validator from "validator";


const jobsSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    position: {
      type: String,
      required: [true, "Job position is required"],
      max:100
    },
    workLocation: {
        type: String,
        default: "Mumbai",
        required:[true, "Work location is required"],
    },
    status: {
      type: String,
      enum: ['pending', 'interview', 'declined'],
      default: 'pending',
    },
    workType:{
        type: String,
        enum: ['full-time', 'part-time', 'internship','contract'],
        required: [true, "Work type is required"],
        default: 'full-time',
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
    }
  },
  {
    timestamps: true,
  }
);

export const Jobs = mongoose.model("Jobs", jobsSchema);
