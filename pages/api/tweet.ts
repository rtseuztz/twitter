import type { NextApiRequest, NextApiResponse } from 'next'
import query from './sql';

type Data = {
    user: string
    tweet: string
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<[Data] | null>
) {
    const method = req.method;
    switch (method) {
        case 'GET':
            const rows = await query("SELECT * FROM tweets");
            return rows;
        case 'POST':
            await query("INSERT INTO tweets (user, tweet) VALUES ('" + req.body.user + "', '" + req.body.tweet + "')");
            return res.status(200).json([{ user: req.body.user, tweet: req.body.tweet }]);
        case 'DELETE':
            await query("DELETE FROM tweets WHERE id = " + req.body.id);
            return res.status(200).json([{ user: req.body.user, tweet: req.body.tweet }]);
        default:
            return null;
    }
}

