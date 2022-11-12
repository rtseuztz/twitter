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
            const body: Data = JSON.parse(req.body);
            await query("INSERT INTO tweets (user, tweet) VALUES ('" + body.user + "', '" + body.tweet + "')");
            return res.status(200).json([{ user: body.user, tweet: body.tweet }]);
        // case 'DELETE':
        //     await query("DELETE FROM tweets WHERE id = " + req.body.id);
        //     return res.status(200).json([{ user: body.user, tweet: body.tweet }]);
        default:
            return null;
    }
}

