// Alle Witze, Memes und Sprüche der Startseite. Einfach anpassen oder durch eigene Insider ersetzen.

export const DISCORD_INVITE_URL = 'https://discord.gg/Y6K7725FQ';

export const tickerItems = [
  'Schattenkanzler dementiert Gerüchte über geheimen Pool im Keller',
  'Familienrat beschließt einstimmig: Pizza Hawaii bleibt verboten',
  'Augenzeuge will Schattenminister ohne Sonnenbrille gesehen haben — Polizei ermittelt',
  'Reichmanns erneut „rein zufällig“ am Tatort. Familie: „Wir waren nur spazieren“',
  'Studie belegt: 9 von 10 Reichmanns haben immer ein Alibi. Der zehnte ist das Alibi',
  'Aktenkoffer des Schattenministers endlich geöffnet — Inhalt: ein Sandwich',
  'Unbekanntes ERROR-Model vor dem Hauptquartier gesichtet. Familie bestreitet jede Verbindung',
  'Neues Mitglied fragt nach dem Weg zum Hauptquartier — heißt seitdem nur noch „Navi“',
];

export const commandments = [
  { title: 'Über die Familie wird nicht geredet.', note: 'Auch nicht im Voice-Chat. Vor allem nicht im Voice-Chat.' },
  { title: 'Siehe Gebot Nr. 1.', note: 'Wir meinen das ernst.' },
  { title: 'Wer zu spät kommt, zahlt die Pizza.', note: 'Ausnahmen gibt es nicht. Auch nicht für den Kanzler.' },
  { title: 'Der Schattenkanzler hat immer recht.', note: 'Auch wenn er falsch liegt. Dann erst recht.' },
  { title: 'Niemand verlässt die Familie.', note: 'Einkaufen gehen zählt nicht. Meistens.' },
  { title: 'Was im Schattenreich passiert, bleibt im Schattenreich.', note: 'Screenshots inklusive.' },
];

// Eigene Meme-Bilder: Datei nach frontend/public/memes/ legen und so eintragen:
// { type: 'image', src: 'memes/datei.png', caption: 'Bildunterschrift' }
export const memes = [
  {
    type: 'drake',
    no: 'Woanders nur eine Nummer auf der Mitgliederliste sein',
    yes: 'Bei den Reichmanns ab Tag eins zur Familie gehören',
  },
  {
    type: 'nobody',
    setup: ['Niemand:', 'Absolut niemand:'],
    who: 'Der Schattenkanzler um 3 Uhr nachts:',
    quote: '„Wir brauchen eine neue Rangordnung.“',
  },
  {
    type: 'brain',
    steps: ['Einer Gang beitreten', 'Eine eigene Gang gründen', 'Einer Familie beitreten', 'Reichmann werden'],
  },
  {
    type: 'quote',
    text: 'Niemand verlässt die Familie. Manche gehen nur sehr lange einkaufen.',
    author: 'Unbekannt',
  },
  {
    type: 'tier',
    tiers: [
      { tier: 'S', text: 'Familie Reichmann' },
      { tier: 'A', text: 'Leute, die Pizza mitbringen' },
      { tier: 'B', text: 'Der Typ, der immer nach dem Weg fragt' },
      { tier: 'F', text: 'Alle anderen Familien' },
    ],
  },
  {
    type: 'pov',
    setup: 'Du hast im RP den Parkplatz vom Schattenkanzler genommen.',
    punch: '*verschwindet mysteriös*',
  },
  {
    type: 'quote',
    text: 'Ich hab nicht verloren. Ich hab meinen Rang nur pausiert.',
    author: 'Ehemaliger Schattenminister',
  },
  {
    type: 'starter',
    title: 'Schattenminister',
    items: [
      'Sonnenbrille, auch nachts',
      'Leerer Aktenkoffer',
      'Drei Handys, keins geht ran',
      '„Ich kenne da jemanden“',
      'Ein Alibi für jeden Wochentag',
      'Sagt nie „ja“, nur „wir werden sehen“',
    ],
  },
  {
    type: 'quote',
    text: 'Mein Opa war Schattenkanzler. Mein Enkel wird’s auch.',
    author: 'Stolzes Mitglied',
  },
];

export const excuses = [
  'Mein Pferd hatte Geburtstag.',
  'Ich war da. Du hast mich nur nicht gesehen. Das nennt man Diskretion.',
  'Mein Aktenkoffer ließ sich nicht öffnen und ohne gehe ich nirgendwo hin.',
  'Das Navi hat mich zur falschen Familie geschickt.',
  'Ich musste noch ein Alibi abholen.',
  'Ich war einkaufen. Lange.',
  'Der Schattenkanzler meinte, das Treffen ist erst morgen. Und er hat ja immer recht.',
  'Ich habe mich in ein ERROR-Model verwandelt und wollte niemanden erschrecken.',
  'Ein tragischer Physgun-Unfall. Mehr kann ich dazu nicht sagen.',
  'Ich habe die Einladung gelesen und mich dann diskret entschieden, sie nicht gelesen zu haben.',
  'Mein Charakter hatte einen Zahnarzttermin. Im RP. Das zählt.',
  'Ich stand die ganze Zeit hinter dir. Dreh dich nie um.',
];

export const idCard = {
  titles: ['Don', 'Graf', 'Baron', 'Consigliere', 'Signore', 'Onkel', 'Lord', 'Madame'],
  epithets: [
    'der Leise',
    'das Phantom',
    'Zwei-Pizza',
    'der Buchhalter',
    'mit dem Aktenkoffer',
    'der Unbestechliche (fast)',
    'Kein-Kommentar',
    'der Spaziergänger',
    'Sonnenbrille',
    'der Physgun-Flüsterer',
    'das Alibi',
    'der zu spät kommt',
  ],
  specialties: [
    'Autowäsche (nicht Geldwäsche!)',
    'Diskretes Wegschauen',
    'Alibis auf Bestellung',
    'Pizza-Logistik',
    'Spontanes Verschwinden',
    'Props im richtigen Moment',
    'Kreative Buchhaltung',
    'Ganz normale Spaziergänge',
    'Gerüchte streuen',
    'Unauffällig auffallen',
  ],
};

export const redactedReveals = ['Netter Versuch.', 'Das bleibt in der Familie.', 'Kein Kommentar.', 'Du stellst zu viele Fragen.'];
