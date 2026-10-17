// Alle Witze, Memes und Sprüche der Startseite. Einfach anpassen oder durch eigene Insider ersetzen.

export const DISCORD_INVITE_URL = 'https://discord.gg/3JeGaYP6Fq';

// Stand der offiziellen Familienvorstellung im Modern-Gaming-Forum.
export const FAMILY = {
  forumUrl: 'https://modern-gaming.net/forum/thread/86133-familienvorstellung-reichmann/',
  rulesUrl: 'https://rules-mrp.modern-gaming.net/',
  server: 'Modern Gaming · Modern Roleplay',
  contact: '.noko._',
  requirements: ['Mindestens 16 Jahre alt', 'Mindestens 72 Stunden Spielzeit', 'Das Regelwerk einmal gelesen'],
  rules: [
    'Respektvolles und höfliches Verhalten gegenüber allen Mitgliedern wird vorausgesetzt.',
    'Behandle andere so, wie du von ihnen behandelt werden willst.',
  ],
};

// Von unten nach oben. `color` steuert die Farbe von Icon und Avatar.
export const RANKS = [
  {
    key: 'SCHATTENSCHERGE',
    title: 'Schattenscherge',
    text: 'Die Probephase. Du zeigst, dass du zur Familie passt — noch ohne Namensrechte der Familie.',
    icon: 'user',
    color: 'slate',
  },
  {
    key: 'SCHATTENMITGLIED',
    title: 'Schattenmitglied',
    text: 'Ein vollwertiges Mitglied der Familie. Ab jetzt trägst du den Namen Reichmann.',
    icon: 'shield',
    color: 'indigo',
  },
  {
    key: 'SCHATTENMINISTER',
    title: 'Schattenminister',
    text: 'Berater des Schattenkanzlers. Trifft mit ihm zusammen die Entscheidungen.',
    icon: 'briefcase',
    color: 'accent',
  },
  {
    key: 'SCHATTENKANZLER',
    title: 'Schattenkanzler',
    text: 'Das Oberhaupt der Familie. Er leitet die Geschäfte und führt die Familie an.',
    icon: 'crown',
    color: 'gold',
  },
];

// Neue Mitglieder einfach hier eintragen. `rank` muss ein `key` aus RANKS sein.
export const MEMBERS = [
  { name: 'Noko Og Reichmann', rank: 'SCHATTENKANZLER' },
  { name: 'Fritz Mitz Reichmann', rank: 'SCHATTENMINISTER' },
  { name: 'Heinz Og Reichmann', rank: 'SCHATTENMINISTER' },
  { name: 'Barry Og Reichmann', rank: 'SCHATTENMITGLIED' },
  { name: 'Finn Volcher Reichmann', rank: 'SCHATTENMITGLIED' },
  { name: 'Nao Og Reichmann', rank: 'SCHATTENMITGLIED' },
  { name: 'Eram Van Reichmann', rank: 'SCHATTENMITGLIED' },
  { name: 'Banshee Van Richmann', rank: 'SCHATTENMITGLIED' },
  { name: 'Juri Jurisa Reichmann', rank: 'SCHATTENMITGLIED' },
  { name: 'Ada Cinnamon', rank: 'SCHATTENMITGLIED' },
  { name: 'Luna Crowley Reichmann', rank: 'SCHATTENSCHERGE' },
];

// Laufband "RNN – Reichmann News Network". `tag` muss ein Schlüssel aus TICKER_TAGS sein,
// `article` (optional) verlinkt auf einen Bericht aus `reports`.
export const TICKER_TAGS = ['Eilmeldung', 'Familie', 'Gerücht', 'Sport', 'Börse', 'Polizei', 'Wetter', 'Wissenschaft'];

export const tickerItems = [
  { tag: 'Eilmeldung', text: 'Pizza-Index der Familie erreicht Allzeithoch — Analysten machen Gebot Nr. 3 verantwortlich', article: 'pizza-index' },
  { tag: 'Familie', text: 'Probephase läuft: Luna Crowley Reichmann ist aktuell die einzige Schattenscherge', article: 'probephase' },
  { tag: 'Gerücht', text: 'Was bedeutet eigentlich „Og“? Redaktion recherchiert seit Wochen ergebnislos', article: 'og-recherche' },
  { tag: 'Sport', text: 'Parkplatz-Derby vor dem Hauptquartier: Stammplatz des Kanzlers bleibt unangetastet', article: 'parkplatz-derby' },
  { tag: 'Polizei', text: 'Unbekanntes ERROR-Model vor dem Hauptquartier gesichtet. Familie bestreitet jede Verbindung', article: 'error-model' },
  { tag: 'Wetter', text: 'Im Schattenreich bleibt es bewölkt, gegen Abend vereinzelt Alibis', article: 'wetter' },
  { tag: 'Familie', text: 'Elf Mitglieder, vier Ränge, eine Regel: Familienvorstellung im Forum ist online', article: 'vorstellung' },
  { tag: 'Gerücht', text: 'Schattenkanzler dementiert Gerüchte über geheimen Pool im Keller' },
  { tag: 'Eilmeldung', text: 'Familienrat beschließt einstimmig: Pizza Hawaii bleibt verboten' },
  { tag: 'Gerücht', text: 'Augenzeuge will Schattenminister ohne Sonnenbrille gesehen haben — Ermittlungen laufen' },
  { tag: 'Polizei', text: 'Reichmanns erneut „rein zufällig“ am Tatort. Familie: „Wir waren nur spazieren“' },
  { tag: 'Wissenschaft', text: 'Studie belegt: 9 von 10 Reichmanns haben immer ein Alibi. Der zehnte ist das Alibi' },
  { tag: 'Eilmeldung', text: 'Aktenkoffer eines Schattenministers endlich geöffnet — Inhalt: ein Sandwich' },
  { tag: 'Börse', text: 'Alibi-Aktie stabil, Sonnenbrillen-Futures leicht im Plus, Pizza-Anleihen gefragt wie nie' },
  { tag: 'Sport', text: 'Familien-Rekord: Treffen beginnt nur 41 Minuten zu spät' },
  { tag: 'Gerücht', text: 'Neues Gesicht fragt nach dem Weg zum Hauptquartier — heißt seitdem nur noch „Navi“' },
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
    type: 'chat',
    channel: 'familien-treffen',
    messages: [
      { author: 'Noko', time: '19:02', text: 'Treffen heute 20 Uhr im HQ. Pünktlich.' },
      { author: 'Fritz', time: '19:05', text: 'bin dabei' },
      { author: 'Heinz', time: '19:05', text: 'safe' },
      { system: true, text: 'Es ist jetzt 20:41 Uhr.' },
      { author: 'Fritz', time: '20:41', text: 'bin gleich da, muss noch schnell ein alibi abholen' },
      { author: 'Noko', time: '20:42', text: 'Gebot Nr. 3.' },
    ],
  },
  {
    type: 'drake',
    no: 'Woanders nur eine Nummer auf der Mitgliederliste sein',
    yes: 'Bei den Reichmanns ab Tag eins zur Familie gehören',
  },
  {
    type: 'expectation',
    expectation: 'Mafia-Familie: Anzüge, Sonnenbrillen, geheime Treffen im Hinterzimmer',
    reality: 'Elf Leute diskutieren 40 Minuten im Voice-Chat, wer die Pizza bezahlt',
  },
  {
    type: 'nobody',
    setup: ['Niemand:', 'Absolut niemand:'],
    who: 'Der Schattenkanzler um 3 Uhr nachts:',
    quote: '„Wir brauchen eine neue Rangordnung.“',
  },
  {
    type: 'achievement',
    title: 'Schattenmitglied',
    text: 'Probephase überstanden. Du darfst jetzt „Reichmann“ heißen.',
    points: 100,
  },
  {
    type: 'brain',
    steps: ['Einer Gang beitreten', 'Eine eigene Gang gründen', 'Einer Familie beitreten', 'Reichmann werden'],
  },
  {
    type: 'buttons',
    options: ['Pünktlich zum Familientreffen', 'Vorher noch schnell ein Alibi besorgen'],
    caption: 'Jede Schattenscherge um 19:59',
  },
  {
    type: 'wanted',
    crime: 'Wer hat das letzte Stück Pizza gegessen?',
    lastSeen: 'Im Hauptquartier, kurz nach dem Familientreffen',
    reward: 'das vorletzte Stück',
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
    type: 'changemind',
    text: 'Pizza Hawaii ist eigentlich ganz okay.',
    note: 'Verstoß gegen Familienbeschluss wurde gemeldet.',
  },
  {
    type: 'pov',
    setup: 'Du hast im RP den Parkplatz vom Schattenkanzler genommen.',
    punch: '*verschwindet mysteriös*',
  },
  {
    type: 'nobody',
    setup: ['Niemand:', 'Absolut niemand:'],
    who: 'Die halbe Familie bei der Namenswahl:',
    quote: '„Og.“',
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
    text: 'Ich hab nicht verloren. Ich hab meinen Rang nur pausiert.',
    author: 'Ehemaliger Schattenminister',
  },
  {
    type: 'quote',
    text: 'Mein Opa war Schattenkanzler. Mein Enkel wird’s auch.',
    author: 'Stolzes Mitglied',
  },
];

// "Das Schattenblatt" – satirische Familienzeitung. Neueste Berichte zuerst; `lead: true` macht den Aufmacher.
export const reports = [
  {
    id: 'wetter',
    ressort: 'Wetter',
    date: '2026-10-15',
    title: 'Wetter im Schattenreich: Dauerhaft bewölkt, vereinzelt Alibis',
    teaser: 'Auch in der kommenden Woche bleibt es im Schattenreich verdächtig ruhig. Gegen Abend ziehen vereinzelte Gerüchte auf.',
    body: [
      'Die Sicht bleibt schlecht, besonders für Außenstehende. Mitglieder sollten ihre Sonnenbrillen trotzdem nicht ablegen — aus Prinzip.',
      'Für Samstagabend rechnen unsere Meteorologen mit einem Familientreffen und örtlich sehr hoher Pizzadichte. Wer pünktlich kommt, bleibt trocken. Wer zu spät kommt, zahlt.',
    ],
  },
  {
    id: 'probephase',
    ressort: 'Familie',
    date: '2026-10-14',
    lead: true,
    title: 'Probephase läuft: So überlebt man als Schattenscherge',
    teaser:
      'Luna Crowley Reichmann ist aktuell die einzige Schattenscherge der Familie. Wir haben zusammengetragen, was in der Probephase garantiert hilft. Spoiler: Pizza.',
    body: [
      'Die Probephase ist die härteste Zeit im Leben eines jeden Reichmanns. Den Namen der Familie gibt es erst danach — bis dahin heißt es: zeigen, dass man zur Familie passt.',
      'Unsere Redaktion hat bei erfahrenen Mitgliedern nachgefragt. Die drei wichtigsten Tipps: Erstens pünktlich sein. Zweitens pünktlich sein. Drittens: Falls das nicht klappt, die Pizza schon mal vorbestellen.',
      'Ein Sprecher der Familie bestätigte lediglich, dass Gebot Nr. 3 auch für Schergen gilt. „Gerade für Schergen“, fügte er hinzu, bevor er im Hauptquartier verschwand. Die Redaktion wünscht viel Erfolg.',
    ],
  },
  {
    id: 'pizza-index',
    ressort: 'Wirtschaft',
    date: '2026-10-10',
    title: 'Pizza-Index der Familie erreicht Allzeithoch',
    teaser: 'Analysten führen den Anstieg auf eine Häufung von Verspätungen zurück. Gebot Nr. 3 zeigt Wirkung — vor allem auf den Kontostand.',
    body: [
      'Der hauseigene Pizza-Index, der die Zahl der wegen Verspätung bezahlten Pizzen misst, kletterte in dieser Woche auf einen neuen Rekordwert.',
      'Experten raten zu pünktlichem Erscheinen oder alternativ zu einem sehr großen Kühlschrank. Pizza Hawaii ist vom Index übrigens ausgenommen — sie existiert laut Familienbeschluss offiziell nicht.',
    ],
  },
  {
    id: 'og-recherche',
    ressort: 'Vermischtes',
    date: '2026-10-06',
    title: 'Was bedeutet eigentlich „Og“? Große Recherche bleibt ergebnislos',
    teaser: 'Noko, Heinz, Barry und Nao tragen ihn alle: den mysteriösen Zweitnamen „Og“. Unsere Redaktion wollte wissen, was dahintersteckt. Die Antwort: Schweigen.',
    body: [
      'Auf Nachfrage verwiesen alle Betroffenen auf Gebot Nr. 1. Eine Quelle, die anonym bleiben möchte, flüsterte nur: „Original Gangster? Original Gründer? Oder einfach … Og?“',
      'Auch die „Van“-Fraktion um Eram und Banshee blieb bei der Recherche ungewöhnlich wortkarg. Ada Cinnamon, die als Einzige ganz ohne Reichmann im Namen auskommt, war von der Untersuchung nicht betroffen.',
      'Die Redaktion bleibt dran. Vermutlich.',
    ],
  },
  {
    id: 'parkplatz-derby',
    ressort: 'Sport',
    date: '2026-10-02',
    title: 'Parkplatz-Derby vor dem Hauptquartier geht in die nächste Runde',
    teaser: 'Der inoffizielle Wettkampf um den besten Parkplatz am Eingang ist neu entbrannt. Ein Platz bleibt allerdings tabu.',
    body: [
      'Beobachter berichten von bemerkenswertem Fahrkönnen und mindestens einem Physgun-Einsatz, der den Regeln des Sports nur bedingt entsprach.',
      'Der Stammplatz des Schattenkanzlers wurde, wie es Tradition ist, von allen Teilnehmern großräumig umfahren. Wer ihn je genommen hat, ist bekanntlich … verschwunden.',
    ],
  },
  {
    id: 'error-model',
    ressort: 'Polizeibericht',
    date: '2026-09-27',
    title: 'Unbekanntes ERROR-Model vor dem Hauptquartier gesichtet',
    teaser: 'Anwohner melden ein großes rotes ERROR-Schild, das seit Tagen regungslos vor dem Hauptquartier steht. Die Familie bestreitet jede Verbindung.',
    body: [
      '„Das gehört nicht zu uns“, erklärte ein Sprecher der Familie. Auf die Frage, warum das Model offenbar einen Anzug trägt, gab es keine Antwort.',
      'Experten vermuten fehlende Content-Packs. Die Familie vermutet einen ganz normalen Spaziergang.',
    ],
  },
  {
    id: 'vorstellung',
    ressort: 'Familie',
    date: '2026-08-12',
    title: 'Offiziell: Familie Reichmann stellt sich im Forum vor',
    teaser: 'Elf Mitglieder, vier Ränge, eine Regel. Die Familie hat sich im Modern-Gaming-Forum vorgestellt — und der Thread wurde vorsichtshalber direkt geschlossen.',
    body: [
      'Wer zur Familie will, braucht mindestens 16 Jahre, 72 Stunden Spielzeit und das Regelwerk im Kopf. Bewerbungen nimmt der Schattenkanzler persönlich entgegen — im Spiel oder per Discord.',
      'Ob der Thread wegen zu viel Einfluss geschlossen wurde, wollte niemand kommentieren.',
    ],
    link: { href: 'https://modern-gaming.net/forum/thread/86133-familienvorstellung-reichmann/', label: 'Zur Familienvorstellung' },
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
