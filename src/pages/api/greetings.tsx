import { connectToDatabase } from '@/core/utils/mongodb';
import Greetings from '@/models/Greetings';
import Attendance from "@/models/Attendance";

export default async function handler(req: any, res: any) {
    // Preventing 304 caching issues
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');

    try {
        await connectToDatabase();

        if (req.method==='GET') {

            // Query atau operasi lainnya di MongoDB
            const greetings = await Greetings.find({isActive:true});

            const response = {
                code: 200,
                message: 'success',
                data: greetings ? greetings : []
            }
            res.status(200).json(response);
        } else if(req.method==='POST') {
            // Handle POST request: Add new greetings record
            const { name, note } = req.body;
            if (!name || !note) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const newGreetings = new Greetings({
                name,
                note,
                isActive: true,
                createdAt: new Date()
            });


            // Save the greetings record to the database
            await newGreetings.save();

            console.log('New Greetings ==> ', newGreetings);

            // Respond with the newly created greetings record
            res.status(201).json(newGreetings);

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