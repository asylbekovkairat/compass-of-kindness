const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');

function initSentry(app) {
    if (process.env.NODE_ENV === 'production') {
        Sentry.init({
            dsn: 'https://3a772c29b3cb48d4be55edb069b2ef19@o188902.ingest.sentry.io/4504909839400960',
            integrations: [
                // enable HTTP calls tracing
                new Sentry.Integrations.Http({ tracing: true }),
                // enable Express.js middleware tracing
                new Tracing.Integrations.Express({ app }),
            ],

            // Set tracesSampleRate to 1.0 to capture 100%
            // of transactions for performance monitoring.
            // We recommend adjusting this value in production
            tracesSampleRate: 0.001,
        });
    }
}
module.exports = {
    initSentry,
    Sentry
};