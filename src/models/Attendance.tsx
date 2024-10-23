import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    presence: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    },
});

export default mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema);
