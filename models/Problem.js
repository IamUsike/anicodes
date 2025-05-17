import {model, models, Schema} from "mongoose";

const ProblemSchema = Schema({
    id: {
      type: String,
      required: true,
      unique: true
    },
    title: {type: String},
    problemStatement: {type: String},
    inputFormat: {type: String},
    outputFormat: {type: String},
    sampleInput: {type: String},
    sampleOutput: {type: String},
    likes: {
        type: Number,
        default: 10
    },
    dislikes: {
        type: Number,
        default: 0
    },
    order: {type: Number},
    category: {type: String},
    constraints: {type: String},
    companies: {type: [String], default: []},
    starterCode: {type: String},
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy'},
    // totalpoints: { type: Number, default:0 ,select:false },
    points: { type:Number, enum:['1','2','3'],default:1},
    solution: {type: String},
    videoId: {type: String},
    testCases: [{
      input: { type: [String], required: true },
      output: { type: [String], required: true },
    }],
  });
  
export const Problem = models?.Problem || model('Problem', ProblemSchema);
export const UserPoints = models?.UserPoints || model('UserPoints',UserPointsSchema)
