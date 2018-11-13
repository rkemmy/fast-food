module.exports = {
    collectCoverageFrom: [
        '**/*.{js,html}',
        '!**/coverage/**',
        '!**/jest.config.js'
    ],
    preset: "jest-puppeteer"
};