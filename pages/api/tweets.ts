import type { NextApiRequest, NextApiResponse } from 'next'
import query from './sql';

export type tweet = {
    user: string
    tweet: string
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<tweet[] | null>
) {
    const method = req.method;
    switch (method) {
        case 'GET':
            const rows = await query("SELECT * FROM tweets");
            console.log("rows");
            console.log(rows);
            res.status(200).json(rows);
            return;
        case 'POST':
            const body: tweet = JSON.parse(req.body);
            await query("INSERT INTO tweets (user, tweet) VALUES ('" + body.user + "', '" + body.tweet + "')");
            res.status(200).json([{ user: body.user, tweet: body.tweet }]);
            return;
        case 'DELETE':
            const del: tweet = JSON.parse(req.body);
            await query("DELETE FROM tweets WHERE user = '" + del.user + "' AND tweet = '" + del.tweet + "'");
            res.status(200).json([{ user: del.user, tweet: del.tweet }]);
            return;
        // case 'DELETE':
        //     await query("DELETE FROM tweets WHERE id = " + req.body.id);
        //     return res.status(200).json([{ user: body.user, tweet: body.tweet }]);
        default:
            return null;
    }
}

