// @flow
/**************************************************/
/* US English                                     */
/**************************************************/
let en = {
  home: 'Home',
  myPage: 'My Page',
  events: 'Events',
  members: 'Members',
  newMembers: 'New Members',

  title: 'Red Cross',
  welcomeMsg: 'Welcome to Red Cross!',
  loggedInMsg: 'My Events: ',
  signedUpMsg: 'User account created, please wait for confirmation.',
  forgotPassMsg: 'Page under construction.',

  edit: 'Edit',
  save: 'Save',
  accept: 'Accept',
  reject: 'Reject',
  contact: 'Contact',

  language: 'Language',
  english: 'English',
  norwegian: 'Norwegian',

  username: 'Username',
  password: 'Password',
  email: 'Email',
  name: 'Name',
  firstName: 'First name',
  middleName: 'Middle name',
  lastName: 'Last name',
  birthdate: 'Date of birth',
  address: 'Address',
  age: 'Age',
  city: 'City',

  signIn: 'Sign in',
  signOut: 'Sign out',
  signUp: 'Create account',
  forgotPass: 'Forgot password',

  userType: 'Account type',
  new: 'New',
  user: 'User',
  leader: 'Leader',
  admin: 'Admin',

  // Error messages
  errorLogin: 'Incorrect username or password!',
  errorLoginLength: 'Please write a username and password.',
  errorLoginNewUser: 'User account not yet activated. Please wait.',
  errorLoginDeletedUser: 'User account does not exist anymore.',
  errorMembers: 'Error getting members!',

  switchLanguage: 'Bytt til Norsk',
  confirmSignOut: 'Log out?',
  confirmUserDelete: 'Delete user?',
  optional: 'Optional',

  // Dates
  day: 'Day',
  month: 'Month',
  year: 'Year',

  // Months
  jan: 'January',
  feb: 'February',
  mar: 'March',
  apr: 'April',
  may: 'May',
  jun: 'June',
  jul: 'July',
  aug: 'August',
  sep: 'September',
  oct: 'October',
  nov: 'November',
  dec: 'December',
};

/**************************************************/
/* Norsk Bokmål                                   */
/**************************************************/
let no = {
  home: 'Hjem',
  myPage: 'Min Side',
  events: 'Arrangementer',
  members: 'Medlemmer',
  newMembers: 'Nye Medlemmer',

  title: 'Røde Kors',
  welcomeMsg: 'Velkommen til Røde Kors!',
  loggedInMsg: 'Mine Arrangementer: ',
  signedUpMsg: 'Brukerkonto opprettet, vennligst vent på godkjenning.',
  forgotPassMsg: 'Side under konstruksjon.',

  edit: 'Rediger',
  save: 'Lagre',
  accept: 'Godta',
  reject: 'Avslå',
  contact: 'Kontakt',

  language: 'Språk',
  english: 'Engelsk',
  norwegian: 'Norsk',

  username: 'Brukernavn',
  password: 'Passord',
  email: 'Epost',
  name: 'Navn',
  firstName: 'Fornavn',
  middleName: 'Mellomnavn',
  lastName: 'Etternavn',
  birthdate: 'Fødselsdato',
  address: 'Adresse',
  age: 'Alder',
  city: 'By',

  signIn: 'Logg inn',
  signOut: 'Logg ut',
  signUp: 'Opprett konto',
  forgotPass: 'Glemt passord',

  userType: 'Brukertype',
  new: 'Ny',
  user: 'Bruker',
  leader: 'Leder',
  admin: 'Admin',

  // Error meldinger
  errorLogin: 'Feil brukernavn eller passord!',
  errorLoginLength: 'Vennligst skriv inn et brukernavn og passord.',
  errorLoginNewUser: 'Brukerkonto er ikke enda aktivert. Vennligst vent.',
  errorLoginDeletedUser: 'Brukerkontoen eksisterer ikke lenger.',
  errorMembers: 'Feil med henting av brukere!',

  switchLanguage: 'Change to English',
  confirmSignOut: 'Logg ut?',
  confirmUserDelete: 'Slett brukeren?',
  optional: 'Valgfritt',

  // Datoer
  day: 'Day',
  month: 'Month',
  year: 'Year',

  // Months
  jan: 'Januar',
  feb: 'Februar',
  mar: 'Mars',
  apr: 'April',
  may: 'Mai',
  jun: 'Juni',
  jul: 'Juli',
  aug: 'August',
  sep: 'September',
  oct: 'Oktober',
  nov: 'November',
  dec: 'Desember',
};

// Language selection
let lang;
switch (localStorage.getItem("lang")) {
  case 'en':
    lang = en;
    break;
  case 'no':
    lang = no;
    break;
  default:
    lang = en;
}

export { lang, en, no };
