import prisma from '../../lib/prismaClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { clientId, number, description, responsible } = req.body;

    try {
      const folio = await prisma.folio.create({
        data: {
          number,
          description,
          responsible,
          client: { connect: { id: clientId } },
        },
      });
      res.status(201).json(folio);
    } catch (error) {
      res.status(500).json({ error: 'Error creating folio' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
