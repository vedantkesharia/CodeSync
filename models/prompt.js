import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  },
  visibility: {
    type: String,
    enum: ['public', 'private'], // Allow only these values
    default: 'public', // Default value is public
  },
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;