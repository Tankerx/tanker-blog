'use strict';

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1507602562853_5949';

    // add your config here
    config.middleware = [];
    config.mysql = {
        client: {
            host: '127.0.0.1',
            port: '3306',
            user: 'root',
            password: 'tanker123456',
            database: 'blog'
        },
        app: true,
        agent: false
    }
    config.security = {
        csrf: {
            ignoreJSON: true,
        },
        xframe: {
            value: 'SAMEORIGIN',
        },
        //白名单
        domainWhiteList: ['http://localhost:8080']
    }

    return config;
};
