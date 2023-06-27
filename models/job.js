import mongoose from "mongoose";

export const jobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, "Please provide company name"],
    minLength: 3,
    maxLength: 120,
    trim: true
  },
  position: {
    type: String,
    required: [true, "Please provide position name"],
    maxLength: 120
  },
  status: {
    type: String,
    enum: ['pending', 'interview', 'declined'],
    default: 'pending'
  },
  jobTitle: {
    type: String,
    enum: ['full-time', 'part-time', 'remote'],
    default: 'full-time'
  },
  jobLocation: {
    type: String,
    default: 'My city'
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, 'Please provide User']
  }
},{
  timestamps: true
});

export const Job = mongoose.model('Job', jobSchema);