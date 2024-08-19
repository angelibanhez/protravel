import prisma from "/lib/prismaClient.js";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone, nationality, recommendedBy } = req.body;

    if (!name || !email || !phone || !nationality) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      const client = await prisma.client.create({
        data: {
          name,
          email,
          phone,
          nationality,
          recommendedBy,
        },
      });
      res.status(201).json(client);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating client' });
    }
  } else if (req.method === 'GET') {
    try {
      const clients = await prisma.client.findMany({
        include: { folios: true },
      });
      res.status(200).json(clients);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching clients' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
