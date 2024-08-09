'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    const oneHourAgo = new Date(now - 60 * 60 * 1000);
    const twoHoursAgo = new Date(now - 2 * 60 * 60 * 1000);

    await queryInterface.bulkInsert('weather_caches', [
      {
        city: '臺北市',
        data: JSON.stringify({
          city: '臺北市',
          weather: {
            Wx: [
              {
                startTime: '2024-08-10 12:00:00',
                endTime: '2024-08-10 18:00:00',
                value: '晴時多雲',
                unit: null
              }
            ],
            PoP: [
              {
                startTime: '2024-08-10 12:00:00',
                endTime: '2024-08-10 18:00:00',
                value: '20',
                unit: '%'
              }
            ],
            MinT: [
              {
                startTime: '2024-08-10 12:00:00',
                endTime: '2024-08-10 18:00:00',
                value: '28',
                unit: 'C'
              }
            ],
            MaxT: [
              {
                startTime: '2024-08-10 12:00:00',
                endTime: '2024-08-10 18:00:00',
                value: '35',
                unit: 'C'
              }
            ]
          }
        }),
        timestamp: now,
        createdAt: now,
        updatedAt: now
      },
      {
        city: '臺中市',
        data: JSON.stringify({
          city: '臺中市',
          weather: {
            Wx: [
              {
                startTime: '2024-08-10 12:00:00',
                endTime: '2024-08-10 18:00:00',
                value: '多雲',
                unit: null
              }
            ],
            PoP: [
              {
                startTime: '2024-08-10 12:00:00',
                endTime: '2024-08-10 18:00:00',
                value: '30',
                unit: '%'
              }
            ],
            MinT: [
              {
                startTime: '2024-08-10 12:00:00',
                endTime: '2024-08-10 18:00:00',
                value: '26',
                unit: 'C'
              }
            ],
            MaxT: [
              {
                startTime: '2024-08-10 12:00:00',
                endTime: '2024-08-10 18:00:00',
                value: '33',
                unit: 'C'
              }
            ]
          }
        }),
        timestamp: oneHourAgo,
        createdAt: oneHourAgo,
        updatedAt: oneHourAgo
      },
      {
        city: '高雄市',
        data: JSON.stringify({
          city: '高雄市',
          weather: {
            Wx: [
              {
                startTime: '2024-08-10 12:00:00',
                endTime: '2024-08-10 18:00:00',
                value: '陰時多雲',
                unit: null
              }
            ],
            PoP: [
              {
                startTime: '2024-08-10 12:00:00',
                endTime: '2024-08-10 18:00:00',
                value: '40',
                unit: '%'
              }
            ],
            MinT: [
              {
                startTime: '2024-08-10 12:00:00',
                endTime: '2024-08-10 18:00:00',
                value: '27',
                unit: 'C'
              }
            ],
            MaxT: [
              {
                startTime: '2024-08-10 12:00:00',
                endTime: '2024-08-10 18:00:00',
                value: '32',
                unit: 'C'
              }
            ]
          }
        }),
        timestamp: twoHoursAgo,
        createdAt: twoHoursAgo,
        updatedAt: twoHoursAgo
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('weather_caches', null, {});
  }
};