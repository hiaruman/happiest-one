import mongoose from 'mongoose';

const GreetingsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    },
    createdAt: {
        type: Date,
        required: false,
    },
});

export default mongoose.models.Greetings || mongoose.model('Greetings', GreetingsSchema);
