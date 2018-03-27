// @flow

/**************************************************/
/* US English                                     */
/**************************************************/
let en = {
  home: 'Home',
  myPage: 'My Page',
  events: 'Events',
  members: 'Members',

  title: 'Red Cross',
  welcomeMsg: 'Welcome to Red Cross!',
  loggedInMsg: 'My Events: ',

  username: 'Username',
  password: 'Password',
  email: 'Email',
  firstName: 'First name',
  lastName: 'Last name',
  age: 'Age',
  city: 'City',

  signIn: 'Sign in',
  signOut: 'Sign out',
  signUp: 'Create account',
  forgotPass: 'Forgot password',

  userTypeNew: 'Account type: Deactivated',
  userTypeUser: 'Account type: User',
  userTypeLeader: 'Account type: Leader',
  userTypeAdmin: 'Account type: Admin',

  errorLogin: 'Incorrect username or password!',
  errorMembers: 'Error getting members!',

  switchLanguage: 'Bytt til Norsk',
  confirmSignOut: 'Log out?',
};

/**************************************************/
/* Norsk Bokmål                                   */
/**************************************************/
let no = {
  home: 'Hjem',
  myPage: 'Min Side',
  events: 'Arrangementer',
  members: 'Medlemmer',

  title: 'Røde Kors',
  welcomeMsg: 'Velkommen til Røde Kors!',
  loggedInMsg: 'Mine Arrangementer: ',

  username: 'Brukernavn',
  password: 'Passord',
  email: 'Epost',
  firstName: 'Fornavn',
  lastName: 'Etternavn',
  age: 'Alder',
  city: 'By',

  signIn: 'Logg inn',
  signOut: 'Logg ut',
  signUp: 'Opprett konto',
  forgotPass: 'Glemt passord',

  userTypeNew: 'Kontotype: Deaktivert',
  userTypeUser: 'Kontotype: Bruker',
  userTypeLeader: 'Kontotype: Leder',
  userTypeAdmin: 'Kontotype: Admin',

  errorLogin: 'Feil brukernavn eller passord!',
  errorMembers: 'Feil med henting av brukere!',

  switchLanguage: 'Change to English',
  confirmSignOut: 'Logg ut?',
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
