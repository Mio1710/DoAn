module.exports = {
  apps: [
    {
      name: 'Doan FE',
      port: '4000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
    },
  ],
}
