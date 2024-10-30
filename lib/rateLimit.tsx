import { NextResponse } from "next/server";

// lib/rateLimit.ts
const rateLimit = (limit: number, interval: number) => {
  const requests = new Map<string, number[]>();

  return (req: Request, res: Response, next: Function) => {
    // Extract IP address from headers or default to localhost
    const ip = req.headers.get('x-forwarded-for') || 'localhost';
    const now = Date.now();
    if (!requests.has(ip)) {
      requests.set(ip, []);
    }

    const timestamps = requests.get(ip)!;
    timestamps.push(now);
    requests.set(ip, timestamps.filter(timestamp => now - timestamp < interval));

    if (timestamps.length > limit) {
      console.log("heheheh boii")

      NextResponse.json({ error: 'Too many requests. Please try again later.' },{status:429});
    } else {
      next();
    }
  };
};

export default rateLimit;
