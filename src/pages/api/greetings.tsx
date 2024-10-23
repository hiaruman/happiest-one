import { connectToDatabase } from '@/core/utils/mongodb';
import Greetings from '@/models/Greetings';

export default async function handler(req: any, res: any) {
    // Preventing 304 caching issues
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');

    try {
        await connectToDatabase();

        // Query atau operasi lainnya di MongoDB
        const greetings = await Greetings.find({isActive:true});

        const response = {
            code: 200,
            message: 'success',
            data: greetings ? greetings : []
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}