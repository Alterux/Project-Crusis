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
  deactivatedMembers: 'Deactivated Members',
  interested: 'Interested',
  participants: 'Participants',

  title: 'Red Cross',
  welcomeMsg: 'Welcome to Red Cross!',
  loggedInMsg: 'My Events',
  signedUpMsg: 'User account created, please wait for confirmation.',
  eventCreatedMsg: 'Event created.',
  resetPassMsg: 'Password sent, please log in with the password receieved in your email.',
  forgotPassMsg: 'Page under construction.',
  forgotPassHeadline: 'Please enter your email below and you will recieve a new generated password',
  forgotPassButtonText: 'Reset password',
  competence: 'Competence',
  noCompetence: 'No competence registered',
  noName: 'No name',
  userInfo: 'Bio',

  //Forgot password email
  emailsubject: 'New password',
  emailtext: 'You have been sent a new password connected to your user: ',

  change: 'Change',
  update: 'Update',
  back: 'Back',
  toEvent: 'To the Event',
  edit: 'Edit',
  editLogin: 'Edit login',
  save: 'Save',
  add: 'Add',
  remove: 'Remove',
  accept: 'Accept',
  reject: 'Reject',
  delete: 'Delete',
  search: 'Search',
  deactivate: 'Deactivate',
  reactivate: 'Reactivate',
  contact: 'Contact',
  reportInterested: 'Report interest',
  reportNotInterested: 'Remove interest',

  language: 'Language',
  english: 'English',
  norwegian: 'Norwegian',

  username: 'Username',
  password: 'Password',
  passwordMatch: 'Confirm Password',
  currentPassword: 'Current Password',
  newPassword: 'New Password',
  newPasswordMatch: 'Confirm New Password',
  email: 'Email',
  name: 'Name',
  phone: 'Phone',
  firstName: 'First name',
  middleName: 'Middle name',
  lastName: 'Last name',
  birthdate: 'Date of birth',
  startDate: 'Start date',
  endDate: 'End date',
  attendanceDate: 'Attendance Date',
  location: 'Location',
  details: 'Details',
  equipment: 'Equipment',
  age: 'Age',
  address: 'Address',
  postcode: 'Zip',
  city: 'City',
  points: 'Points',
  theTime: 'Time',
  roles: 'Roles',
  quantity: 'Quantity',

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
  errorEmail: 'Please enter a valid email-address!',
  errorEmailExist: 'The email-address does not exist!',
  errorPass: 'Please enter a valid password!',
  errorPassInfo: 'Minimum 8 characters including capital letters & numbers',
  errorPassMatch: 'Passwords do not match!',
  errorPhone: 'Please enter your phone number!',
  errorFirstName: 'Please enter your first name!',
  errorLastName: 'Please enter your last name!',
  errorBirth: 'Please enter your date of birth!',
  errorAddress: 'Please enter your address!',
  errorPostcode: 'Please enter a valid zip code!',
  errorCity: 'Please enter your city!',

  noError: 'Everything looks fine',
  notFilled: 'Please fill the input fields',
  switchLanguage: 'Bytt til Norsk',
  saveChanges: 'Save changes',
  confirmSignOut: 'Log out?',
  confirmUserDelete: 'Delete user?',
  confirmUserActivate: 'Are you sure you want to accept this account?',
  confirmUserDelete: 'Are you sure you want to reject this account?',
  confirmUserDeactivate: 'Are you sure you want to deactivate this account?',
  confirmUserReactivate: 'Are you sure you want to reactivate this account?',
  confirmEventDelete: 'Are you sure you want to delete this event?',
  optional: 'Optional',

  // Dates
  day: 'Day',
  month: 'Month',
  year: 'Year',
  hour: 'Hour',
  minute: 'Minute',
  tod: 'Today',

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

  //Popup-content
  popupContentText: 'Details for the upcoming event on the date: ',


  //Days
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',


  //events page
  eventHeader: 'Events',
  tableName: 'Name',
  tableLocation: 'Location',
  tableCity: 'City',
  tableDate: 'Date',
  tableTime: 'Time',
  tableDuration: 'Duration',
  createEvent: 'Create event',

  // News
  newsheading: 'News',
  newsText: 'Heavy rain and mild weather on an already unstable snow cover lead to a large and very high snowfall for northern parts of Trøndelag and Nordland. People should stay far away from landslides and follow information from local road authorities, police and municipalities.',
  newsSource: 'Source: www.rodekors.no',

  //Upcoming Events (at homepage)
  upcomingEventsHeadline: 'Upcoming events',
  upcomingEventLocation: 'Address',
  upcomingEventCity: 'City',
  upcomingEventReadmore: 'Read more',

  // Roles
  noRole: 'No Role',
  pickRole: 'Pick Role',

    // Rolenames
    SLEAD: 'Shift Leader',
    MED: 'Medic',
    AMBAS: 'Ambulance Assistant',
    AMBDR: 'Ambulance Driver',
    AMB3: 'Ambulance of 3',
    BOATDR: 'Boat Driver',
    BOATAS: 'Boat Assistant',
    BOATCR: 'Boat Crew',
    SCAS: 'Scooter Assistant',
    SCDR: 'Scooter Driver',
    SC3: 'Scooter of 3',
    ATVDR: 'ATV Driver',
    DISTS: 'District Sensor',
    TRAIN: 'Trainee',
    MARK: 'Marker',

  // Skills from competence
  noCompetence: 'No competence registered',

    // Driving License
    DL160: 'Driving License 160',
    DLBE: 'Driving License BE',
    DLS: 'Driving License S',
    DLB: 'Driving License B',
    DLAC: 'Driving License ATV Course',
    DLSC: 'Driving License Snow Scooter Course',

    // First Aid
    FAAD: 'First Aid Advanced',
    FARES: 'First Aid Rescue',
    FAAM: 'First Aid Ambulance',

    // Maritime
    MAVHF: 'Maritime VHF',
    MARES: 'Maritime Rescue',
    MARESAD: 'Maritime Rescue Advanced',

    // Search and Rescue
    SAR: 'Search and Rescue',
    SARS: 'Search and Rescue Summer',
    SARW: 'Search and Rescue Winter',

    // Management
    LEAD: 'Leader Course',
    DIST: 'District Sensor Course',
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
  deactivatedMembers: 'Deaktiverte Medlemmer',
  interested: 'Interesserte',
  participants: 'Deltakere',

  title: 'Røde Kors',
  welcomeMsg: 'Velkommen til Røde Kors!',
  loggedInMsg: 'Mine Arrangementer',
  signedUpMsg: 'Brukerkonto opprettet, vennligst vent på godkjenning.',
  eventCreatedMsg: 'Arrangement opprettet.',
  resetPassMsg: 'Passord sendt, vennligst logg inn med passord mottatt i epost.',
  forgotPassMsg: 'Side under konstruksjon.',
  forgotPassHeadline: 'Vennligst før inn din epost nedenfor, så vil du få tilsendt et nytt generert passord',
  forgotPassButtonText: 'Reset passord',
  competence: 'Kompetanse',
  noCompetence: 'Ingen kompetanse registrert',
  noName: 'Uten navn',
  userInfo: 'Personalia',

  //Forgot password email
  emailsubject: 'Nytt passord',
  emailtext: 'Du har fått tilsendt et nytt passord til din bruker: ',

  change: 'Endre',
  update: 'Oppdater',
  back: 'Tilbake',
  toEvent: 'Til Arrangementet',
  edit: 'Rediger',
  editLogin: 'Rediger login',
  save: 'Lagre',
  add: 'Legg til',
  remove: 'Fjern',
  accept: 'Godta',
  reject: 'Avslå',
  delete: 'Slett',
  search: 'Søk',
  deactivate: 'Deaktiver',
  reactivate: 'Reaktiver',
  contact: 'Kontakt',
  reportInterested: 'Meld interresse',
  reportNotInterested: 'Fjern interresse',

  language: 'Språk',
  english: 'Engelsk',
  norwegian: 'Norsk',

  username: 'Brukernavn',
  password: 'Passord',
  passwordMatch: 'Bekreft Passordet',
  currentPassword: 'Nåværende Passord',
  newPassword: 'Nytt Passord',
  newPasswordMatch: 'Bekreft Nytt Passord',
  email: 'Epost',
  name: 'Navn',
  phone: 'Mobilnr',
  firstName: 'Fornavn',
  middleName: 'Mellomnavn',
  lastName: 'Etternavn',
  birthdate: 'Fødselsdato',
  startDate: 'Startdato',
  endDate: 'Sluttdato',
  attendanceDate: 'Oppmøtedato',
  location: 'Sted',
  details: 'Detaljer',
  equipment: 'Verktøy',
  age: 'Alder',
  address: 'Adresse',
  postcode: 'Postnr',
  city: 'Poststed',
  points: 'Poeng',
  theTime: 'Klokkeslett',
  roles: 'Roller',
  quantity: 'Antall',

  signIn: 'Logg inn',
  signOut: 'Logg ut',
  signUp: 'Opprett konto',
  forgotPass: 'Glemt passord',

  userType: 'Brukertype',
  new: 'Ny',
  user: 'Bruker',
  leader: 'Leder',
  admin: 'Admin',

  // Error messages
  errorLogin: 'Feil brukernavn eller passord!',
  errorLoginLength: 'Vennligst skriv inn et brukernavn og passord.',
  errorLoginNewUser: 'Brukerkonto er ikke enda aktivert. Vennligst vent.',
  errorLoginDeletedUser: 'Brukerkontoen eksisterer ikke lenger.',
  errorMembers: 'Feil med henting av brukere!',
  errorEmail: 'Vennligst skriv inn en gyldig epost-adresse!',
  errorEmailExist: 'Epost-adressen eksisterer ikke!',
  errorPass: 'Vennligst skriv inn et gyldig passord!',
  errorPassInfo: 'Minimum åtte tegn med små og store bokstaver og tall',
  errorPassMatch: 'Passordene stemmer ikke overens!',
  errorPhone: 'Vennligst skriv inn mobilnummeret ditt!',
  errorFirstName: 'Vennligst skriv inn fornavnet ditt!',
  errorLastName: 'Vennligst skriv inn etternavnet ditt!',
  errorBirth: 'Vennligst skriv inn fødselsdatoen din!',
  errorAddress: 'Vennligst skriv inn adressen din!',
  errorPostcode: 'Vennligst skriv inn et gyldig postnummer!',
  errorCity: 'Vennligst skriv inn poststedet ditt!',

  noError: 'Alt ser bra ut',
  notFilled: 'Vennligst fyll ut feltene',
  switchLanguage: 'Change to English',
  saveChanges: 'Lagre endringer',
  confirmSignOut: 'Logg ut?',
  confirmUserDelete: 'Slett brukeren?',
  confirmUserActivate: 'Er du sikker på at du vil godta denne kontoen?',
  confirmUserDelete: 'Er du sikker på at du vil avslå denne kontoen?',
  confirmUserDeactivate: 'Er du sikker på at du vil deaktivere denne kontoen?',
  confirmUserReactivate: 'Er du sikker på at du vil reaktivere denne kontoen?',
  confirmEventDelete: 'Er du sikker på at du vil slette dette arrangementet?',
  optional: 'Valgfritt',

  // Dates
  day: 'Dag',
  month: 'Måned',
  year: 'År',
  hour: 'Time',
  minute: 'Minutt',
  tod: 'I dag',

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


  // Days
  mon: 'Mandag',
  tue: 'Tirsdag',
  wed: 'Onsdag',
  thu: 'Torsdag',
  fri: 'Fredag',
  sat: 'Lørdag',
  sun: 'Søndag',

  //Popup-content
  popupContentText: 'Detaljer om det oppkommende arrangementet på datoen: ',


  // Events Page
  eventHeader: 'Arrangementer',
  tableName: 'Navn',
  tableLocation: 'Sted',
  tableCity: 'By',
  tableDate: 'Dato',
  tableTime: 'Tid',
  tableDuration: 'Varighet',
  createEvent: 'Nytt arrangement',

  // News
  newsheading: 'Nyheter',
  newsText: 'Kraftig regn og mildt vær på et allerede meget ustabilt snødekke fører til stor og meget stor snøskredfare for nordlige deler av Trøndelag og Nordland. Folk bør holde seg langt unna skredterreng og følge informasjon fra lokale veimyndigheter, politi og kommune.',
  newsSource: 'Kilde: www.rodekors.no',

  //Upcoming Events (at homepage)
  upcomingEventsHeadline: 'Kommende arrangementer',
  upcomingEventLocation: 'Adresse',
  upcomingEventCity: 'By',
  upcomingEventReadmore: 'Les mer',

  // Roles
  noRole: 'Ingen Rolle',
  pickRole: 'Velg Rolle',

    // Rolenames
    SLEAD: 'Vaktleder',
    MED: 'Sanitet',
    AMBAS: 'Ambulansemedhjelper',
    AMBDR: 'Ambulansesjåfør',
    AMB3: '3 Manns Ambulanse',
    BOATDR: 'Båtfører',
    BOATAS: 'Båtmedhjelper',
    BOATCR: 'Båtmannskap',
    SCAS: 'Scootermedhjelper',
    SCDR: 'Scootersjåfør',
    SC3: '3 Manns Scooter',
    ATVDR: 'ATV Sjåfør',
    DISTS: 'Distriktsensor',
    TRAIN: 'Under Opplæring',
    MARK: 'Markør',

  // Skills from competence
  noCompetence: 'Ingen kompetanse registrert',

    // Driving License
    DL160: 'Førerkort 160 utrykningskjøring',
    DLBE: 'Førerkort BE tilhenger',
    DLS: 'Førerkort S snøscooter',
    DLB: 'Båtførerprøven',
    DLAC: 'Kvalifisert ATV kurs',
    DLSC: 'Kvalifisert snøscooterkurs',

    // First Aid
    FAAD: 'Videregående førstehjelpskurs',
    FARES: 'Hjelpekorpsprøve',
    FAAM: 'Ambulansesertifisering',

    // Maritime
    MAVHF: 'Maritimt VHF-sertifikat',
    MARES: 'Kvalifisert sjøredningskurs',
    MARESAD: 'Videregående sjøredningskurs',

    // Search and Rescue
    SAR: 'Kvalifisert kurs søk og redning',
    SARS: 'Kvalifisert kurs søk og redning sommer',
    SARW: 'Kvalifisert kurs søk og redning vinter',

    // Management
    LEAD: 'Vaktlederkurs',
    DIST: 'Distriktsensorkurs',
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
