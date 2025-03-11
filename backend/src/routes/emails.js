import knex from 'knex';
import knexConfig from '../../knexfile.js';

const db = knex(knexConfig.development);

export async function routes(fastify, options) {
    // Get all emails
    fastify.get('/api/emails', async (request, reply) => {
        try {
            fastify.log.info('GET /api/emails - Start fetching all emails');

            const emails = await db('emails')
                .orderBy('created_at', 'desc');

            fastify.log.info(`GET /api/emails - Successfully fetched ${emails.length} emails`);
            return emails;
        } catch (error) {
            fastify.log.error(`GET /api/emails - Error: ${error.message}`);
            reply.code(500).send({ error: 'Internal server error while fetching emails' });
        }
    });

    // Search emails
    fastify.get('/api/emails/search', async (request, reply) => {
        try {
            const { query } = request.query;
            fastify.log.info(`GET /api/emails/search - Start searching emails with query: ${query || 'empty'}`);

            let emails;
            if (!query) {
                emails = await db('emails').orderBy('created_at', 'desc');
            } else {
                const searchTerm = `%${query}%`;
                emails = await db('emails')
                    .where('to', 'like', searchTerm)
                    .orWhere('cc', 'like', searchTerm)
                    .orWhere('bcc', 'like', searchTerm)
                    .orWhere('subject', 'like', searchTerm)
                    .orWhere('body', 'like', searchTerm)
                    .orderBy('created_at', 'desc');
            }

            fastify.log.info(`GET /api/emails/search - Found ${emails.length} emails matching query: ${query || 'empty'}`);
            return emails;
        } catch (error) {
            fastify.log.error(`GET /api/emails/search - Error: ${error.message}`);
            reply.code(500).send({ error: 'Internal server error while searching emails' });
        }
    });

    // Create new email
    fastify.post('/api/emails', async (request, reply) => {
        try {
            const { to, cc, bcc, subject, body } = request.body;
            fastify.log.info(`POST /api/emails - Start creating new email to: ${to}`);

            if (!to || !subject || !body) {
                fastify.log.warn('POST /api/emails - Missing required fields');
                reply.code(400).send({ error: 'Missing required fields: to, subject, and body are required' });
                return;
            }

            const [email] = await db('emails')
                .insert({
                    to,
                    cc,
                    bcc,
                    subject,
                    body,
                })
                .returning('*');

            fastify.log.info(`POST /api/emails - Successfully created email with id: ${email.id}`);
            return email;
        } catch (error) {
            fastify.log.error(`POST /api/emails - Error: ${error.message}`);
            reply.code(500).send({ error: 'Internal server error while creating email' });
        }
    });

    // Get single email
    fastify.get('/api/emails/:id', async (request, reply) => {
        try {
            const { id } = request.params;
            fastify.log.info(`GET /api/emails/${id} - Start fetching email`);

            const email = await db('emails')
                .where({ id })
                .first();

            if (!email) {
                fastify.log.warn(`GET /api/emails/${id} - Email not found`);
                reply.code(404).send({ error: 'Email not found' });
                return;
            }

            fastify.log.info(`GET /api/emails/${id} - Successfully fetched email`);
            return email;
        } catch (error) {
            fastify.log.error(`GET /api/emails/${id} - Error: ${error.message}`);
            reply.code(500).send({ error: 'Internal server error while fetching email' });
        }
    });
}

export default routes; 