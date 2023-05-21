const SERVER_PATH = 'https://startup-summer-proxy-production.up.railway.app';

export const API_PATH = {
  authorization:
    SERVER_PATH +
    '/2.0/oauth2/password?login=sergei.stralenia@gmail.com&password=paralect123&client_id=2356&client_secret=v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948&hr=0',
  vacancies: SERVER_PATH + '/2.0/vacancies/',
};

export const DATA = {
  appId:
    'v3.r.137561663.b35caa97f7d6205f6080d2bd378b8363bf3e7d89.10421d0c33eb56f8137ac8a015a3d529fd93abfe',
  secretKey: 'GEU4nvd3rej*jeh.eqp',
  localeAuth: 'access_token',
  localeFavor: 'favorites',
  auth: `Bearer ` + localStorage.getItem('access_token'),
};

export const jobArr = [
  'IT, интернет, связь, телеком',
  'Кадры, управление персоналом',
  'Искусство, культура, развлечения',
  'Банки, инвестиции, лизинг',
  'Дизайн',
];
