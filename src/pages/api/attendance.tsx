import { connectToDatabase } from '@/core/utils/mongodb';
import Attendance from '@/models/Attendance';

export default async function handler(req: any, res: any) {

    // Preventing 304 caching issues
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');

    try {
        await connectToDatabase();

        if (req.method==='GET') {

            const  {isActive, name} = req.query;
            const attendance = await Attendance.findOne((isActive || isActive==false) ? {isActive, name: { $regex: new RegExp(name, 'i') }} : {name:{ $regex: new RegExp(name, 'i') }});
            const response = {
                code: attendance ? 200 : 404,
                message:attendance ? 'success' : 'data not found',
                data: attendance ? attendance : undefined
            }
            res.status(attendance ? 200 : 404).json(response);
        } else if (req.method==='POST') {
            // Handle POST request: Add new attendance record
            const { name, presence, isActive, attendanceId } = req.body;

            console.log('ID => ', attendanceId);
            if (attendanceId) {
                const updatedAttdnc = await Attendance.updateOne(
                    { _id: attendanceId },
                    { $set: { presence: presence } }
                )
                console.log('Update Attdnc ==> ', updatedAttdnc);
                if (updatedAttdnc) {
                    const updatedAttendance = await Attendance.findOne({isActive, name: { $regex: new RegExp(name, 'i') }});
                    console.log('Updated Attendance ==> ', updatedAttendance);
                    const response = {
                        code: updatedAttendance ? 200 : 404,
                        message:updatedAttendance ? 'success' : 'data not found',
                        data: updatedAttendance ? updatedAttendance : undefined
                    }
                    res.status(updatedAttendance ? 200 : 404).json(response);
                    res.status(201).json({});
                } else {
                    res.status(500).json({
                        code: 500,
                        message: 'Internal server error'
                    });
                }
            } else {
                // Validate the required fields
                if (!name || !presence || isActive === undefined) {
                    return res.status(400).json({ error: 'Missing required fields' });
                }

                // Create a new attendance document (MongoDB will auto-generate _id)
                const newAttendance = new Attendance({
                    name,
                    presence,
                    isActive
                });

                // Save the attendance record to the database
                await newAttendance.save();

                // Respond with the newly created attendance record
                res.status(201).json(newAttendance);
            }
        } else {
            res.status(405).json({
                code: 405,
                message: 'Method Not Allowed'
            });
        }

    } catch (error) {
        res.status(500).json({
            code: 500,
            message: 'Internal server error'
        });
    }
}
